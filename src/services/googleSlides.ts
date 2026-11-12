import { SlideData } from '../types/slides';

export interface GoogleSlidesExportProgress {
  step: string;
  percent: number;
}

export async function exportToGoogleSlides(
  slides: SlideData[],
  accessToken: string,
  onProgress?: (progress: GoogleSlidesExportProgress) => void
): Promise<{ presentationId: string; url: string }> {
  onProgress?.({ step: 'Creating new Google Slides presentation...', percent: 10 });

  // 1. Create presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Python for AI - BSc Computer Engineering',
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to create presentation: ${createRes.statusText}`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const initialSlideId = presentation.slides?.[0]?.objectId;

  onProgress?.({ step: 'Configuring deck structure & theme...', percent: 25 });

  // 2. Prepare batch requests to delete default initial slide and create 32 styled slides
  const requests: any[] = [];

  // Create each slide with an explicit ID
  slides.forEach((slide, index) => {
    const slideId = `slide_${slide.id}_${Date.now()}`;
    const titleBoxId = `title_${slide.id}_${Date.now()}`;
    const bodyBoxId = `body_${slide.id}_${Date.now()}`;

    // Add slide
    requests.push({
      createSlide: {
        objectId: slideId,
        insertionIndex: index,
        slideLayoutReference: { predefinedLayout: 'BLANK' },
      },
    });

    // Dark Navy Background
    requests.push({
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: { red: 0.024, green: 0.039, blue: 0.09 }, // #060a17
              },
            },
          },
        },
        fields: 'pageBackgroundFill',
      },
    });

    // Title Box
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 90, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 35,
            unit: 'PT',
          },
        },
      },
    });

    // Insert Title Text
    requests.push({
      insertText: {
        objectId: titleBoxId,
        text: `${slide.title}\n${slide.subtitle || ''}`,
      },
    });

    // Title Styling: Electric Cyan (#38bdf8) / Gold (#f59e0b)
    const isPythonThread = slide.thread === 'python';
    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        textRange: { type: 'ALL' },
        style: {
          bold: true,
          fontSize: { magnitude: slide.id === 1 || slide.id === 17 ? 32 : 24, unit: 'PT' },
          foregroundColor: {
            opaqueColor: {
              rgbColor: isPythonThread
                ? { red: 0.96, green: 0.62, blue: 0.04 } // #f59e0b
                : { red: 0.22, green: 0.74, blue: 0.97 }, // #38bdf8
            },
          },
        },
        fields: 'bold,fontSize,foregroundColor',
      },
    });

    // Body text / bullets / code snippet box
    let bodyText = '';
    if (slide.caption) {
      bodyText += `“${slide.caption}”\n\n`;
    }
    if (slide.bullets && slide.bullets.length > 0) {
      bodyText += slide.bullets.map(b => `• ${b}`).join('\n') + '\n\n';
    }
    if (slide.codeSnippets && slide.codeSnippets.length > 0) {
      bodyText += slide.codeSnippets.map(c => `[${c.label || c.language.toUpperCase()}]\n${c.code}\nOutput: ${c.output || 'N/A'}`).join('\n\n') + '\n\n';
    }
    if (slide.visualData?.takeaways) {
      bodyText += slide.visualData.takeaways.map((t: any) => `${t.num}. ${t.text} (${t.sub})`).join('\n') + '\n';
    }

    if (bodyText.trim().length > 0) {
      requests.push({
        createShape: {
          objectId: bodyBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: slideId,
            size: {
              width: { magnitude: 650, unit: 'PT' },
              height: { magnitude: 260, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 35,
              translateY: 135,
              unit: 'PT',
            },
          },
        },
      });

      requests.push({
        insertText: {
          objectId: bodyBoxId,
          text: bodyText,
        },
      });

      requests.push({
        updateTextStyle: {
          objectId: bodyBoxId,
          textRange: { type: 'ALL' },
          style: {
            fontSize: { magnitude: 13, unit: 'PT' },
            foregroundColor: {
              opaqueColor: {
                rgbColor: { red: 0.88, green: 0.92, blue: 0.96 }, // #e2e8f0
              },
            },
          },
          fields: 'fontSize,foregroundColor',
        },
      });
    }
  });

  // Delete initial default blank slide if present
  if (initialSlideId) {
    requests.push({
      deleteObject: {
        objectId: initialSlideId,
      },
    });
  }

  onProgress?.({ step: 'Generating all 32 slides in Google Slides...', percent: 60 });

  // Execute batch update in chunks if necessary (Google Slides handles up to 500 requests)
  const chunkSize = 150;
  for (let i = 0; i < requests.length; i += chunkSize) {
    const chunk = requests.slice(i, i + chunkSize);
    const batchRes = await fetch(
      `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests: chunk }),
      }
    );

    if (!batchRes.ok) {
      const err = await batchRes.json().catch(() => ({}));
      console.error('Google Slides batchUpdate chunk error:', err);
      throw new Error(err?.error?.message || 'Error executing Google Slides batchUpdate');
    }

    const currentPercent = 60 + Math.floor(((i + chunkSize) / requests.length) * 35);
    onProgress?.({
      step: `Writing slides ${Math.min(slides.length, Math.floor((i / requests.length) * slides.length) + 1)} to ${slides.length}...`,
      percent: Math.min(95, currentPercent),
    });
  }

  onProgress?.({ step: 'Presentation created successfully!', percent: 100 });

  return {
    presentationId,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/gemini/')) {
          return next();
        }

        // Handle POST requests
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY not configured on server' }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              const parsedBody = body ? JSON.parse(body) : {};

              if (req.url === '/api/gemini/generate-image') {
                const { prompt, aspectRatio = '16:9', imageSize = '1K', baseImage, editInstructions } = parsedBody;
                
                const parts: any[] = [];
                if (baseImage) {
                  const cleanedBase64 = baseImage.replace(/^data:image\/\w+;base64,/, '');
                  parts.push({
                    inlineData: {
                      data: cleanedBase64,
                      mimeType: 'image/png'
                    }
                  });
                }
                parts.push({
                  text: editInstructions ? `${editInstructions}. Based on: ${prompt}` : prompt
                });

                const response = await ai.models.generateContent({
                  model: 'gemini-nano-banana-2.1',
                  contents: { parts },
                  config: {
                    imageConfig: {
                      aspectRatio,
                      imageSize,
                    },
                  },
                });

                let generatedImageUrl = null;
                let textExplanation = '';

                for (const part of response.candidates?.[0]?.content?.parts ?? []) {
                  if (part.inlineData?.data) {
                    const mime = part.inlineData.mimeType || 'image/png';
                    generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
                  } else if (part.text) {
                    textExplanation += part.text;
                  }
                }

                if (!generatedImageUrl) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    error: 'Model did not return image data', 
                    details: textExplanation 
                  }));
                  return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ imageUrl: generatedImageUrl, text: textExplanation }));
                return;
              }

              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Endpoint not found' }));
            } catch (err: any) {
              console.error('Gemini API Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Server error calling Gemini' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});


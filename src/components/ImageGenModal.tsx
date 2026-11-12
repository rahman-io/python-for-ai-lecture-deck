import React, { useState } from 'react';
import { X, Sparkles, Wand2, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { generateSlideImage } from '../services/geminiService';

interface ImageGenModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideId: number;
  slideTitle: string;
  onApplyImageToSlide: (slideId: number, imageUrl: string) => void;
  currentCustomImage?: string;
}

export const ImageGenModal: React.FC<ImageGenModalProps> = ({
  isOpen,
  onClose,
  slideId,
  slideTitle,
  onApplyImageToSlide,
  currentCustomImage,
}) => {
  const [prompt, setPrompt] = useState(
    `High-end tech keynote illustration for slide "${slideTitle}": deep navy blue background, glowing electric cyan and warm amber gold geometric circuits and neural nodes, sleek university presentation aesthetic.`
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3'>('16:9');
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(currentCustomImage || null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await generateSlideImage({
        prompt,
        aspectRatio,
        imageSize: '1K',
        baseImage: isEditing && generatedImage ? generatedImage : undefined,
        editInstructions: isEditing ? editPrompt : undefined,
      });
      setGeneratedImage(res.imageUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image. Please check API settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedImage) {
      onApplyImageToSlide(slideId, generatedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                AI Slide Illustration Studio
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Powered by gemini-nano-banana-2.1 • Slide #{slideId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Image Generation Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-xs bg-slate-950/80 border border-slate-700 rounded-xl focus:border-cyan-500 focus:outline-none leading-relaxed text-slate-200"
              placeholder="Describe the slide visual you want to generate..."
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Aspect Ratio:</span>
              {(['16:9', '1:1', '4:3'] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition ${
                    aspectRatio === ratio
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {generatedImage && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                  isEditing
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit Mode' : 'Edit This Image'}</span>
              </button>
            )}
          </div>

          {isEditing && generatedImage && (
            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-2">
              <label className="block text-xs font-medium text-amber-300">
                Edit Instructions
              </label>
              <input
                type="text"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="e.g. Add glowing circuit lines connecting to a Warsaw university badge"
                className="w-full px-3 py-1.5 text-xs bg-slate-950/80 border border-amber-700/50 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {error && (
            <div className="p-3 text-xs bg-rose-950/50 border border-rose-800/50 text-rose-300 rounded-xl">
              {error}
            </div>
          )}

          {/* Image Preview */}
          <div className="relative min-h-[180px] bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 text-cyan-400">
                <Loader2 className="w-7 h-7 animate-spin" />
                <span className="text-xs font-mono">Generating high-fidelity visual with gemini-nano-banana-2.1...</span>
              </div>
            ) : generatedImage ? (
              <div className="relative group w-full h-full max-h-[260px] flex items-center justify-center bg-black/40">
                <img
                  src={generatedImage}
                  alt="Generated visual"
                  className="max-h-[260px] object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="text-center text-slate-500 p-6">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No custom illustration generated yet.</p>
                <p className="text-[11px] text-slate-600">Click &ldquo;Generate Image&rdquo; to create custom visual artwork.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            Model: gemini-nano-banana-2.1
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-xl text-white transition disabled:opacity-50 shadow-md shadow-cyan-600/20"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isEditing ? 'Apply Edits' : 'Generate Image'}</span>
            </button>

            {generatedImage && (
              <button
                onClick={handleApply}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition shadow-md shadow-emerald-600/20"
              >
                <Check className="w-4 h-4" />
                <span>Apply to Slide #{slideId}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

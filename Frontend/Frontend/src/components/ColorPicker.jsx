import React from "react";
import { Palette, Shuffle, PaintBucket } from "lucide-react";

const defaultPalette = ['#2563EB', '#7C3AED', '#DC2626', '#059669', '#EA580C', '#9333EA'];

const ColorPicker = ({ value, onChange, palette = defaultPalette }) => {
  const randomize = () => {
    const colors = [
      '#2563EB', '#7C3AED', '#DC2626', '#059669', 
      '#EA580C', '#9333EA', '#0EA5E9', '#F59E0B'
    ];
    const next = colors[Math.floor(Math.random() * colors.length)];
    onChange(next);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Palette className="size-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Accent Color</h3>
          <p className="text-xs text-slate-600">Choose your resume's primary color</p>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
        {/* Color Preview */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl border-4 border-white shadow-lg"
              style={{ backgroundColor: value }}
            ></div>
            <div>
              <div className="font-medium text-slate-900">Selected Color</div>
              <div className="text-sm text-slate-600 font-mono">{value}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={randomize}
            className="group px-4 py-2.5 bg-gradient-to-r from-purple-50 to-white border border-purple-300 text-purple-700 rounded-xl hover:border-purple-500 hover:shadow-md transition-all flex items-center gap-2"
          >
            <Shuffle className="size-4 group-hover:rotate-180 transition-transform" />
            <span className="font-medium">Surprise Me</span>
          </button>
        </div>

        {/* Custom Color Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            <div className="flex items-center gap-2">
              <PaintBucket className="size-4 text-blue-500" />
              Custom Color
            </div>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-lg hover:scale-105 transition-transform"
              aria-label="Pick accent color"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              placeholder="#2563EB"
              pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
            />
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">Popular Colors</h4>
          <div className="grid grid-cols-6 gap-3">
            {palette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onChange(color)}
                className={`relative group aspect-square rounded-xl border-2 hover:scale-110 transition-transform ${value === color ? 'border-slate-900 ring-2 ring-offset-2 ring-blue-500' : 'border-slate-300 hover:border-slate-400'}`}
                style={{ backgroundColor: color }}
                aria-label={`Use ${color}`}
              >
                {value === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                    </div>
                  </div>
                )}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {color}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Harmony */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <span className="text-sm font-medium text-slate-900">Color Harmony</span>
          </div>
          <p className="text-xs text-slate-600">
            This color will be used for headings, accents, and highlights throughout your resume.
            Choose a color that represents your personal brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
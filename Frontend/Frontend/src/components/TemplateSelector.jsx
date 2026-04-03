import React from "react";
import { Check, Palette, Layout } from "lucide-react";

const TemplateSelector = ({ templates, selected, onSelect }) => {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Layout className="size-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Choose Template</h3>
          <p className="text-xs text-slate-600">
            Select a design that matches your style
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((item) => {
          const isActive = selected === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                isActive
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-lg scale-[1.02]"
                  : "border-slate-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {/* Selected Indicator */}
              {isActive && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Check className="size-4 text-white" />
                </div>
              )}

              {/* Template Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-500"
                        : "bg-gradient-to-r from-slate-100 to-slate-200"
                    }`}
                  >
                    <Palette
                      className={`size-4 ${
                        isActive ? "text-white" : "text-slate-600"
                      }`}
                    />
                  </div>

                  <div className="text-left">
                    <h4
                      className={`font-semibold ${
                        isActive ? "text-blue-800" : "text-slate-900"
                      }`}
                    >
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {isActive ? "Currently Selected" : "Click to select"}
                    </p>
                  </div>
                </div>

                {isActive && (
                  <div className="px-2 py-1 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-xs font-medium text-blue-700">
                      Active
                    </span>
                  </div>
                )}
              </div>

              {/* Template Description */}
              <div className="mb-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Template Features */}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded bg-gradient-to-r from-slate-100 to-white border border-slate-300 text-slate-700">
                  ATS Friendly
                </span>

                <span className="px-2 py-1 text-xs rounded bg-gradient-to-r from-slate-100 to-white border border-slate-300 text-slate-700">
                  {item.id.includes("image") ? "With Photo" : "No Photo"}
                </span>

                <span className="px-2 py-1 text-xs rounded bg-gradient-to-r from-slate-100 to-white border border-slate-300 text-slate-700">
                  Professional
                </span>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

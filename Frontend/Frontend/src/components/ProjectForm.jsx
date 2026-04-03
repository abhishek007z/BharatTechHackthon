import React from "react";
import { PlusCircle, Trash2, Code, FolderGit2, GitBranch, Globe } from "lucide-react";

const ProjectForm = ({ items = [], onAdd, onChange, onRemove }) => {
  const projectTypes = [
    { value: "web-app", label: "Web Application", icon: Globe },
    { value: "mobile-app", label: "Mobile App", icon: "📱" },
    { value: "cli-tool", label: "CLI Tool", icon: "🖥️" },
    { value: "api-service", label: "API Service", icon: "🔌" },
    { value: "library", label: "Library", icon: "📚" },
    { value: "open-source", label: "Open Source", icon: GitBranch },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl border border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
            <Code className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Projects Portfolio</h3>
            <p className="text-xs text-slate-600">Showcase your technical work</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="group px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <PlusCircle className="size-4 group-hover:scale-110 transition-transform" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-300 text-center hover:border-emerald-400 transition-colors group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-100 to-teal-50 rounded-full mb-4">
            <FolderGit2 className="size-8 text-emerald-500" />
          </div>
          <h4 className="font-medium text-slate-900 mb-2">No Projects Added</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Showcase 2–3 key projects that demonstrate your skills and problem-solving abilities
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-emerald-100 to-white border border-emerald-300 text-emerald-700 rounded-lg hover:border-emerald-500 hover:shadow-sm transition-all"
          >
            Add First Project
          </button>
        </div>
      )}

      {/* Project Items */}
      {items.map((item, index) => (
        <div key={index} className="group relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
          {/* Decorative Element */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="space-y-4">
            {/* Project Name */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-2">
                <Code className="size-3 text-emerald-500" />
                Project Name
              </label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                placeholder="e.g., E-commerce Platform"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Project Type</label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = item.type === type.value || item.type === type.label;
                  
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => onChange(index, 'type', type.value)}
                      className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 text-emerald-700' 
                          : 'bg-white border-slate-300 text-slate-700 hover:border-emerald-300'
                      }`}
                    >
                      {typeof Icon === 'string' ? (
                        <span className="text-base">{Icon}</span>
                      ) : (
                        <Icon className="size-4" />
                      )}
                      <span className="text-sm">{type.label}</span>
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                value={item.type || ''}
                onChange={(e) => onChange(index, 'type', e.target.value)}
                placeholder="Or enter custom type"
                className="mt-2 w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Project Description</label>
              <textarea
                rows={4}
                value={item.description || ''}
                onChange={(e) => onChange(index, 'description', e.target.value)}
                placeholder="Describe the project, your role, technologies used, and the impact it made. What problem did it solve? What was your contribution?..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
              <div className="text-xs text-slate-500">
                Tip: Include specific technologies, your role, and measurable outcomes
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.name && item.description ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <span className="text-xs text-slate-600">
                {item.name && item.description ? 'Complete' : 'Incomplete'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-white border border-red-200 text-red-700 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 className="size-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectForm;
import React from "react";
import { PlusCircle, Trash2, Briefcase, Building, Calendar, CheckCircle } from "lucide-react";

const ExperienceForm = ({ items = [], onAdd, onChange, onRemove }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <Briefcase className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Work Experience</h3>
            <p className="text-xs text-slate-600">Add your professional journey</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="group px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <PlusCircle className="size-4 group-hover:scale-110 transition-transform" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-300 text-center hover:border-blue-400 transition-colors group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-50 rounded-full mb-4">
            <Building className="size-8 text-blue-500" />
          </div>
          <h4 className="font-medium text-slate-900 mb-2">No Experience Added</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Add your latest roles to showcase your professional journey and boost profile completion
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-white border border-blue-300 text-blue-700 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
          >
            Add First Experience
          </button>
        </div>
      )}

      {/* Experience Items */}
      {items.map((item, index) => (
        <div key={index} className="group relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
          {/* Decorative Element */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Position */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-2">
                <Briefcase className="size-3 text-blue-500" />
                Position / Role
              </label>
              <input
                type="text"
                value={item.position || ''}
                onChange={(e) => onChange(index, 'position', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Company Name</label>
              <input
                type="text"
                value={item.company || ''}
                onChange={(e) => onChange(index, 'company', e.target.value)}
                placeholder="e.g., Google, Microsoft"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-2">
                <Calendar className="size-3 text-blue-500" />
                Start Date
              </label>
              <input
                type="month"
                value={item.start_date || ''}
                onChange={(e) => onChange(index, 'start_date', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">End Date</label>
              <div className="flex gap-3">
                <input
                  type="month"
                  value={item.end_date || ''}
                  onChange={(e) => onChange(index, 'end_date', e.target.value)}
                  disabled={item.is_current}
                  className={`flex-1 px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${item.is_current ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <label className="inline-flex items-center gap-2 text-sm px-4 py-3 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-xl hover:border-emerald-400 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={item.is_current || false}
                    onChange={(e) => onChange(index, 'is_current', e.target.checked)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.is_current ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                    {item.is_current && <CheckCircle className="size-3.5 text-white" />}
                  </div>
                  <span className="text-slate-700 whitespace-nowrap">Current</span>
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-medium text-slate-600">Role Description & Achievements</label>
            <textarea
              rows={4}
              value={item.description || ''}
              onChange={(e) => onChange(index, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements. Use action verbs and metrics..."
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <div className="text-xs text-slate-500">
              Tip: Include metrics and specific achievements to show impact
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.position && item.company ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <span className="text-xs text-slate-600">
                {item.position && item.company ? 'Complete' : 'Incomplete'}
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

export default ExperienceForm;
import React from "react";
import { GraduationCap, PlusCircle, Trash2, BookOpen, Award, Calendar } from "lucide-react";

const EducationForm = ({ items = [], onAdd, onChange, onRemove }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border border-purple-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <GraduationCap className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Education History</h3>
            <p className="text-xs text-slate-600">Add your academic background</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="group px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <PlusCircle className="size-4 group-hover:scale-110 transition-transform" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-dashed border-slate-300 text-center hover:border-purple-400 transition-colors group">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-50 rounded-full mb-4">
            <BookOpen className="size-8 text-purple-500" />
          </div>
          <h4 className="font-medium text-slate-900 mb-2">No Education Added</h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Include your most recent education or certification to showcase your qualifications
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 px-4 py-2 text-sm bg-gradient-to-r from-purple-100 to-white border border-purple-300 text-purple-700 rounded-lg hover:border-purple-500 hover:shadow-sm transition-all"
          >
            Add First Education
          </button>
        </div>
      )}

      {/* Education Items */}
      {items.map((item, index) => (
        <div key={index} className="group relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
          {/* Decorative Element */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Degree */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-2">
                <Award className="size-3 text-purple-500" />
                Degree / Certification
              </label>
              <input
                type="text"
                value={item.degree || ''}
                onChange={(e) => onChange(index, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Field */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">Field of Study</label>
              <input
                type="text"
                value={item.field || ''}
                onChange={(e) => onChange(index, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Institution */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">Institution Name</label>
              <input
                type="text"
                value={item.institution || ''}
                onChange={(e) => onChange(index, 'institution', e.target.value)}
                placeholder="e.g., Stanford University"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Graduation Date */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 flex items-center gap-2">
                <Calendar className="size-3 text-purple-500" />
                Graduation Date
              </label>
              <input
                type="month"
                value={item.graduation_date || ''}
                onChange={(e) => onChange(index, 'graduation_date', e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* GPA */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">GPA / Score</label>
              <input
                type="text"
                value={item.gpa || ''}
                onChange={(e) => onChange(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.degree && item.institution ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <span className="text-xs text-slate-600">
                {item.degree && item.institution ? 'Complete' : 'Incomplete'}
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

export default EducationForm;
import React from "react";
import {
  BriefcaseBusiness,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Upload,
  Camera,
  CheckCircle,
  Sparkles
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      handleChange("image", file);
    }
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: false },
    { key: "location", label: "Location", icon: MapPin, type: "text", required: false },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", required: false },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url", required: false },
    { key: "website", label: "Personal Website", icon: Globe, type: "url", required: false },
  ];

  const completionPercentage = () => {
    const requiredFields = ['full_name', 'email', 'profession'];
    const completed = requiredFields.filter(field => data[field] && data[field].trim()).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <User className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Personal Information</h3>
            <p className="text-xs text-slate-600">Complete your profile details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-medium text-slate-700">Profile Complete</div>
            <div className="text-xs text-slate-600">{completionPercentage()}%</div>
          </div>
          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Image Upload */}
          <div className="relative">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
              {data.image ? (
                <img
                  src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <User className="size-12 text-slate-400" />
                </div>
              )}
              
              {/* Upload Overlay */}
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="text-center">
                  <Camera className="size-6 text-white mx-auto mb-2" />
                  <span className="text-xs text-white">Change Photo</span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            {/* Upload Button */}
            <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-white border border-blue-300 text-blue-700 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer">
              <Upload className="size-4" />
              <span className="text-sm font-medium">Upload Photo</span>
              <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Image Settings */}
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Photo Settings</h4>
              <p className="text-sm text-slate-600">
                Upload a professional headshot. Recommended size: 400x400px, max 5MB
              </p>
            </div>

            {/* Remove Background Toggle */}
            {typeof data.image === "object" && (
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-white rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg">
                      <Sparkles className="size-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Remove Background</div>
                      <div className="text-xs text-slate-600">AI-powered background removal</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={removeBackground}
                      onChange={() => setRemoveBackground((prev) => !prev)}
                    />
                    <div className="w-14 h-7 bg-slate-300 rounded-full peer-checked:bg-emerald-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7"></div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => {
          const Icon = field.icon;
          const isComplete = data[field.key] && data[field.key].trim();
          
          return (
            <div key={field.key} className="group space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Icon className="size-4 text-blue-500" />
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {isComplete && (
                  <CheckCircle className="size-4 text-emerald-500" />
                )}
              </div>

              <div className="relative">
                <input
                  type={field.type}
                  value={data[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isComplete ? 'border-emerald-300' : 'border-slate-300'
                  }`}
                  required={field.required}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
                <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Tips */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Sparkles className="size-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Tips for a Complete Profile</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span>Use your professional email address</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span>Include your LinkedIn profile for credibility</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span>Add a professional headshot for better engagement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
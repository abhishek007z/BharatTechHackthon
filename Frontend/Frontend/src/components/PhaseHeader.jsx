import { Link, useLocation, useParams } from "react-router-dom";
import { 
  CheckCircle, 
  Circle,
  FileText,
  Palette,
  Target,
  ArrowRight,
  Check
} from "lucide-react";

const PhaseHeader = () => {
  const location = useLocation();
  const { resumeId } = useParams();

  const phases = [
    { 
      id: 1,
      label: "Basic Details", 
      description: "Personal Information",
      path: `/app/builder/phase-1/${resumeId}`,
      icon: <FileText className="w-4 h-4" />
    },
    { 
      id: 2,
      label: "Skill Assessment", 
      description: "Interview Prep",
      path: `/app/builder/phase-2/${resumeId}`,
      icon: <Target className="w-4 h-4" />
    },
    { 
      id: 3,
      label: "Final Review", 
      description: "Preview & Download",
      path: `/app/builder/phase-3/${resumeId}`,
      icon: <CheckCircle className="w-4 h-4" />
    },
  ];

  const currentPhase = phases.find(phase => location.pathname.includes(`phase-${phase.id}`))?.id || 1;

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {phases.map((phase, index) => {
            const isActive = location.pathname.includes(`phase-${phase.id}`);
            const isCompleted = currentPhase > phase.id;
            const isNext = currentPhase < phase.id;
            
            return (
              <div key={phase.id} className="flex items-center flex-1">
                {/* Phase Circle */}
                <div className="relative">
                  <Link
                    to={phase.path}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                      ${isActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" 
                        : isCompleted 
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700" 
                        : isNext
                        ? "bg-gray-100 border-gray-300 text-gray-400"
                        : "bg-blue-50 border-blue-200 text-blue-600"
                      }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <div className="flex flex-col items-center">
                        {phase.icon}
                        <span className="text-xs font-bold mt-0.5">{phase.id}</span>
                      </div>
                    )}
                  </Link>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>

                {/* Phase Info */}
                <div className="ml-3">
                  <Link to={phase.path}>
                    <div className={`text-sm font-semibold transition-colors
                      ${isActive ? "text-blue-700" : isCompleted ? "text-emerald-700" : "text-gray-500"}`}
                    >
                      {phase.label}
                    </div>
                    <div className={`text-xs transition-colors
                      ${isActive ? "text-blue-600" : isCompleted ? "text-emerald-600" : "text-gray-400"}`}
                    >
                      {phase.description}
                    </div>
                  </Link>
                </div>

                {/* Connector Line */}
                {index < phases.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300
                    ${isCompleted ? "bg-emerald-500" : "bg-gray-200"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          {phases.map((phase, index) => {
            const isActive = location.pathname.includes(`phase-${phase.id}`);
            const isCompleted = currentPhase > phase.id;
            
            return (
              <div key={phase.id} className="flex flex-col items-center">
                <div className="relative">
                  <Link
                    to={phase.path}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${isActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                        : isCompleted 
                        ? "bg-emerald-100 border-emerald-500 text-emerald-700" 
                        : "bg-gray-100 border-gray-300 text-gray-400"
                      }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-bold">{phase.id}</span>
                    )}
                  </Link>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white animate-pulse"></div>
                  )}
                </div>
                
                {/* Phase Label - Mobile */}
                <span className={`text-xs font-medium mt-2 text-center
                  ${isActive ? "text-blue-700 font-bold" : isCompleted ? "text-emerald-700" : "text-gray-500"}`}
                >
                  {phase.label.split(" ")[0]}
                </span>
                
                {/* Progress Line */}
                {index < phases.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 transform -translate-y-1/2 transition-colors
                    ${isCompleted ? "bg-emerald-500" : "bg-gray-200"}`}
                    style={{ left: `calc(50% + 20px)`, width: `calc(100% - 40px)` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Phase Status */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">
            {phases.find(p => p.id === currentPhase)?.label} • 
            <span className="font-normal ml-1">
              {phases.find(p => p.id === currentPhase)?.description}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PhaseHeader;
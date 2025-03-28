const CircularProgress = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.round(((currentStep + 1) / totalSteps) * 100); 
    const progress = (percentage / 100) * circumference; 
  
    return (
      <div className="relative w-[200px] h-[200px] mt-3">
        <svg className="transform rotate-[-90deg] w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#07BF62"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[24px] text-[#1F2937] font-bold">{percentage}%</p>
        </div>
      </div>
    );
  };
  
  export default CircularProgress;
  
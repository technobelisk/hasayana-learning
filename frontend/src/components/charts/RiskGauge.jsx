import { cn } from '@/lib/utils';

export const RiskGauge = ({ value = 65, label = "Portfolio Risk Score", size = "md" }) => {
  // Determine color based on value
  const getColor = (val) => {
    if (val >= 80) return 'text-danger';
    if (val >= 60) return 'text-warning';
    return 'text-success';
  };

  const getGradient = (val) => {
    if (val >= 80) return 'from-danger to-danger/70';
    if (val >= 60) return 'from-warning to-warning/70';
    return 'from-success to-success/70';
  };

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  const textSizeClasses = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl'
  };

  // Calculate arc path
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={cn('relative', sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--glass-light))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={value >= 80 ? '#FF4C52' : value >= 60 ? '#FFC947' : '#00D68F'} />
              <stop offset="100%" stopColor={value >= 80 ? '#ff6b6b' : value >= 60 ? '#ffd666' : '#26de81'} />
            </linearGradient>
          </defs>
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn('font-bold metric-number', getColor(value), textSizeClasses[size])}>
            {value}
          </div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </div>
      <p className="text-sm font-medium text-center text-muted-foreground">{label}</p>
    </div>
  );
};

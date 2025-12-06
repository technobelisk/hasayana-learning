import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const MetricCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  subtitle,
  className,
  variant = 'default'
}) => {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  const variantClasses = {
    default: 'glass-card hover-glow-primary',
    primary: 'glass-card-heavy border-primary-500/30',
    success: 'glass-card-heavy border-success/30',
    warning: 'glass-card-heavy border-warning/30',
    danger: 'glass-card-heavy border-danger/30'
  };

  return (
    <div
      className={cn(
        'p-6 rounded-xl transition-all duration-300',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold metric-number">{value}</h3>
            {change && (
              <div
                className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  isPositive && 'text-success',
                  isNegative && 'text-danger',
                  !isPositive && !isNegative && 'text-muted-foreground'
                )}
              >
                {isPositive && <TrendingUp className="w-4 h-4" />}
                {isNegative && <TrendingDown className="w-4 h-4" />}
                <span>{change}</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-xl glass-card-light flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-400" />
          </div>
        )}
      </div>
    </div>
  );
};

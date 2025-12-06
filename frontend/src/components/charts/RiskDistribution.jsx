import { cn } from '@/lib/utils';

export const RiskDistribution = ({ data = [] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = ((item.value / total) * 100).toFixed(1);
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={cn('w-3 h-3 rounded-full', item.color)}
                  style={{ backgroundColor: item.bgColor }}
                />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{item.value}</span>
                <span className="font-semibold metric-number w-12 text-right">{percentage}%</span>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-1000 ease-out rounded-full')}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.bgColor
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { cn } from '@/lib/utils';

export const MiniBarChart = ({ data = [], height = 60, color = 'primary' }) => {
  if (!data.length) return null;

  const max = Math.max(...data.map(d => d.value));

  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    accent: 'bg-accent-500'
  };

  return (
    <div className="flex items-end gap-1" style={{ height: `${height}px` }}>
      {data.map((item, index) => {
        const barHeight = (item.value / max) * 100;
        return (
          <div
            key={index}
            className="flex-1 flex flex-col justify-end group cursor-pointer"
          >
            <div
              className={cn(
                'rounded-t transition-all duration-300',
                colorClasses[color],
                'hover:opacity-80'
              )}
              style={{ height: `${barHeight}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white text-center -mt-6">
                {item.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { useState } from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { RiskGauge } from '@/components/charts/RiskGauge';
import { RiskDistribution } from '@/components/charts/RiskDistribution';
import { MiniBarChart } from '@/components/charts/MiniBarChart';
import {
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PortfolioDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data
  const metrics = [
    {
      title: 'Total Exposure',
      value: '$12.4M',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      subtitle: 'vs. last month'
    },
    {
      title: 'Active Partners',
      value: '248',
      change: '+8',
      changeType: 'positive',
      icon: Users,
      subtitle: '23 new this month'
    },
    {
      title: 'Overdue Amount',
      value: '$1.2M',
      change: '+5.3%',
      changeType: 'negative',
      icon: AlertTriangle,
      subtitle: '42 invoices',
      variant: 'warning'
    },
    {
      title: 'Recovery Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      subtitle: 'Last 90 days'
    }
  ];

  const riskDistribution = [
    { label: 'Good Standing', value: 142, bgColor: '#00D68F' },
    { label: 'Watch List', value: 78, bgColor: '#FFC947' },
    { label: 'High Risk', value: 28, bgColor: '#FF4C52' }
  ];

  const cashInflowData = [
    { month: 'Jan', value: 2.1 },
    { month: 'Feb', value: 2.4 },
    { month: 'Mar', value: 2.8 },
    { month: 'Apr', value: 2.3 },
    { month: 'May', value: 3.1 },
    { month: 'Jun', value: 2.9 },
    { month: 'Jul', value: 3.4 }
  ];

  const topRisks = [
    { partner: 'Acme Corp', exposure: '$450K', score: 85, trend: 'up' },
    { partner: 'Global Trading Inc', exposure: '$380K', score: 78, trend: 'up' },
    { partner: 'TechVentures Ltd', exposure: '$320K', score: 72, trend: 'down' },
    { partner: 'Innovation Partners', exposure: '$290K', score: 68, trend: 'up' }
  ];

  const recentActivities = [
    { action: 'Credit limit increased', partner: 'Delta Industries', time: '5m ago', type: 'positive' },
    { action: 'Payment overdue', partner: 'Acme Corp', time: '12m ago', type: 'negative' },
    { action: 'New partner onboarded', partner: 'Future Tech', time: '1h ago', type: 'neutral' },
    { action: 'Risk score improved', partner: 'Global Systems', time: '2h ago', type: 'positive' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">
            Portfolio Overview
          </h1>
          <p className="text-muted-foreground">Monitor your credit risk portfolio in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 glass-card-light border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/10">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary hover:opacity-90 transition-opacity">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Risk Gauge */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6">Risk Score</h3>
          <div className="flex justify-center">
            <RiskGauge value={65} label="Portfolio Risk Score" size="md" />
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Target Score</span>
              <span className="font-semibold">≤ 60</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Month</span>
              <span className="font-semibold">68</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Trend</span>
              <Badge className="bg-success text-white">Improving</Badge>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="xl:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Risk Bucket Distribution</h3>
            <span className="text-sm text-muted-foreground">248 Total Partners</span>
          </div>
          <RiskDistribution data={riskDistribution} />
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="glass-card-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold metric-number text-success">57%</div>
              <div className="text-xs text-muted-foreground mt-1">Good</div>
            </div>
            <div className="glass-card-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold metric-number text-warning">31%</div>
              <div className="text-xs text-muted-foreground mt-1">Watch</div>
            </div>
            <div className="glass-card-light p-4 rounded-xl text-center">
              <div className="text-2xl font-bold metric-number text-danger">12%</div>
              <div className="text-xs text-muted-foreground mt-1">High Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Inflow Forecast & Top Risks */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Cash Inflow */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Cash Inflow Forecast</h3>
            <Badge className="bg-primary-500/20 text-primary-300 border-primary-500/30">7 Months</Badge>
          </div>
          <div className="mb-4">
            <div className="text-3xl font-bold metric-number">$3.4M</div>
            <div className="text-sm text-muted-foreground">Expected in July</div>
          </div>
          <MiniBarChart data={cashInflowData} height={120} color="primary" />
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            {cashInflowData.map((d, i) => (
              <span key={i}>{d.month}</span>
            ))}
          </div>
        </div>

        {/* Top Risk Partners */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Top Risk Partners</h3>
            <Button variant="ghost" size="sm" className="text-primary-400 hover:text-primary-300">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {topRisks.map((risk, index) => (
              <div
                key={index}
                className="glass-card-light p-4 rounded-xl hover:glass-card transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{risk.partner}</p>
                      {risk.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-danger" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Exposure: {risk.exposure}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold metric-number text-danger">{risk.score}</div>
                    <div className="text-xs text-muted-foreground">Risk Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'positive'
                    ? 'bg-success'
                    : activity.type === 'negative'
                    ? 'bg-danger'
                    : 'bg-primary-400'
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.partner}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

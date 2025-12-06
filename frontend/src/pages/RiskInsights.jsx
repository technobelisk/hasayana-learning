import { useState } from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  TrendingUp,
  Brain,
  Target,
  Zap,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { RiskGauge } from '@/components/charts/RiskGauge';
import { Card } from '@/components/ui/card';

export const RiskInsights = () => {
  const [scenarioValue, setScenarioValue] = useState([50]);

  // Mock data
  const modelDrivers = [
    { factor: 'Payment History', weight: 35, impact: 'High', score: 72 },
    { factor: 'Credit Utilization', weight: 30, impact: 'High', score: 65 },
    { factor: 'Account Age', weight: 15, impact: 'Medium', score: 58 },
    { factor: 'Recent Inquiries', weight: 10, impact: 'Medium', score: 45 },
    { factor: 'Debt-to-Income', weight: 10, impact: 'Low', score: 52 }
  ];

  const insights = [
    {
      title: 'High Risk Concentration',
      description: 'Technology sector accounts for 42% of high-risk exposure',
      severity: 'high',
      action: 'Diversify portfolio across sectors',
      impact: '$1.8M potential exposure'
    },
    {
      title: 'Improving Payment Trends',
      description: 'Average payment delay decreased by 3 days this quarter',
      severity: 'positive',
      action: 'Continue monitoring',
      impact: 'Reduced risk by 5%'
    },
    {
      title: 'Credit Limit Optimization',
      description: '12 partners approaching 90% credit utilization',
      severity: 'medium',
      action: 'Review and adjust credit limits',
      impact: '12 partners affected'
    },
    {
      title: 'Seasonal Pattern Detected',
      description: 'Q4 historically shows 15% increase in overdue invoices',
      severity: 'medium',
      action: 'Prepare collection strategy',
      impact: 'Est. $450K exposure'
    }
  ];

  const recommendations = [
    {
      title: 'Reduce Exposure to Acme Corp',
      priority: 'High',
      reason: 'Risk score increased from 68 to 85 in last 30 days',
      action: 'Lower credit limit by $100K',
      potential: 'Reduce portfolio risk by 2.3%'
    },
    {
      title: 'Early Payment Incentive Program',
      priority: 'Medium',
      reason: '45% of partners pay within discount window',
      action: 'Implement 2% early payment discount',
      potential: 'Improve cash flow by $280K/month'
    },
    {
      title: 'Strengthen Collection Process',
      priority: 'High',
      reason: 'Average collection time increased to 42 days',
      action: 'Deploy automated reminders at day 15',
      potential: 'Reduce DSO by 8 days'
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'text-danger';
      case 'Medium':
        return 'text-warning';
      case 'Low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>;
      case 'positive':
        return <Badge className="bg-success/20 text-success border-success/30">Positive</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-success/20 text-success border-success/30">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-primary mb-2">
          Credit Risk Model Insights
        </h1>
        <p className="text-muted-foreground">AI-powered analysis and strategic recommendations</p>
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Model Accuracy"
          value="96.8%"
          change="+1.2%"
          changeType="positive"
          icon={Target}
          subtitle="Last 90 days"
        />
        <MetricCard
          title="Predictions Made"
          value="1,247"
          icon={Brain}
          subtitle="This month"
        />
        <MetricCard
          title="Active Insights"
          value="18"
          icon={Lightbulb}
          subtitle="Requires action"
          variant="warning"
        />
        <MetricCard
          title="Risk Prevented"
          value="$2.4M"
          change="+18%"
          changeType="positive"
          icon={TrendingUp}
          subtitle="YTD savings"
          variant="success"
        />
      </div>

      {/* Model Drivers & What-If Sandbox */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Model Drivers */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Risk Model Drivers</h3>
              <p className="text-sm text-muted-foreground">Key factors influencing risk scores</p>
            </div>
          </div>
          <div className="space-y-4">
            {modelDrivers.map((driver, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{driver.factor}</span>
                    <Badge className="text-xs bg-primary-500/20 text-primary-300 border-primary-500/30">
                      {driver.weight}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${getImpactColor(driver.impact)}`}>
                      {driver.impact}
                    </span>
                    <span className="text-xs font-semibold metric-number w-8 text-right">
                      {driver.score}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary transition-all duration-1000 ease-out"
                    style={{ width: `${driver.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What-If Sandbox */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">What-If Scenario Analysis</h3>
              <p className="text-sm text-muted-foreground">Test portfolio impact</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card-light p-4 rounded-xl">
              <label className="text-sm font-medium mb-3 block">
                Interest Rate Change
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">-5%</span>
                <Slider
                  value={scenarioValue}
                  onValueChange={setScenarioValue}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">+5%</span>
              </div>
              <div className="text-center mt-3">
                <span className="text-2xl font-bold metric-number text-primary-400">
                  {(scenarioValue[0] - 50) / 10}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-light p-4 rounded-xl text-center">
                <div className="text-2xl font-bold metric-number text-warning">
                  {65 + Math.round((scenarioValue[0] - 50) / 5)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">New Risk Score</div>
              </div>
              <div className="glass-card-light p-4 rounded-xl text-center">
                <div className="text-2xl font-bold metric-number text-danger">
                  ${(1.2 + (scenarioValue[0] - 50) / 100).toFixed(1)}M
                </div>
                <div className="text-xs text-muted-foreground mt-1">Exposure Impact</div>
              </div>
            </div>

            <Button className="w-full gradient-primary hover:opacity-90 transition-opacity">
              Run Full Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">Smart analysis of your portfolio</p>
            </div>
          </div>
          <Badge className="bg-primary-500/20 text-primary-300 border-primary-500/30">
            {insights.length} Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="glass-card-light p-5 rounded-xl hover:glass-card transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold">{insight.title}</h4>
                {getSeverityBadge(insight.severity)}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <ArrowRight className="w-4 h-4 text-primary-400" />
                  <span className="text-foreground">{insight.action}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-accent-500" />
                  <span className="text-muted-foreground">{insight.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CFO Strategy Recommendations */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-success flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Strategic Recommendations</h3>
            <p className="text-sm text-muted-foreground">Actionable playbooks for CFO</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="glass-card-light p-5 rounded-xl hover:glass-card-heavy transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{rec.title}</h4>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rec.reason}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{rec.action}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-success font-medium">{rec.potential}</span>
                    </div>
                  </div>
                </div>
                <Button className="gradient-primary hover:opacity-90 transition-opacity lg:w-40">
                  Take Action
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

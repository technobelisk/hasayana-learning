import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  FileBarChart
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export const ReportsExports = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const reportTemplates = [
    {
      title: 'Executive Summary',
      description: 'High-level portfolio overview for C-suite',
      icon: TrendingUp,
      format: ['PDF', 'PowerPoint'],
      frequency: 'Weekly',
      lastGenerated: '2 days ago'
    },
    {
      title: 'Portfolio Risk Analysis',
      description: 'Detailed risk assessment across all partners',
      icon: FileBarChart,
      format: ['PDF', 'Excel'],
      frequency: 'Monthly',
      lastGenerated: '5 days ago'
    },
    {
      title: 'Partner Performance Report',
      description: 'Individual partner metrics and trends',
      icon: Users,
      format: ['Excel', 'CSV'],
      frequency: 'Monthly',
      lastGenerated: '1 week ago'
    },
    {
      title: 'Invoice Aging Report',
      description: 'Overdue analysis and collection priorities',
      icon: Clock,
      format: ['Excel', 'PDF'],
      frequency: 'Weekly',
      lastGenerated: '1 day ago'
    },
    {
      title: 'Cash Flow Forecast',
      description: 'Projected cash inflows and liquidity planning',
      icon: DollarSign,
      format: ['Excel', 'PDF'],
      frequency: 'Monthly',
      lastGenerated: '3 days ago'
    },
    {
      title: 'Compliance & Audit Trail',
      description: 'Complete audit log for regulatory compliance',
      icon: CheckCircle2,
      format: ['PDF', 'Excel'],
      frequency: 'Quarterly',
      lastGenerated: '2 weeks ago'
    }
  ];

  const quickReports = [
    { name: 'Top 10 High-Risk Partners', timeToGenerate: '5s' },
    { name: 'Overdue Invoices (30+ days)', timeToGenerate: '3s' },
    { name: 'Credit Limit Utilization', timeToGenerate: '4s' },
    { name: 'Payment Delay Trends', timeToGenerate: '6s' }
  ];

  const scheduledReports = [
    {
      name: 'Weekly Executive Dashboard',
      schedule: 'Every Monday 8:00 AM',
      recipients: 'CFO, CEO',
      status: 'active'
    },
    {
      name: 'Monthly Risk Assessment',
      schedule: '1st of every month',
      recipients: 'Risk Team',
      status: 'active'
    },
    {
      name: 'Quarterly Board Report',
      schedule: 'End of quarter',
      recipients: 'Board Members',
      status: 'active'
    }
  ];

  const handleExport = (reportName, format) => {
    toast.success(`Generating ${reportName} in ${format} format...`, {
      description: 'Your report will be ready shortly'
    });
  };

  const handleQuickReport = (reportName) => {
    toast.success(`Generating ${reportName}...`, {
      description: 'Download will start automatically'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">
            Reports & Exports
          </h1>
          <p className="text-muted-foreground">Generate and schedule custom reports for stakeholders</p>
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
        </div>
      </div>

      {/* CFO One-Click Summary */}
      <div className="glass-card-heavy p-8 rounded-2xl glow-primary">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">CFO One-Click Summary</h3>
            <p className="text-muted-foreground">
              Generate a comprehensive executive summary with all key metrics, insights, and recommendations
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              className="gradient-primary hover:opacity-90 transition-opacity h-12 px-8"
              onClick={() => handleExport('CFO Summary', 'PDF')}
            >
              <Download className="w-5 h-5 mr-2" />
              Generate PDF
            </Button>
            <Button
              variant="outline"
              className="glass-card-light border-white/10 h-12 px-8"
              onClick={() => handleExport('CFO Summary', 'PowerPoint')}
            >
              <FileBarChart className="w-5 h-5 mr-2" />
              Generate PPT
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickReports.map((report, index) => (
            <div
              key={index}
              className="glass-card-light p-4 rounded-xl flex items-center justify-between hover:glass-card transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">~ {report.timeToGenerate}</p>
                </div>
              </div>
              <Button
                size="sm"
                className="gradient-primary hover:opacity-90 transition-opacity"
                onClick={() => handleQuickReport(report.name)}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportTemplates.map((template, index) => {
          const Icon = template.icon;
          return (
            <div key={index} className="glass-card p-6 rounded-2xl hover:glass-card-heavy transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl glass-card-light flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{template.title}</h4>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {template.format.map((format, idx) => (
                  <Badge key={idx} className="bg-primary-500/20 text-primary-300 border-primary-500/30">
                    {format}
                  </Badge>
                ))}
                <Badge className="bg-white/5 text-muted-foreground border-white/10">
                  {template.frequency}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-muted-foreground">
                  Last: {template.lastGenerated}
                </span>
                <div className="flex gap-2">
                  {template.format.map((format, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      className="glass-card-light border-white/10"
                      onClick={() => handleExport(template.title, format)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      {format}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheduled Reports */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Scheduled Reports</h3>
          <Button variant="outline" className="glass-card-light border-white/10">
            <Calendar className="w-4 h-4 mr-2" />
            New Schedule
          </Button>
        </div>
        <div className="space-y-3">
          {scheduledReports.map((report, index) => (
            <div
              key={index}
              className="glass-card-light p-4 rounded-xl flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{report.name}</h4>
                  <Badge className="bg-success/20 text-success border-success/30">
                    {report.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {report.schedule}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {report.recipients}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="glass-card-light border-white/10">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="glass-card-light border-white/10">
                  Pause
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

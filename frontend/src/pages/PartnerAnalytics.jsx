import { useState } from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { MiniBarChart } from '@/components/charts/MiniBarChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PartnerAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  // Mock partner data
  const partners = [
    {
      id: 1,
      name: 'Acme Corporation',
      riskScore: 85,
      exposure: '$450,000',
      delayPattern: [5, 8, 12, 10, 15, 18],
      avgDelay: '18 days',
      status: 'high-risk',
      lastPayment: '45 days ago',
      creditLimit: '$500,000'
    },
    {
      id: 2,
      name: 'Global Trading Inc',
      riskScore: 42,
      exposure: '$380,000',
      delayPattern: [2, 3, 1, 2, 3, 2],
      avgDelay: '2 days',
      status: 'good',
      lastPayment: '5 days ago',
      creditLimit: '$450,000'
    },
    {
      id: 3,
      name: 'TechVentures Ltd',
      riskScore: 68,
      exposure: '$320,000',
      delayPattern: [7, 6, 8, 9, 7, 8],
      avgDelay: '8 days',
      status: 'watchlist',
      lastPayment: '12 days ago',
      creditLimit: '$400,000'
    },
    {
      id: 4,
      name: 'Innovation Partners',
      riskScore: 38,
      exposure: '$290,000',
      delayPattern: [1, 2, 1, 0, 1, 2],
      avgDelay: '1 day',
      status: 'good',
      lastPayment: '3 days ago',
      creditLimit: '$350,000'
    },
    {
      id: 5,
      name: 'Delta Industries',
      riskScore: 72,
      exposure: '$265,000',
      delayPattern: [8, 10, 9, 11, 10, 12],
      avgDelay: '10 days',
      status: 'watchlist',
      lastPayment: '18 days ago',
      creditLimit: '$300,000'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-success/20 text-success border-success/30">Good</Badge>;
      case 'watchlist':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Watch List</Badge>;
      case 'high-risk':
        return <Badge variant="destructive">High Risk</Badge>;
      default:
        return null;
    }
  };

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-danger';
    if (score >= 50) return 'text-warning';
    return 'text-success';
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || partner.status === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-primary mb-2">
          Partner Analytics
        </h1>
        <p className="text-muted-foreground">Deep dive into partner risk profiles and payment behavior</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Total Partners"
          value="248"
          change="+8"
          changeType="positive"
          icon={Users}
          subtitle="Active accounts"
        />
        <MetricCard
          title="Avg Risk Score"
          value="52"
          change="-3"
          changeType="positive"
          icon={TrendingDown}
          subtitle="Improving"
          variant="success"
        />
        <MetricCard
          title="Total Exposure"
          value="$12.4M"
          icon={DollarSign}
          subtitle="Across all partners"
        />
        <MetricCard
          title="High Risk Partners"
          value="28"
          change="-2"
          changeType="positive"
          icon={AlertTriangle}
          subtitle="Needs attention"
          variant="warning"
        />
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search partners by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card-light border-white/10"
            />
          </div>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-48 glass-card-light border-white/10">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/10">
              <SelectItem value="all">All Partners</SelectItem>
              <SelectItem value="good">Good Standing</SelectItem>
              <SelectItem value="watchlist">Watch List</SelectItem>
              <SelectItem value="high-risk">High Risk</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="glass-card-light border-white/10">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Partner Cards */}
      <div className="space-y-4">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="glass-card p-6 rounded-2xl hover:glass-card-heavy transition-all duration-300 cursor-pointer hover-glow-primary"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Partner Info */}
              <div className="lg:col-span-3 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{partner.name}</h3>
                    {getStatusBadge(partner.status)}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exposure</span>
                    <span className="font-semibold">{partner.exposure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Limit</span>
                    <span className="font-semibold">{partner.creditLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Payment</span>
                    <span className="font-semibold">{partner.lastPayment}</span>
                  </div>
                </div>
              </div>

              {/* Risk Score */}
              <div className="lg:col-span-2 flex flex-col items-center justify-center glass-card-light rounded-xl p-4">
                <div className={`text-4xl font-bold metric-number ${getRiskColor(partner.riskScore)}`}>
                  {partner.riskScore}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Risk Score</div>
                <div className="mt-2">
                  {partner.riskScore < 50 ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : partner.riskScore < 70 ? (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-danger" />
                  )}
                </div>
              </div>

              {/* Behavior History */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Payment Delay Pattern</h4>
                  <span className="text-xs text-muted-foreground">Last 6 months</span>
                </div>
                <MiniBarChart
                  data={partner.delayPattern.map((val, idx) => ({ value: val }))}
                  height={80}
                  color={partner.status === 'good' ? 'success' : partner.status === 'watchlist' ? 'warning' : 'danger'}
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Delay</span>
                  <span className={`font-semibold ${getRiskColor(partner.riskScore)}`}>
                    {partner.avgDelay}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:col-span-3 flex flex-col justify-center gap-2">
                <Button className="gradient-primary hover:opacity-90 transition-opacity w-full">
                  View Details
                </Button>
                <Button variant="outline" className="glass-card-light border-white/10 w-full">
                  Adjust Limit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="glass-card p-12 rounded-2xl text-center">
          <p className="text-muted-foreground">No partners found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

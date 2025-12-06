import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MetricCard } from '@/components/ui/metric-card';
import { DollarSign, FileText, AlertTriangle, TrendingUp } from 'lucide-react';

export const InvoiceExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock invoice data
  const invoices = [
    {
      id: 'INV-2024-001',
      partner: 'Acme Corporation',
      amount: 125000,
      dueDate: '2024-01-15',
      status: 'overdue',
      daysOverdue: 45,
      aging: '30-60 days'
    },
    {
      id: 'INV-2024-002',
      partner: 'Global Trading Inc',
      amount: 87500,
      dueDate: '2024-02-10',
      status: 'paid',
      paidDate: '2024-02-08',
      aging: 'current'
    },
    {
      id: 'INV-2024-003',
      partner: 'TechVentures Ltd',
      amount: 156000,
      dueDate: '2024-02-28',
      status: 'pending',
      aging: 'current'
    },
    {
      id: 'INV-2024-004',
      partner: 'Delta Industries',
      amount: 94000,
      dueDate: '2024-01-20',
      status: 'overdue',
      daysOverdue: 15,
      aging: '0-30 days'
    },
    {
      id: 'INV-2024-005',
      partner: 'Innovation Partners',
      amount: 210000,
      dueDate: '2024-03-05',
      status: 'pending',
      aging: 'current'
    },
    {
      id: 'INV-2024-006',
      partner: 'Future Tech Co',
      amount: 67500,
      dueDate: '2023-12-10',
      status: 'overdue',
      daysOverdue: 82,
      aging: '60+ days'
    },
    {
      id: 'INV-2024-007',
      partner: 'Global Systems',
      amount: 142000,
      dueDate: '2024-02-15',
      status: 'paid',
      paidDate: '2024-02-14',
      aging: 'current'
    }
  ];

  const getStatusBadge = (status, daysOverdue) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-success/20 text-success border-success/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-primary-500/20 text-primary-300 border-primary-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue {daysOverdue}d
          </Badge>
        );
      default:
        return null;
    }
  };

  const getAgingColor = (aging) => {
    if (aging === '60+ days') return 'text-danger';
    if (aging === '30-60 days') return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-primary mb-2">
          Invoice Explorer
        </h1>
        <p className="text-muted-foreground">Track and manage all invoices with aging analysis</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Total Invoices"
          value={totalInvoices.toString()}
          icon={FileText}
          subtitle="Active invoices"
        />
        <MetricCard
          title="Total Value"
          value={formatCurrency(totalAmount)}
          icon={DollarSign}
          subtitle="All invoices"
        />
        <MetricCard
          title="Overdue Amount"
          value={formatCurrency(overdueAmount)}
          change={`${overdueCount} invoices`}
          icon={AlertTriangle}
          variant="danger"
        />
        <MetricCard
          title="Collection Rate"
          value="94.2%"
          change="+2.1%"
          changeType="positive"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by invoice ID or partner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card-light border-white/10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 glass-card-light border-white/10">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/10">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-primary hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">
                  <div className="flex items-center gap-2">
                    Invoice ID
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">Partner</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Amount</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Due Date</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Aging</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="border-b border-white/5 hover:glass-card-light transition-colors cursor-pointer"
                >
                  <TableCell className="font-mono font-semibold">{invoice.id}</TableCell>
                  <TableCell>{invoice.partner}</TableCell>
                  <TableCell className="text-right font-semibold metric-number">
                    {formatCurrency(invoice.amount)}
                  </TableCell>
                  <TableCell className="text-sm">{invoice.dueDate}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${getAgingColor(invoice.aging)}`}>
                      {invoice.aging}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status, invoice.daysOverdue)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:glass-card-light">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="glass-card p-12 rounded-2xl text-center">
          <p className="text-muted-foreground">No invoices found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

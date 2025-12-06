import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Database,
  Filter,
  GitMerge,
  BarChart3,
  Users,
  TrendingUp,
  Download,
  Play,
  Trash2,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const DataPipeline = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState('idle'); // idle, processing, completed, error
  const [currentStep, setCurrentStep] = useState(0);
  const [processedData, setProcessedData] = useState(null);

  // Pipeline steps
  const pipelineSteps = [
    {
      id: 1,
      name: 'Data Upload',
      icon: Upload,
      description: 'Upload CSV file with invoice data',
      status: 'completed',
      color: 'text-success'
    },
    {
      id: 2,
      name: 'Standardize',
      icon: Database,
      description: 'Clean and standardize data formats',
      status: 'processing',
      color: 'text-primary-400'
    },
    {
      id: 3,
      name: 'Deduplicate',
      icon: Filter,
      description: 'Remove duplicate records',
      status: 'pending',
      color: 'text-muted-foreground'
    },
    {
      id: 4,
      name: 'Merge',
      icon: GitMerge,
      description: 'Merge payment and invoice data',
      status: 'pending',
      color: 'text-muted-foreground'
    },
    {
      id: 5,
      name: 'Invoice Aggregation',
      icon: FileText,
      description: 'Aggregate data by invoice',
      status: 'pending',
      color: 'text-muted-foreground'
    },
    {
      id: 6,
      name: 'Partner Aggregation',
      icon: Users,
      description: 'Aggregate data by partner',
      status: 'pending',
      color: 'text-muted-foreground'
    },
    {
      id: 7,
      name: 'Metrics Generation',
      icon: BarChart3,
      description: 'Calculate partner-level metrics',
      status: 'pending',
      color: 'text-muted-foreground'
    },
    {
      id: 8,
      name: 'Cash Flow Forecast',
      icon: TrendingUp,
      description: 'Generate cash flow predictions',
      status: 'pending',
      color: 'text-muted-foreground'
    }
  ];

  // Sample data structure
  const sampleData = [
    {
      'Run Date': '2024-01-15',
      'Partner Code': 'P001',
      'Partner Name': 'Acme Corporation',
      'Invoice Number': 'INV-2024-001',
      'Paymt Ref': 'PMT-001',
      'Invoice Date': '2024-01-01',
      'Invoice Amount': '125000',
      'Due Date': '2024-01-15',
      'Due Amount': '125000',
      'Pymnt Dt': '2024-02-28',
      'Payment Amount': '125000',
      'Allocated Amt': '125000'
    },
    {
      'Run Date': '2024-01-20',
      'Partner Code': 'P002',
      'Partner Name': 'Global Trading Inc',
      'Invoice Number': 'INV-2024-002',
      'Paymt Ref': 'PMT-002',
      'Invoice Date': '2024-01-10',
      'Invoice Amount': '87500',
      'Due Date': '2024-02-10',
      'Due Amount': '87500',
      'Pymnt Dt': '2024-02-08',
      'Payment Amount': '87500',
      'Allocated Amt': '87500'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        toast.success('File uploaded successfully!', {
          description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`
        });
      } else {
        toast.error('Invalid file type', {
          description: 'Please upload a CSV file'
        });
      }
    }
  };

  const handleProcessPipeline = () => {
    setProcessing(true);
    setPipelineStatus('processing');
    setCurrentStep(0);
    
    toast.info('Pipeline started', {
      description: 'Processing your data...'
    });

    // Simulate pipeline processing
    const totalSteps = pipelineSteps.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      
      if (step >= totalSteps) {
        clearInterval(interval);
        setProcessing(false);
        setPipelineStatus('completed');
        setProcessedData({
          totalRecords: 1247,
          duplicatesRemoved: 23,
          invoicesProcessed: 1224,
          partnersProcessed: 248,
          metricsGenerated: 12,
          forecastGenerated: true
        });
        toast.success('Pipeline completed!', {
          description: 'All data processed successfully'
        });
      }
    }, 1500);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-primary-400 animate-pulse" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-danger" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />;
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setProcessing(false);
    setPipelineStatus('idle');
    setCurrentStep(0);
    setProcessedData(null);
    toast.info('Pipeline reset');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">
            Data Processing Pipeline
          </h1>
          <p className="text-muted-foreground">Upload and process invoice data through automated pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="glass-card-light border-white/10"
            onClick={handleReset}
            disabled={processing}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            className="gradient-primary hover:opacity-90 transition-opacity"
            onClick={handleProcessPipeline}
            disabled={!uploadedFile || processing || pipelineStatus === 'completed'}
          >
            <Play className="w-4 h-4 mr-2" />
            {processing ? 'Processing...' : 'Run Pipeline'}
          </Button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Upload Invoice Data</h3>
            <p className="text-muted-foreground mb-4">
              Upload CSV file with columns: Run Date, Partner Code, Partner Name, Invoice Number, 
              Paymt Ref, Invoice Date, Invoice Amount, Due Date, Due Amount, Pymnt Dt, Payment Amount, Allocated Amt
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={processing}
                />
                <div className="glass-card-light border-2 border-dashed border-primary-500/30 rounded-xl p-6 cursor-pointer hover:border-primary-400/50 hover:glass-card transition-all duration-300 text-center">
                  {uploadedFile ? (
                    <div className="space-y-2">
                      <FileText className="w-8 h-8 text-primary-400 mx-auto" />
                      <p className="font-semibold">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                      <p className="font-semibold">Click to upload CSV file</p>
                      <p className="text-sm text-muted-foreground">or drag and drop</p>
                    </div>
                  )}
                </div>
              </label>
              
              <Button
                variant="outline"
                className="glass-card-light border-white/10 sm:w-auto w-full"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'sample_data.csv';
                  a.click();
                  toast.success('Sample file downloaded');
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Sample
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Progress */}
      {(processing || pipelineStatus === 'completed') && (
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Pipeline Progress</h3>
            <Badge className={cn(
              pipelineStatus === 'completed' ? 'bg-success/20 text-success border-success/30' :
              pipelineStatus === 'processing' ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' :
              'bg-muted'
            )}>
              {pipelineStatus === 'completed' ? 'Completed' : 
               pipelineStatus === 'processing' ? 'Processing' : 'Idle'}
            </Badge>
          </div>
          
          <Progress 
            value={(currentStep / pipelineSteps.length) * 100} 
            className="mb-6 h-2"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineSteps.map((step, index) => {
              const isActive = index < currentStep;
              const isCurrent = index === currentStep - 1;
              const Icon = step.icon;
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    'glass-card-light p-4 rounded-xl transition-all duration-500',
                    isActive && 'glass-card border-primary-500/30',
                    isCurrent && 'glow-primary'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500',
                      isActive ? 'gradient-primary shadow-lg' : 'glass-card-light'
                    )}>
                      <Icon className={cn(
                        'w-5 h-5 transition-colors duration-500',
                        isActive ? 'text-white' : 'text-muted-foreground'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={cn(
                          'text-sm font-semibold transition-colors duration-500',
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                          {step.name}
                        </h4>
                        {isActive && getStatusIcon(isCurrent ? 'processing' : 'completed')}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Dashboard */}
      {pipelineStatus === 'completed' && processedData && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-primary-400" />
                <span className="text-sm text-muted-foreground">Total Records</span>
              </div>
              <div className="text-3xl font-bold metric-number">{processedData.totalRecords.toLocaleString()}</div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Filter className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Duplicates Removed</span>
              </div>
              <div className="text-3xl font-bold metric-number text-warning">{processedData.duplicatesRemoved}</div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Invoices Processed</span>
              </div>
              <div className="text-3xl font-bold metric-number text-success">{processedData.invoicesProcessed.toLocaleString()}</div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-accent-500" />
                <span className="text-sm text-muted-foreground">Partners Analyzed</span>
              </div>
              <div className="text-3xl font-bold metric-number text-accent-500">{processedData.partnersProcessed}</div>
            </div>
          </div>

          {/* Data Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="glass-card p-1 border border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:glass-card-heavy">Overview</TabsTrigger>
              <TabsTrigger value="invoices" className="data-[state=active]:glass-card-heavy">Invoices</TabsTrigger>
              <TabsTrigger value="partners" className="data-[state=active]:glass-card-heavy">Partners</TabsTrigger>
              <TabsTrigger value="metrics" className="data-[state=active]:glass-card-heavy">Metrics</TabsTrigger>
              <TabsTrigger value="forecast" className="data-[state=active]:glass-card-heavy">Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold mb-4">Processing Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <span className="text-sm">Data Standardization</span>
                    <Badge className="bg-success/20 text-success border-success/30">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <span className="text-sm">Deduplication</span>
                    <Badge className="bg-success/20 text-success border-success/30">23 records removed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <span className="text-sm">Invoice Aggregation</span>
                    <Badge className="bg-success/20 text-success border-success/30">1,224 invoices</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <span className="text-sm">Partner Aggregation</span>
                    <Badge className="bg-success/20 text-success border-success/30">248 partners</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <span className="text-sm">Metrics Generated</span>
                    <Badge className="bg-success/20 text-success border-success/30">12 metrics per partner</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-card-light rounded-lg">
                    <span className="text-sm">Cash Flow Forecast</span>
                    <Badge className="bg-success/20 text-success border-success/30">6 months projected</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Invoice Aggregation Results</h3>
                  <Button variant="outline" className="glass-card-light border-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">Processed 1,224 invoices with payment allocations</p>
                <div className="glass-card-light p-4 rounded-xl text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Invoice data preview available after processing</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="partners">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Partner Aggregation Results</h3>
                  <Button variant="outline" className="glass-card-light border-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">Analyzed 248 partners with complete metrics</p>
                <div className="glass-card-light p-4 rounded-xl text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Partner data preview available after processing</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Partner-Level Metrics</h3>
                  <Button variant="outline" className="glass-card-light border-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Average Payment Delay',
                    'Credit Utilization %',
                    'Payment Consistency Score',
                    'Risk Score',
                    'Total Exposure',
                    'Outstanding Amount',
                    'Payment Frequency',
                    'Default Probability',
                    'Cash Conversion Cycle',
                    'Days Sales Outstanding',
                    'Collection Efficiency',
                    'Credit Limit Usage'
                  ].map((metric, index) => (
                    <div key={index} className="glass-card-light p-4 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">{metric}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forecast">
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Cash Flow Forecast</h3>
                  <Button variant="outline" className="glass-card-light border-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">6-month cash flow projection based on historical patterns</p>
                <div className="glass-card-light p-4 rounded-xl text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Forecast visualization available after processing</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Download Section */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Download Processed Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="gradient-primary hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4 mr-2" />
                All Data (CSV)
              </Button>
              <Button variant="outline" className="glass-card-light border-white/10">
                <Download className="w-4 h-4 mr-2" />
                Invoices (Excel)
              </Button>
              <Button variant="outline" className="glass-card-light border-white/10">
                <Download className="w-4 h-4 mr-2" />
                Partners (Excel)
              </Button>
              <Button variant="outline" className="glass-card-light border-white/10">
                <Download className="w-4 h-4 mr-2" />
                Forecast (PDF)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

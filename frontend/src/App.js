import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import { Toaster } from '@/components/ui/sonner';

// Pages
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PortfolioDashboard } from '@/pages/PortfolioDashboard';
import { PartnerAnalytics } from '@/pages/PartnerAnalytics';
import { InvoiceExplorer } from '@/pages/InvoiceExplorer';
import { RiskInsights } from '@/pages/RiskInsights';
import { ReportsExports } from '@/pages/ReportsExports';

function App() {
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<PortfolioDashboard />} />
            <Route path="partners" element={<PartnerAnalytics />} />
            <Route path="invoices" element={<InvoiceExplorer />} />
            <Route path="insights" element={<RiskInsights />} />
            <Route path="reports" element={<ReportsExports />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

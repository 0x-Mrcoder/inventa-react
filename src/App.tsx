import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppContainer } from './components/Layout/AppContainer';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Sales } from './pages/Sales';
import { Inventory } from './pages/Inventory';
import { Customers } from './pages/Customers';
import { SaleHistory } from './pages/SaleHistory';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import './App.css';
import './styles/global.css';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const getPageInfo = (path: string) => {
    switch (path) {
      case '/':
        return { title: 'Dashboard', subtitle: 'Overview of your business performance' };
      case '/sales':
        return { title: 'Sell Items', subtitle: 'Process sales and manage transactions' };
      case '/inventory':
        return { title: 'Stock Items', subtitle: 'Manage your inventory and products' };
      case '/customers':
        return { title: 'Customers', subtitle: 'Manage customer information and relationships' };
      case '/credit':
        return { title: 'Sale History', subtitle: 'View and manage all your sales history' };
      case '/reports':
        return { title: 'Reports', subtitle: 'Generate and view business reports' };
      case '/settings':
        return { title: 'Settings', subtitle: 'Configure your application settings' };
      default:
        return { title: 'Inventa', subtitle: 'Business Management System' };
    }
  };

  const pageInfo = getPageInfo(currentPath);

  return (
    <Router>
      <AppContainer>
        <Sidebar currentPath={currentPath} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />
          <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/credit" element={<SaleHistory />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </AppContainer>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

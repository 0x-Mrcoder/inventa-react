import React from 'react';
import { useApp } from '../context/AppContext';

export const Reports: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="content">
      {/* Reports Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="material-icons-round">trending_up</i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">₦0</h3>
            <p className="stat-label">Total Revenue</p>
            <div className="stat-change positive">
              <i className="material-icons-round">trending_up</i>
              <span>+0%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="material-icons-round">inventory_2</i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{state.products.length}</h3>
            <p className="stat-label">Total Products</p>
            <div className="stat-change positive">
              <i className="material-icons-round">trending_up</i>
              <span>+0%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="material-icons-round">people</i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{state.customers.length}</h3>
            <p className="stat-label">Total Customers</p>
            <div className="stat-change positive">
              <i className="material-icons-round">trending_up</i>
              <span>+0%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="material-icons-round">receipt</i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{state.sales.length}</h3>
            <p className="stat-label">Total Sales</p>
            <div className="stat-change positive">
              <i className="material-icons-round">trending_up</i>
              <span>+0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Content */}
      <div className="reports-section">
        <div className="form-card">
          <div className="form-header">
            <h3>Business Reports</h3>
            <div className="header-actions">
              <button className="btn-primary">
                <i className="material-icons-round">download</i>
                Export Report
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="reports-grid">
              <div className="report-item">
                <div className="report-icon">
                  <i className="material-icons-round">bar_chart</i>
                </div>
                <div className="report-content">
                  <h4>Sales Report</h4>
                  <p>View detailed sales analytics and trends</p>
                </div>
                <button className="btn-secondary">
                  <i className="material-icons-round">visibility</i>
                  View
                </button>
              </div>
              
              <div className="report-item">
                <div className="report-icon">
                  <i className="material-icons-round">inventory</i>
                </div>
                <div className="report-content">
                  <h4>Inventory Report</h4>
                  <p>Track stock levels and product performance</p>
                </div>
                <button className="btn-secondary">
                  <i className="material-icons-round">visibility</i>
                  View
                </button>
              </div>
              
              <div className="report-item">
                <div className="report-icon">
                  <i className="material-icons-round">people</i>
                </div>
                <div className="report-content">
                  <h4>Customer Report</h4>
                  <p>Analyze customer behavior and preferences</p>
                </div>
                <button className="btn-secondary">
                  <i className="material-icons-round">visibility</i>
                  View
                </button>
              </div>
              
              <div className="report-item">
                <div className="report-icon">
                  <i className="material-icons-round">account_balance_wallet</i>
                </div>
                <div className="report-content">
                  <h4>Financial Report</h4>
                  <p>Revenue, profit, and financial insights</p>
                </div>
                <button className="btn-secondary">
                  <i className="material-icons-round">visibility</i>
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Customers: React.FC = () => {
  const { state } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="content">
      {/* Actions */}
      <div className="actions-bar">
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <i className="material-icons-round">person_add</i>
          Add Customer
        </button>
        <button className="btn-secondary">
          <i className="material-icons-round">download</i>
          Export Customers
        </button>
      </div>

      {/* Add Customer Form */}
      {showAddForm && (
        <div className="add-customer-section" style={{ display: 'block' }}>
          <div className="form-card">
            <div className="form-header">
              <h3>Add New Customer</h3>
              <button className="btn-close" onClick={() => setShowAddForm(false)}>
                <i className="material-icons-round">close</i>
              </button>
            </div>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerName">Customer Name *</label>
                  <input type="text" id="customerName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="customerPhone">Phone Number *</label>
                  <input type="tel" id="customerPhone" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerEmail">Email Address</label>
                  <input type="email" id="customerEmail" />
                </div>
                <div className="form-group">
                  <label htmlFor="customerAddress">Address</label>
                  <input type="text" id="customerAddress" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="creditLimit">Credit Limit (₦)</label>
                  <input type="number" id="creditLimit" min="0" defaultValue="0" />
                </div>
                <div className="form-group">
                  <label htmlFor="customerType">Customer Type</label>
                  <select id="customerType">
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="contractor">Contractor</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="customerNotes">Notes</label>
                <textarea id="customerNotes" rows={3}></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="button" className="btn-primary">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="customers-section">
        <div className="form-card">
          <div className="form-header">
            <h3>Customer List</h3>
            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Search customers..." />
                <i className="material-icons-round">search</i>
              </div>
              <div className="filter-actions">
                <select>
                  <option value="all">All Customers</option>
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="customers-table-container">
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="customer-info">
                          <div className="customer-name">{customer.name}</div>
                          <div className="customer-email">{customer.email}</div>
                        </div>
                      </td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-danger btn-small">
                            <i className="material-icons-round">delete</i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
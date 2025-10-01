import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SaleHistory: React.FC = () => {
  const { state } = useApp();
  const [showNewSaleForm, setShowNewSaleForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="content">
      {/* Actions */}
      <div className="actions-bar">
        <button className="btn-primary" onClick={() => setShowNewSaleForm(!showNewSaleForm)}>
          <i className="material-icons-round">add_shopping_cart</i>
          New Sale
        </button>
        <button className="btn-secondary" onClick={() => setShowPaymentForm(!showPaymentForm)}>
          <i className="material-icons-round">payment</i>
          Record Payment
        </button>
        <button className="btn-secondary">
          <i className="material-icons-round">person_add</i>
          Add Customer
        </button>
        <button className="btn-secondary">
          <i className="material-icons-round">download</i>
          Export History
        </button>
      </div>

      {/* New Sale Form */}
      {showNewSaleForm && (
        <div className="new-sale-section" style={{ display: 'block' }}>
          <div className="form-card">
            <div className="form-header">
              <h3>New Sale</h3>
              <button className="btn-close" onClick={() => setShowNewSaleForm(false)}>
                <i className="material-icons-round">close</i>
              </button>
            </div>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="saleCustomer">Customer</label>
                  <select id="saleCustomer" required>
                    <option value="">Select Customer</option>
                    {state.customers.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="saleDate">Sale Date</label>
                  <input type="date" id="saleDate" required />
                </div>
              </div>
              
              <div className="form-group">
                <label>Sale Items</label>
                <div className="items-container">
                  <div className="item-row">
                    <select className="item-select" required>
                      <option value="">Select Item</option>
                      {state.products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                    <input type="number" className="quantity-input" placeholder="Quantity" min="1" required />
                    <input type="number" className="price-input" placeholder="Unit Price" step="0.01" min="0" required />
                    <button type="button" className="btn-remove">
                      <i className="material-icons-round">remove</i>
                    </button>
                  </div>
                </div>
                <button type="button" className="btn-add-item">
                  <i className="material-icons-round">add</i>
                  Add Item
                </button>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input type="date" id="dueDate" required />
                </div>
                <div className="form-group">
                  <label htmlFor="creditNotes">Notes</label>
                  <input type="text" id="creditNotes" placeholder="Additional notes..." />
                </div>
              </div>
              
              <div className="sale-summary">
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>₦0.00</span>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowNewSaleForm(false)}>Cancel</button>
                <button type="button" className="btn-primary">Create Sale</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Form */}
      {showPaymentForm && (
        <div className="record-payment-section" style={{ display: 'block' }}>
          <div className="form-card">
            <div className="form-header">
              <h3>Record Payment</h3>
              <button className="btn-close" onClick={() => setShowPaymentForm(false)}>
                <i className="material-icons-round">close</i>
              </button>
            </div>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="paymentCustomer">Customer</label>
                  <select id="paymentCustomer" required>
                    <option value="">Select Customer</option>
                    {state.customers.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="paymentAmount">Payment Amount</label>
                  <input type="number" id="paymentAmount" placeholder="Enter amount" step="0.01" min="0" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="paymentMethod">Payment Method</label>
                  <select id="paymentMethod" required>
                    <option value="">Select Method</option>
                    <option value="cash">Cash</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="card">ATM Card</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="paymentDate">Payment Date</label>
                  <input type="date" id="paymentDate" required />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="paymentNotes">Notes</label>
                <textarea id="paymentNotes" placeholder="Additional notes..." rows={3}></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPaymentForm(false)}>Cancel</button>
                <button type="button" className="btn-primary">Record Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sales Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="material-icons-round">point_of_sale</i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">₦0</h3>
            <p className="stat-label">Today's Sales</p>
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
            <h3 className="stat-value">0</h3>
            <p className="stat-label">Today's Transactions</p>
            <div className="stat-change positive">
              <i className="material-icons-round">trending_up</i>
              <span>+0%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="material-icons-round">account_balance_wallet</i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">₦0</h3>
            <p className="stat-label">Average Sale</p>
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
            <h3 className="stat-value">0</h3>
            <p className="stat-label">Items Sold Today</p>
            <div className="stat-change positive">
              <i className="material-icons-round">trending_up</i>
              <span>+0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sale History Table */}
      <div className="sale-history-section">
        <div className="form-card">
          <div className="form-header">
            <h3>Sale History</h3>
            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Search sales..." />
                <i className="material-icons-round">search</i>
              </div>
              <div className="filter-actions">
                <select>
                  <option value="all">All Sales</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="sales-table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{new Date(sale.date).toLocaleDateString()}</td>
                      <td>{sale.customer}</td>
                      <td>{sale.items.length} items</td>
                      <td>₦{sale.total.toLocaleString()}</td>
                      <td>
                        <span className={`payment-badge ${sale.paymentMethod}`}>
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span className={`type-badge ${sale.type}`}>
                          {sale.type}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-primary btn-small">
                            <i className="material-icons-round">visibility</i>
                          </button>
                          <button className="btn-secondary btn-small">
                            <i className="material-icons-round">edit</i>
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
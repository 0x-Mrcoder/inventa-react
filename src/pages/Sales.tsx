import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Sales: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'normal' | 'credit' | 'return'>('normal');

  return (
    <div className="content">
      {/* Sale Type Filter Buttons */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'normal' ? 'active' : ''}`}
            onClick={() => setActiveTab('normal')}
          >
            <i className="material-icons-round">point_of_sale</i>
            <span>Normal Sell</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'credit' ? 'active' : ''}`}
            onClick={() => setActiveTab('credit')}
          >
            <i className="material-icons-round">credit_card</i>
            <span>Sell on Credit</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'return' ? 'active' : ''}`}
            onClick={() => setActiveTab('return')}
          >
            <i className="material-icons-round">undo</i>
            <span>Return Sells</span>
          </button>
        </div>
      </div>

      {/* Product Selection for Sale */}
      <div className="record-sale-section" style={{ display: 'block' }}>
        <div className="form-card">
          <div className="form-header">
            <h3>Select Products to Sell</h3>
            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Search products..." />
                <i className="material-icons-round">search</i>
              </div>
              <div className="filter-actions">
                <select>
                  <option value="all">All Brands</option>
                  <option value="Dangote">Dangote</option>
                  <option value="Lafarge">Lafarge</option>
                  <option value="Steel Works">Steel Works</option>
                  <option value="Dulux">Dulux</option>
                  <option value="Berger">Berger</option>
                  <option value="Premium Sand">Premium Sand</option>
                  <option value="Hardware Pro">Hardware Pro</option>
                  <option value="AquaFlow">AquaFlow</option>
                </select>
              </div>
              <div className="cart-info">
                <span className="cart-count">0</span>
                <button className="mark-sold-btn" disabled>
                  <i className="material-icons-round">shopping_cart</i>
                  <span>Mark as Sold</span>
                </button>
                <button className="btn-secondary">
                  <i className="material-icons-round">receipt_long</i>
                  <span>Invoice</span>
                </button>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Sales Qty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-image">
                          <i className="material-icons-round">inventory_2</i>
                        </div>
                      </td>
                      <td>{product.name}</td>
                      <td>Dangote</td>
                      <td>{product.category}</td>
                      <td>{product.stock}</td>
                      <td>bags</td>
                      <td>₦{product.price.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                          {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </td>
                      <td>
                        <input type="number" min="1" max={product.stock} defaultValue="1" className="quantity-input" />
                      </td>
                      <td>
                        <button className="btn-primary btn-small">
                          <i className="material-icons-round">add</i>
                          Add
                        </button>
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

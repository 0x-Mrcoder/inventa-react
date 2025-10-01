import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Inventory: React.FC = () => {
  const { state } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="content">
      {/* Actions */}
      <div className="actions-bar">
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <i className="material-icons-round">add_box</i>
          Add Products
        </button>
        <button className="btn-secondary">
          <i className="material-icons-round">edit</i>
          Stock Adjustment
        </button>
        <button className="btn-secondary">
          <i className="material-icons-round">download</i>
          Export Data
        </button>
        <button className="btn-secondary">
          <i className="material-icons-round">upload</i>
          Import CSV
        </button>
      </div>

      {/* Add Products Form */}
      {showAddForm && (
        <div className="purchase-form-section" style={{ display: 'block' }}>
          <div className="form-card">
            <div className="form-header">
              <h3>Add New Products</h3>
              <button className="btn-close" onClick={() => setShowAddForm(false)}>
                <i className="material-icons-round">close</i>
              </button>
            </div>
            <form>
              {/* Product Image */}
              <div className="form-group">
                <label htmlFor="productImage">Product Image</label>
                <div className="image-upload-container">
                  <div className="file-upload-area">
                    <input type="file" id="productImage" accept="image/*" style={{ display: 'none' }} />
                    <div className="upload-placeholder">
                      <i className="material-icons-round">cloud_upload</i>
                      <span>Click to upload image</span>
                      <small>Supports JPG, PNG, GIF (Max 5MB)</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Basic Information */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productName">Product Name *</label>
                  <input type="text" id="productName" placeholder="Enter product name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="productSku">SKU</label>
                  <input type="text" id="productSku" placeholder="Enter SKU (optional)" />
                </div>
              </div>
              
              {/* Category Selection */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productCategory">Category *</label>
                  <div className="category-select-container">
                    <select id="productCategory" required>
                      <option value="">Select Category</option>
                      <option value="Cement">Cement</option>
                      <option value="Steel">Steel</option>
                      <option value="Aggregates">Aggregates</option>
                      <option value="Paint">Paint</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Plumbing">Plumbing</option>
                    </select>
                    <button type="button" className="btn-secondary btn-small">
                      <i className="material-icons-round">add</i>
                      New Category
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="productBrand">Brand *</label>
                  <div className="brand-select-container">
                    <select id="productBrand" required>
                      <option value="">Select Brand</option>
                      <option value="Dangote">Dangote</option>
                      <option value="Lafarge">Lafarge</option>
                      <option value="Steel Works">Steel Works</option>
                      <option value="Dulux">Dulux</option>
                      <option value="Berger">Berger</option>
                    </select>
                    <button type="button" className="btn-secondary btn-small">
                      <i className="material-icons-round">add</i>
                      New Brand
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock and Pricing Information */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productQuantity">Initial Quantity *</label>
                  <input type="number" id="productQuantity" placeholder="Enter quantity" min="0" required />
                </div>
                <div className="form-group">
                  <label htmlFor="productUnit">Unit *</label>
                  <select id="productUnit" required>
                    <option value="">Select Unit</option>
                    <option value="bags">Bags</option>
                    <option value="pieces">Pieces</option>
                    <option value="loads">Loads</option>
                    <option value="gallons">Gallons</option>
                    <option value="boxes">Boxes</option>
                    <option value="meters">Meters</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productPrice">Selling Price *</label>
                  <input type="number" id="productPrice" placeholder="Enter selling price" min="0" step="0.01" required />
                </div>
                <div className="form-group">
                  <label htmlFor="productCost">Cost Price</label>
                  <input type="number" id="productCost" placeholder="Enter cost price" min="0" step="0.01" />
                </div>
              </div>

              {/* Product Description */}
              <div className="form-group">
                <label htmlFor="productDescription">Description</label>
                <textarea id="productDescription" placeholder="Enter product description" rows={3}></textarea>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <i className="material-icons-round">save</i>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="products-section">
        <div className="form-card">
          <div className="form-header">
            <h3>Current Inventory</h3>
            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Search products..." />
                <i className="material-icons-round">search</i>
              </div>
              <div className="filter-actions">
                <select>
                  <option value="all">All Categories</option>
                  <option value="Cement">Cement</option>
                  <option value="Steel">Steel</option>
                  <option value="Aggregates">Aggregates</option>
                  <option value="Paint">Paint</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Plumbing">Plumbing</option>
                </select>
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
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Stock</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Status</th>
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
                      <td>{product.sku}</td>
                      <td>{product.category}</td>
                      <td>Dangote</td>
                      <td>{product.stock}</td>
                      <td>bags</td>
                      <td>₦{product.price.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                          {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-primary btn-small">
                            <i className="material-icons-round">edit</i>
                          </button>
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
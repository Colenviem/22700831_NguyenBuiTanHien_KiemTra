import React, { useState, useEffect } from 'react';

const categories = ['Tất cả', 'Laptop', 'Phụ kiện', 'Thời trang', 'Gia dụng'];

function ProductList() {
  // Lấy danh sách sản phẩm từ localStorage hoặc dùng danh sách mặc định
  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  };

  const [products, setProducts] = useState(loadProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Lưu lại vào localStorage
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { name, price, category, stock } = newProduct;

    if (!name || !price || !category || !stock) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
      stock: Number(stock),
    };

    const updatedProducts = [...products, newItem];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Lưu lại vào localStorage

    setNewProduct({ name: '', price: '', category: '', stock: '' });
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'Tất cả' || product.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  // Tính tổng số sản phẩm và tổng tồn kho
  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((total, product) => total + product.stock, 0);

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input type="text" name="name" placeholder="Tên sản phẩm" value={newProduct.name} onChange={handleChange} />
        <input type="number" name="price" placeholder="Giá" value={newProduct.price} onChange={handleChange} />
        <input type="text" name="category" placeholder="Danh mục" value={newProduct.category} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Tồn kho" value={newProduct.stock} onChange={handleChange} />
        <button type="submit">Thêm sản phẩm</button>
      </form>

      <h2>Danh sách sản phẩm</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <div style={{ marginBottom: '10px' }}>
        <label>Chọn danh mục: </label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((cate, index) => (
            <option key={index} value={cate}>{cate}</option>
          ))}
        </select>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá (VNĐ)</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toLocaleString()}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Xoá</button>
              </td>
            </tr>
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="5" align="center">Không tìm thấy sản phẩm nào</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <h3>
          Tổng số sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
        </h3>
      </div>
    </div>
  );
}

export default ProductList;

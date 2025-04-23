import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';; // Import ProductItem component

const categories = ['Tất cả', 'Laptop', 'Phụ kiện', 'Thời trang', 'Gia dụng'];

function ProductList() {
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm mới</h2>
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={newProduct.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Danh mục"
            value={newProduct.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Tồn kho"
            value={newProduct.stock}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4">
          Thêm sản phẩm
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="mb-4">
        <label className="mr-2">Chọn danh mục: </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((cate, index) => (
            <option key={index} value={cate}>{cate}</option>
          ))}
        </select>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Tên sản phẩm</th>
            <th className="px-4 py-2 text-left">Giá (VNĐ)</th>
            <th className="px-4 py-2 text-left">Danh mục</th>
            <th className="px-4 py-2 text-left">Tồn kho</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} onDelete={handleDelete} />
          ))}
          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">Không tìm thấy sản phẩm nào</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6">
        <h3 className="font-semibold text-lg">
          Tổng số sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
        </h3>
      </div>
    </div>
  );
}

export default ProductList;

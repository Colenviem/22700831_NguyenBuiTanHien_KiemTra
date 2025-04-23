import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Laptop Dell XPS', price: 25000000, category: 'Laptop', stock: 5 },
  { id: 2, name: 'Chuột Logitech MX Master', price: 2000000, category: 'Phụ kiện', stock: 20 },
  { id: 3, name: 'Bàn phím cơ Keychron K2', price: 1800000, category: 'Phụ kiện', stock: 12 },
];

function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
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

    setProducts([...products, newItem]);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    </div>
  );
}

export default ProductList;

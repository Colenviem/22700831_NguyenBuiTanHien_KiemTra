import React from 'react';

const sampleProducts = [
  { id: 1, name: 'Laptop Dell XPS', price: 25000000, category: 'Laptop', stock: 5 },
  { id: 2, name: 'Chuột Logitech MX Master', price: 2000000, category: 'Phụ kiện', stock: 20 },
  { id: 3, name: 'Bàn phím cơ Keychron K2', price: 1800000, category: 'Phụ kiện', stock: 12 },
];

function ProductList() {
  const handleDelete = (id) => {
    alert(`Xoá sản phẩm có ID: ${id}`);
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
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
          {sampleProducts.map((product) => (
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
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;

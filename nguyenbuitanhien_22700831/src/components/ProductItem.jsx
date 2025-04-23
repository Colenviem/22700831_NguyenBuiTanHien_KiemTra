import React from 'react'

const ProductItem = ({product}) => {
    return (
        <tr>
          <td>{product.name}</td>
          <td>{product.price.toLocaleString()}</td>
          <td>{product.category}</td>
          <td>{product.stock}</td>
          <td>
            <button onClick={() => onDelete(product.id)}>Xoá</button>
          </td>
        </tr>
      );
}

export default ProductItem
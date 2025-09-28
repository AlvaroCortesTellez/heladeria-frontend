import React from 'react';
import ProductosList from '../components/productos/ProductosList';

export default function ProductosPage() {
  return (
    <div className="container mt-4">
      <h2>Productos</h2>
      <ProductosList />
    </div>
  );
}

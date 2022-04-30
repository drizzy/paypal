/* eslint-disable  react/button-has-type */
import React, { useState } from 'react';
import api from '../../services/api';

function Product() {
  const [status, setStatus] = useState('Buy For $25');

  async function handleSubmit() {
    setStatus('Comprando...');

    const response = await api.post('/test-paypal/checkout');
    console.log(response);
    if (response.url) {
      window.location = response.url;
    }
  }

  return (
    <div>
      <h3>Productos</h3>
      <h1>Nike shoes </h1>
      <h2>Buy For $25</h2>
      <form onSubmit={handleSubmit}>

        <button type="submit">{status}</button>

      </form>
    </div>
  );
}

export default Product;

'use client'

import React, { useState } from 'react'
import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'

type Props = {
  product: Product
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, quantity)
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <div className="add-to-cart">
      <div className="quantity-selector">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="quantity-btn"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="quantity-btn"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  )
}

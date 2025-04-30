'use client'

import React from 'react'
import Image from 'next/image'
import { useCart } from '../../_providers/Cart'

export const CartItems: React.FC = () => {
  const { state, removeItem, updateQuantity } = useCart()

  if (state.items.length === 0) {
    return <div className="empty-cart">Your cart is empty</div>
  }

  return (
    <div className="cart-items-container">
      {state.items.map((item) => {
        const price = item.product.priceJSON?.data[0]?.unit_amount || 0
        const formattedPrice = (price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })

        return (
          <div key={item.product.id} className="cart-item">
            <div className="item-image">
              {item.product.thumbnail && (
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  className="product-image"
                />
              )}
            </div>
            <div className="item-details">
              <h3>{item.product.title}</h3>
              <p className="item-price">{formattedPrice}</p>
            </div>
            <div className="item-quantity">
              <button
                onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className="item-total">
              {((price * item.quantity) / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </div>
            <button
              onClick={() => removeItem(item.product.id)}
              className="remove-item"
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
} 
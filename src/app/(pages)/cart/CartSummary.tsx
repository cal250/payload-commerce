'use client'

import React from 'react'
import { useCart } from '../../_providers/Cart'

export const CartSummary: React.FC = () => {
  const { state } = useCart()

  const subtotal = state.total
  const shipping = 0 // You can implement shipping calculation logic here
  const tax = subtotal * 0.1 // 10% tax rate, adjust as needed
  const total = subtotal + shipping + tax

  return (
    <div className="cart-summary-container">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>
          {(subtotal / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {(shipping / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
      <div className="summary-row">
        <span>Tax</span>
        <span>
          {(tax / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>
          {(total / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
    </div>
  )
} 
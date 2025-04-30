import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { CartItems } from './CartItems'
import { CartSummary } from './CartSummary'

export default function Cart() {
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-content">
        <div className="cart-items">
          <CartItems />
        </div>
        <div className="cart-summary">
          <CartSummary />
          <div className="cart-actions">
            <Link href="/products" className="continue-shopping">
              Continue Shopping
            </Link>
            <Link href="/checkout" className="proceed-checkout">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage your shopping cart',
}

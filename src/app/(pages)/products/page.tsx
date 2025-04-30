import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { Product } from '../../../payload/payload-types'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { generateMeta } from '../../_utilities/generateMeta'

// Force dynamic to ensure we get fresh data
export const dynamic = 'force-dynamic'

export default async function Products() {
  const { isEnabled: isDraftMode } = draftMode()

  let products: Product[] = []

  try {
    products = await fetchDocs<Product>('products', {
      draft: isDraftMode,
      sort: '-createdAt',
    })
  } catch (error) {
    console.error(error)
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Our Products</h1>
      </div>
      <Blocks
        blocks={[
          {
            blockType: 'productGrid',
            blockName: 'All Products',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Browse our collection',
                  },
                ],
              },
            ],
            docs: products,
            relationTo: 'products',
            populateBy: 'collection',
          },
        ]}
      />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    title: 'Products',
    description: 'Browse our collection of products',
  })
} 
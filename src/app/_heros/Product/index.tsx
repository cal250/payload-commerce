import React from 'react'
import Image from 'next/image'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Message } from '../../_components/Message'
import { Price } from '../../_components/Price'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    stripeProductID,
    title,
    categories,
    meta: { image: metaImage, description } = {},
    thumbnail,
  } = product

  return (
    <Gutter className={classes.productHero}>
      {!stripeProductID && (
        <Gutter>
          <Message
            className={classes.warning}
            warning={
              <Fragment>
                {'This product is not yet connected to Stripe. To link this product, '}
                <Link
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
                >
                  edit this product in the admin panel
                </Link>
                {'.'}
              </Fragment>
            }
          />
        </Gutter>
      )}
      <div className={classes.mediaWrapper}>
        {!metaImage && thumbnail && typeof thumbnail !== 'string' && (
          <Media imgClassName={classes.image} resource={thumbnail} fill />
        )}
      </div>
      <div className={classes.details}>
        <div className={classes.categories}>
          {categories?.map((category, index) => {
            const { title: categoryTitle } = category

            const titleToUse = categoryTitle || 'Generic'

            const isLast = index === categories.length - 1

            return (
              <span key={index} className={classes.category}>
                {titleToUse} {!isLast && <span className={classes.separator}>|</span>}
              </span>
            )
          })}
        </div>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.priceWrapper}>
          {product.priceJSON?.data?.[0]?.unit_amount && (
            <p className={classes.price}>
              {(product.priceJSON.data[0].unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          )}
        </div>
        <div className={classes.description}>
          <RichText content={description} />
        </div>
        <Price product={product} button={false} />
        <AddToCartButton product={product} />
      </div>
    </Gutter>
  )
}

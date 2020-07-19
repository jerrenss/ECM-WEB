import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid } from '@material-ui/core'
import Layout from '../../components/Layout'
import { getCart } from './utils'
import ProductCard from '../../components/ProductCard'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Cart = () => {
  const classes = useStyles()
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getCart())
  }, [])

  const showItems = (items) => {
    return (
      <Box>
        <Typography>Your cart has {`${items.length}`} items</Typography>
        {items.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            hasAddToCartBtn={false}
            hasRemoveProductBtn={true}
            cardUpdate={true}
          />
        ))}
      </Box>
    )
  }

  const emptyCartMessage = () => {
    return (
      <Typography>
        Your cart is empty <Link to="/shop">Continue Shopping</Link>
      </Typography>
    )
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h5">Cart</Typography>
        {items.length > 0 ? showItems(items) : emptyCartMessage()}
      </Box>
    </Layout>
  )
}

export default Cart

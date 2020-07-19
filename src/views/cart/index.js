import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid } from '@material-ui/core'
import Layout from '../../components/Layout'
import { getCart } from './utils'
import ProductCard from '../../components/ProductCard'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Cart = () => {
  const classes = useStyles()
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)

  useEffect(() => {
    setItems(getCart())
  }, [run])

  const showItems = (items) => {
    return (
      <Box>
        <Typography variant="h4">
          Your cart has {`${items.length}`} items
        </Typography>
        {items.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            hasAddToCartBtn={false}
            hasRemoveProductBtn={true}
            cardUpdate={true}
            setRun={setRun}
            run={run}
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
        <Grid container>
          <Grid item xs={6}>
            {items.length > 0 ? showItems(items) : emptyCartMessage()}
          </Grid>
          <Grid item xs={6}>
            <Checkout products={items} setRun={setRun} run={run} />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Cart

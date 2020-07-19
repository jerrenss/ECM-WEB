import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import ImageDisplay from './ImageDisplay'
import moment from 'moment'
import { addItem, updateItem, removeItem } from '../views/cart/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid',
    borderWidth: 'thin',
    padding: theme.spacing(2, 1),
    '& a': {
      textDecoration: 'none',
      marginBottom: theme.spacing(1),
    },
  },
}))

const ProductCard = (props) => {
  const classes = useStyles(props)
  const {
    product,
    hasViewProductBtn = true,
    hasAddToCartBtn = true,
    hasRemoveProductBtn = false,
    cardUpdate = false,
    setRun = (f) => f,
    run = undefined,
  } = props

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const showStock = () => {
    return product.quantity > 0 ? (
      <Typography>In Stock</Typography>
    ) : (
      <Typography>Out Of Stock</Typography>
    )
  }

  const addToCart = () => {
    addItem(product, setRedirect(true))
  }

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }

  const handleChange = (productId) => (event) => {
    setRun(!run) // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const updateOptions = () => {
    return (
      <div>
        <span>Adjust Quantity</span>
        <input
          type="number"
          value={count}
          onChange={handleChange(product._id)}
        />
      </div>
    )
  }

  const showRemoveButton = () => {
    return (
      hasRemoveProductBtn && (
        <Button
          onClick={() => {
            removeItem(product._id)
            // setRun(!run); // run useEffect in parent Cart
          }}
        >
          Remove Product
        </Button>
      )
    )
  }

  return (
    <Box className={classes.root}>
      <Typography>Name: {product.name}</Typography>
      <ImageDisplay item={product} url="/product" />
      <Typography>Price: ${product.price}</Typography>
      <Typography>Description: {product.description}</Typography>
      <Typography>Category: {product.category?.name}</Typography>
      <Typography>Added: {moment(product.createdAt).fromNow()}</Typography>
      {showStock()}
      {hasViewProductBtn && (
        <Link to={`/product/${product._id}`}>
          <Button variant="outlined">View Product</Button>
        </Link>
      )}
      {hasAddToCartBtn && (
        <Button variant="outlined" onClick={addToCart}>
          Add to Cart
        </Button>
      )}
      {cardUpdate && updateOptions()}
      {showRemoveButton()}
      {shouldRedirect(redirect)}
    </Box>
  )
}

export default ProductCard

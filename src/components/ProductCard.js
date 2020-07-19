import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ImageDisplay from './ImageDisplay'
import moment from 'moment'

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
  const { product, hasViewProductBtn = true } = props

  const showStock = () => {
    return product.quantity > 0 ? (
      <Typography>In Stock</Typography>
    ) : (
      <Typography>Out Of Stock</Typography>
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
      <Button variant="outlined">Add to Cart</Button>
    </Box>
  )
}

export default ProductCard

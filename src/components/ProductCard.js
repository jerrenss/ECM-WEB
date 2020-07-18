import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ImageDisplay from './ImageDisplay'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid',
    borderWidth: 'thin',
    padding: theme.spacing(2, 1),
  },
}))

const ProductCard = (props) => {
  const classes = useStyles(props)
  const { product } = props

  return (
    <Box className={classes.root}>
      <Typography>Name: {product.name}</Typography>
      <ImageDisplay item={product} url="/product" />
      <Typography>Description: {product.description}</Typography>
      <Typography>Price: {product.price}</Typography>
      <Link to="/">
        <Button variant="outlined">View Product</Button>
      </Link>
      <Button variant="outlined">Add to Cart</Button>
    </Box>
  )
}

export default ProductCard

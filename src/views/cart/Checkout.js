import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Checkout = (props) => {
  const classes = useStyles(props)
  const { products } = props

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h4">Cart Summary</Typography>
      <Typography>Total: ${getTotal(products)}</Typography>
    </Box>
  )
}

export default Checkout

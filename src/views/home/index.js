import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid } from '@material-ui/core'
import Layout from '../../components/Layout'
import { getSortedProducts } from '../../api/product'
import ProductCard from '../../components/ProductCard'
import Search from '../../components/Search'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Home = () => {
  const classes = useStyles()
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getSortedProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    })
  }

  const loadProductsByArrival = () => {
    getSortedProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadProductsBySell()
    loadProductsByArrival()
  }, [])

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Home</Typography>
        <hr />
        <Search />
        <hr />
        <Typography variant="h5">New Arrivals</Typography>
        <Grid container spacing={1}>
          {productsByArrival.map((product) => (
            <Grid item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h5">Popular Products</Typography>
        <Grid container spacing={1}>
          {productsBySell.map((product) => (
            <Grid item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default Home

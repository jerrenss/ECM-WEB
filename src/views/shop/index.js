import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { getFilteredProducts } from '../../api/product'
import ProductCard from '../../components/ProductCard'
import { getCategories } from '../../api/category'
import Checkbox from '../../components/Checkbox'
import RadioBox from '../../components/RadioBox'
import { prices } from './fixedPrices'

const useStyles = makeStyles((theme) => ({
  root: {},
  sideBar: {
    display: 'block',
    padding: theme.spacing(0, 1),
  },
}))

const Shop = () => {
  const classes = useStyles()

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])
  const [limit, setLimit] = useState(6)
  const [size, setSize] = useState(0)
  const [skip, setSkip] = useState(0)
  const [filteredResults, setFilteredResults] = useState([])

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array
  }

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && <Button onClick={loadMore}>Load More</Button>
    )
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
  }, [])

  console.log(myFilters)

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Shop</Typography>
        <hr />
        <Grid container>
          <Grid container item spacing={1} xs={2} className={classes.sideBar}>
            <Typography variant="h5">Categories</Typography>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, 'category')}
              />
            </ul>
            <Typography variant="h5">Price Range</Typography>
            <ul>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, 'price')}
              />
            </ul>
          </Grid>
          <Grid container item spacing={1} xs={10}>
            <Typography
              variant="h5"
              style={{ width: '-webkit-fill-available' }}
            >
              All Products
            </Typography>
            {filteredResults.map((product) => (
              <Grid item xs={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
            {loadMoreButton()}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Shop

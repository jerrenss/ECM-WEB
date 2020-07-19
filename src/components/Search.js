import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Grid } from '@material-ui/core'
import { getCategories } from '../api/category'
import { list } from '../api/product'
import ProductCard from './ProductCard'

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  })

  const { categories, category, search, results, searched } = data

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }

  const searchSubmit = (event) => {
    event.preventDefault()
    searchData()
  }

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`
    }
    if (searched && results.length < 1) {
      return `No products found`
    }
  }

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response?.error) {
            console.log(response?.error)
          } else {
            setData({ ...data, results: response, searched: true })
          }
        },
      )
    }
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false })
  }

  const searchedProducts = (results = []) => {
    return (
      <Box>
        <Typography variant="h5">Search Results</Typography>
        <Typography>{searchMessage(searched, results)}</Typography>
        <Grid container spacing={1}>
          {results.map((product) => (
            <Grid item xs={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span>
        <div>
          <div>
            <select onChange={handleChange('category')}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            onChange={handleChange('search')}
            placeholder="Search by name"
          />
        </div>
        <div style={{ border: 'none' }}>
          <Button onClick={searchSubmit}>Search</Button>
        </div>
      </span>
    </form>
  )

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <Box>
      {searchForm()}
      {searchedProducts(results)}
    </Box>
  )
}

export default Search

import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { getCategories } from '../api/category'

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

  const searchSubmit = () => {
    //
  }

  const handleChange = () => {
    //
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
          <Button>Search</Button>
        </div>
      </span>
    </form>
  )

  useEffect(() => {
    loadCategories()
  }, [])

  return <Box>{searchForm()}</Box>
}

export default Search

import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Button, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'
import { getProducts, deleteProduct } from '../../api/product'
import { isAuthenticated } from '../../api/auth'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ManageProducts = (props) => {
  const classes = useStyles(props)

  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Manage Products</Typography>
        <Typography variant="h6">
          Total No. of Products: {products.length}
        </Typography>
        <hr />
        <Box>
          <ul>
            {products.map((p, i) => (
              <>
                <li>{p.name}</li>
                <Link to={`/admin/product/update/${p._id}`}>
                  <Button variant="outlined">Update</Button>
                </Link>
                <Button variant="outlined" onClick={() => destroy(p._id)}>
                  Delete
                </Button>
              </>
            ))}
          </ul>
        </Box>
      </Box>
    </Layout>
  )
}

export default ManageProducts

import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid } from '@material-ui/core'
import Layout from '../../components/Layout'
import ProductCard from '../../components/ProductCard'
import { read, listRelated } from '../../api/product'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Product = (props) => {
  const classes = useStyles(props)

  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false)

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProducts(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [props])

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Product</Typography>
        <ProductCard product={product} hasViewProductBtn={false} />
      </Box>
      <hr />
      <Typography variant="h5">Related Products</Typography>
      <Grid container spacing={1}>
        {relatedProducts.map((product) => (
          <Grid item xs={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Product

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, TextField, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { getProduct, updateProduct } from '../../api/product'
import { getCategories } from '../../api/category'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: theme.spacing(3),
  },
  form: {
    margin: theme.spacing(1, 'auto', 1, 'auto'),
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}))

const UpdateProduct = (props) => {
  const classes = useStyles(props)

  const { user, token } = isAuthenticated()

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    updatedProduct: '',
    redirectToProfile: false,
    formData: '',
  })

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    updatedProduct,
    redirectToProfile,
    formData,
  } = values

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        })
        // load categories
        initCategories()
      }
    })
  }

  // Load categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        })
      }
    })
  }

  useEffect(() => {
    init(props.match.params.productId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    updateProduct(props.match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            photo: '',
            price: '',
            quantity: '',
            loading: false,
            error: '',
            updatedProduct: data.name,
            redirectToProfile: true,
          })
        }
      },
    )
  }

  const showError = () => {
    return (
      <Typography style={{ display: error ? null : 'none' }}>
        {error}
      </Typography>
    )
  }

  const showSuccess = () => {
    return (
      <Typography style={{ display: updatedProduct ? null : 'none' }}>
        {`${updatedProduct} is updated`}
      </Typography>
    )
  }

  const showLoading = () => {
    return loading && <Typography>Loading</Typography>
  }

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />
      }
    }
  }
  return (
    <Layout>
      <Box className={classes.root}>
        <Typography className={classes.title}>Update Product</Typography>
        <form className={classes.form} noValidate>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange('photo')}
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChange('name')}
            value={name}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            onChange={handleChange('description')}
            value={description}
            multiline
          />
          {/* Select Category */}
          <label>Category</label>
          <select id="category" onChange={handleChange('category')}>
            <option>Please select</option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <br />
          {/* Select Shipping */}
          <label id="shipping">Shipping</label>
          <select onChange={handleChange('shipping')}>
            <option>Please select</option>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
          <br />
          <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            type="number"
            onChange={handleChange('quantity')}
            value={quantity}
          />
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            type="number"
            onChange={handleChange('price')}
            value={price}
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </form>
        {showError()}
        {showSuccess()}
        {showLoading()}
        {redirectUser()}
      </Box>
    </Layout>
  )
}

export default UpdateProduct

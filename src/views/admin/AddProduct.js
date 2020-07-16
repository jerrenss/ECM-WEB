/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, TextField, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { createProduct } from '../../api/product'
import { getCategories } from '../../api/category'

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

const AddProduct = (props) => {
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
    createdProduct: '',
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
    createdProduct,
    redirectToProfile,
    formData,
  } = values

  // Load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        })
      }
    })
  }

  useEffect(() => {
    init()
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
    createProduct(user._id, token, formData).then((data) => {
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
          createdProduct: data.name,
        })
      }
    })
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
      <Typography style={{ display: createdProduct ? null : 'none' }}>
        {`${createdProduct} is created`}
      </Typography>
    )
  }

  const showLoading = () => {
    return loading && <Typography>Loading</Typography>
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography className={classes.title}>Create Product</Typography>
        <form className={classes.form} noValidate autoComplete="off">
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
            Create
          </Button>
        </form>
        {showError()}
        {showSuccess()}
        {showLoading()}
      </Box>
    </Layout>
  )
}

export default AddProduct

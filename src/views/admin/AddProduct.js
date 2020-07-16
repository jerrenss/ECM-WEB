import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, TextField, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { createCategory } from '../../api/category'

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

  const handleChange = (event) => {
    // setError('')
    // setName(event.target.value)
  }

  const handleSubmit = (event) => {
    // event.preventDefault()
    // setError('')
    // setSuccess(false)
    // createCategory(user._id, token, { name }).then((data) => {
    //   if (data.error) {
    //     setError(data.error)
    //   } else {
    //     setError('')
    //     setSuccess(true)
    //   }
    // })
  }

  const showSuccess = () => {
    // if (success) {
    //   return <Typography>{name} is created</Typography>
    // }
  }

  const showError = () => {
    // if (error) {
    //   return <Typography>Category already exists</Typography>
    // }
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography className={classes.title}>Create Product</Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            value={name}
            autoFocus
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
        {showError()}
        {showSuccess()}
      </Box>
    </Layout>
  )
}

export default AddProduct

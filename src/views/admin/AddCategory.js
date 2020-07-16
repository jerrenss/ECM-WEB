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

const AddCategory = (props) => {
  const classes = useStyles(props)

  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticated()

  const handleChange = (event) => {
    setError('')
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setError('')
        setSuccess(true)
      }
    })
  }

  const showSuccess = () => {
    if (success) {
      return <Typography>{name} is created</Typography>
    }
  }

  const showError = () => {
    if (error) {
      return <Typography>Category already exists</Typography>
    }
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography className={classes.title}>Create Category</Typography>
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

export default AddCategory

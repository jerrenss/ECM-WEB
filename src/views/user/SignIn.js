import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, TextField, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { signIn, authenticate } from '../../api/auth'
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

const SignIn = () => {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
    redirectToReferrer: false,
  })

  const { email, password, error, loading, redirectToReferrer } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: null, loading: true })
    signIn({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          })
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

  const showLoading = () => {
    return loading && <Typography>Loading</Typography>
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/" />
    }
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography className={classes.title}>Sign In Form</Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={handleChange('email')}
            value={email}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={handleChange('password')}
            value={password}
            type="password"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
        {showError()}
        {showLoading()}
        {redirectUser()}
      </Box>
    </Layout>
  )
}

export default SignIn

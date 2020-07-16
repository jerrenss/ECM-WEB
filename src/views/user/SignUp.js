import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, TextField, Typography, Button } from '@material-ui/core'
import Layout from '../../components/Layout'
import { signUp } from '../../api/auth'
import { Link } from 'react-router-dom'

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

const SignUp = () => {
  const classes = useStyles()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    success: null,
  })

  const { name, email, password, error, success } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: null })
    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false })
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: null,
          success: true,
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
      <Typography style={{ display: success ? null : 'none' }}>
        New account is created. Please <Link to="/signin">sign in</Link>.
      </Typography>
    )
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography className={classes.title}>Sign Up Form</Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleChange('name')}
            value={name}
          />
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

export default SignUp

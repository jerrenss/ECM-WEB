import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { read, update, updateUser } from '../../api/user'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Profile = (props) => {
  const classes = useStyles(props)
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  })

  const { name, email, password, error, success } = values

  const { token } = isAuthenticated()

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        setValues({ ...values, name: data.name, email: data.email })
      }
    })
  }

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    update(props.match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          alert(data.error)
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            })
          })
        }
      },
    )
  }

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const profileUpdate = (name, email, password) => (
    <form>
      <div>
        <label>Name</label>
        <input type="text" onChange={handleChange('name')} value={name} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" onChange={handleChange('email')} value={email} />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          onChange={handleChange('password')}
          value={password}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  useEffect(() => {
    init(props.match.params.userId)
  }, [])

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Update Profile</Typography>
        <hr />
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </Box>
    </Layout>
  )
}

export default Profile

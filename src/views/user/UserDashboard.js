import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const UserDashboard = (props) => {
  const classes = useStyles(props)

  const {
    user: { name, email, role },
  } = isAuthenticated()

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">User Dashboard</Typography>
        <Box>
          <Link to="/cart">My Cart</Link>
          <Link to="/profile/update">Update Profile</Link>
        </Box>
        <Box>
          <Typography variant="h6">User Information</Typography>
          <Typography>{name}</Typography>
          <Typography>{email}</Typography>
          <Typography>{role === 1 ? 'Admin' : 'Regular User'}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Purchase History</Typography>
          <Typography>Name</Typography>
          <Typography>Email</Typography>
          <Typography>Role</Typography>
        </Box>
      </Box>
    </Layout>
  )
}

export default UserDashboard

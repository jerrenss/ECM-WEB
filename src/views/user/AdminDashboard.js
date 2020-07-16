import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const AdminDashboard = (props) => {
  const classes = useStyles(props)

  const {
    user: { name, email, role },
  } = isAuthenticated()

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Box>
          <Link to="/create/category">Create Category</Link>
          <Link to="/create/product">Create Product</Link>
        </Box>
        <Box>
          <Typography variant="h6">Admin Information</Typography>
          <Typography>{name}</Typography>
          <Typography>{email}</Typography>
          <Typography>{role === 1 ? 'Admin' : 'Regular User'}</Typography>
        </Box>
      </Box>
    </Layout>
  )
}

export default AdminDashboard

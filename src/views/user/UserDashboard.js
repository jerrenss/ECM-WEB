import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from '../../api/user'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const UserDashboard = (props) => {
  const classes = useStyles(props)

  const [history, setHistory] = useState([])

  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated()

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  useEffect(() => {
    init(_id, token)
  }, [])

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">User Dashboard</Typography>
        <Box>
          <Link to="/cart">My Cart</Link>
          <Link to={`/profile/${_id}`}>Update Profile</Link>
        </Box>
        <Box>
          <Typography variant="h6">User Information</Typography>
          <Typography>{name}</Typography>
          <Typography>{email}</Typography>
          <Typography>{role === 1 ? 'Admin' : 'Regular User'}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Purchase History</Typography>
          {history.map((h, i) => {
            return (
              <div>
                <hr />
                {h.products.map((p, i) => {
                  return (
                    <div key={i}>
                      <Typography>Product name: {p.name}</Typography>
                      <Typography>Product price: ${p.price}</Typography>
                      <Typography>
                        Purchased date: {moment(h.createdAt).fromNow()}
                      </Typography>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}

export default UserDashboard

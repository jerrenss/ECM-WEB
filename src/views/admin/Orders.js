import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography, Grid } from '@material-ui/core'
import Layout from '../../components/Layout'
import { isAuthenticated } from '../../api/auth'
import { listOrders, getStatusValues, updateOrderStatus } from '../../api/order'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Orders = () => {
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  const [statusValues, setStatusValues] = useState([])
  const { user, token } = isAuthenticated()
  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOrders(data)
      }
    })
  }

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setStatusValues(data)
      }
    })
  }

  useEffect(() => {
    loadOrders()
    loadStatusValues()
  }, [])

  const showOrdersLength = () => {
    return orders.length > 0 ? (
      <Typography>Total Orders: {orders.length}</Typography>
    ) : (
      <Typography>No Orders</Typography>
    )
  }

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed')
      } else {
        loadOrders()
      }
    })
  }

  const showStatus = (o) => (
    <div>
      <h3>Status: {o.status}</h3>
      <select onChange={(e) => handleStatusChange(e, o._id)}>
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Orders</Typography>
        {showOrdersLength()}
        <hr />
        {orders.map((o, oIndex) => {
          return (
            <>
              <Typography>Order ID: {o._id}</Typography>
              {showStatus(o)}
              <Typography>Transaction ID: {o.transaction_id}</Typography>
              <Typography>Amount: ${o.amount}</Typography>
              <Typography>Ordered By: {o.user.name}</Typography>
              <Typography>
                Ordered On: {moment(o.createdAt).fromNow()}
              </Typography>
              <Typography>Delivery Address: {o.address}</Typography>
              <Typography>Total Products: {o.products.length}</Typography>
              <Box style={{ marginLeft: '20px' }}>
                {o.products.map((p, pIndex) => {
                  return (
                    <Typography>
                      {p.name} - ${p.price} (x{p.count})
                    </Typography>
                  )
                })}
              </Box>
              <hr />
            </>
          )
        })}
      </Box>
    </Layout>
  )
}

export default Orders

import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Button, Typography, Grid } from '@material-ui/core'
import { isAuthenticated } from '../../api/auth'
import { getBraintreeClientToken, processPayment } from '../../api/braintree'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Checkout = (props) => {
  const classes = useStyles(props)
  const { products, setRun, run } = props
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  })

  const { user, token } = isAuthenticated()

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error })
      } else {
        setData({ clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(user?._id, token)
  }, [])

  const buy = () => {
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data)
        nonce = data.nonce

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        }
        processPayment(user?._id, token, paymentData)
          .then((response) => {
            // console.log(response)
            setData({ ...data, success: response.success })
            emptyCart(() => {
              setRun(!run)
            })
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log('Drop In Error: ', error)
        setData({ ...data, error: error.message })
      })
  }

  const showDropIn = () => {
    if (data.clientToken && products.length > 0) {
      return (
        <Box onBlur={() => setData({ ...data, error: '' })}>
          <DropIn
            options={{
              authorization: data.clientToken,
              // Link to paypal
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <Button onClick={buy}>Checkout</Button>
        </Box>
      )
    }
  }

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const showError = (error) => {
    return (
      <Typography style={{ display: error ? '' : 'none' }}>{error}</Typography>
    )
  }

  const showSuccess = (success) => {
    return (
      <Typography style={{ display: success ? '' : 'none' }}>
        Thanks! Your payment was successful!
      </Typography>
    )
  }
  return (
    <Box className={classes.root}>
      <Typography variant="h4">Cart Summary</Typography>
      <Typography>Total: ${getTotal(products)}</Typography>
      {showDropIn()}
      {showError(data.error)}
      {showSuccess(data.success)}
    </Box>
  )
}

export default Checkout

import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const SignIn = () => {
  const classes = useStyles()

  return (
    <Box>
      <Typography>Sign In</Typography>
    </Box>
  )
}

export default SignIn

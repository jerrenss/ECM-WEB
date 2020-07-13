import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box } from '@material-ui/core'
import Navbar from './Navbar'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Layout = (props) => {
  const { children } = props
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Navbar />
      {children}
    </Box>
  )
}

export default Layout

import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'
import Layout from '../../components/Layout'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Box className={classes.root}>
        <Typography variant="h4">Home</Typography>
      </Box>
    </Layout>
  )
}

export default Home

import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Home = () => {
  const classes = useStyles()

  return (
    <Box>
      <Typography>Home</Typography>
    </Box>
  )
}

export default Home
import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, Box } from '@material-ui/core'
import Layout from '../../components/Layout'
import { getCategories } from '../../api/category'

const useStyles = makeStyles((theme) => ({}))

const func = () => {
  getCategories().then((data) => {
    console.log(data)
    if (data.error) {
      console.log('Error')
    } else {
      console.log(data)
    }
  })
}

const Home = () => {
  const classes = useStyles()
  // useEffect(() => {
  //   func()
  // }, [])
  return (
    <Layout>
      <Typography>Home</Typography>
    </Layout>
  )
}

export default Home

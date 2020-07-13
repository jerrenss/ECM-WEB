import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, Button, Hidden } from '@material-ui/core'
import { FONTS, PALETTE } from '../utils/const'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import PublicIcon from '@material-ui/icons/Public'
import { Link, withRouter } from 'react-router-dom'

const defaultText = {
  fontFamily: FONTS.montserrat,
  color: PALETTE.text.contrast,
}

const useStyles = makeStyles((theme) => ({
  navbarWrapper: {
    '& .MuiButton-label': {
      ...defaultText,
    },
  },
  toolbar: {
    minHeight: 40,
    backgroundColor: PALETTE.text.primary,
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
}))

const Navbar = (props) => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.navbarWrapper}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit">
          <PublicIcon />
        </IconButton>
        <Typography className={classes.title}>ECM</Typography>
        <Hidden xsDown>
          <Link to="/signin">
            <Button color="inherit">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button color="inherit">Register</Button>
          </Link>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

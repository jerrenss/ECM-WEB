import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, Button, Hidden } from '@material-ui/core'
import { FONTS, PALETTE } from '../utils/const'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import PublicIcon from '@material-ui/icons/Public'
import { Link, withRouter } from 'react-router-dom'
import { signOut, isAuthenticated } from '../api/auth'

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
  const { history } = props
  const classes = useStyles()

  const redirectHome = () => {
    history.push('/')
  }
  return (
    <AppBar position="static" className={classes.navbarWrapper}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" onClick={redirectHome}>
          <PublicIcon />
        </IconButton>
        <Typography className={classes.title}>ECM</Typography>
        <Hidden xsDown>
          {isAuthenticated() ? (
            <>
              {isAuthenticated().user.role === 1 ? (
                <Link to="/admin/dashboard">
                  <Button color="inherit">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/user/dashboard">
                  <Button color="inherit">Dashboard</Button>
                </Link>
              )}
              <Button color="inherit" onClick={() => signOut(redirectHome)}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button color="inherit">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit">Sign Up</Button>
              </Link>
            </>
          )}
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Navbar)

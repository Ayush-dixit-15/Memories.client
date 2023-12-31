import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles'
import memories from '../../Assets/memories.png';
import memoriesText from '../../Assets/memories-Text.png';
import decode from 'jwt-decode';
import {Link, useNavigate,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
const Navbar = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logout = ()=>{
       dispatch({type:'LOGOUT'});
       navigate('/');
       setUser(null);
    }
    console.log(user);
    useEffect(()=>{
      const token = user?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px"/>
      <img className={classes.image} src={memories} alt="icon" height="40px" />
        </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Navbar

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import Icon from './icon';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth,provider } from "../../firebase";
import Input from "./Input";
import { GoogleLogin} from '@react-oauth/google';
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {  useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
const Auth = () => {
  const classes = useStyles();
  const intialState = {firstName : '', lastName: '', email: '', password:'', confirmPassword:''}
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(intialState)
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
       dispatch(signup(formData,navigate));
    }
    else{
       dispatch(signin(formData,navigate));
    }
  };
  // same for all fields and saves coding time
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };
  const switchMode = (prevIsSignUp) => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  let navigate= useNavigate();
  const googleSuccess = async(res) =>{
    
    const token = res?.credential;
    var result = jwt_decode(token);
    // console.log(decoded);
    console.log(res);
    const token1 = res.clientId;
    try {
      dispatch({type:'AUTH',data:{result,token}});
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const googleError = (error) =>{
    console.log(error);
    console.log("Google sign in was unsuccessfull, Try again Later")
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
      clientId="1099432519695-7fvp8rq167p200urpr2te4lm63uoa1a7.apps.googleusercontent.com"
      render={(renderProps) => (
        <Button
          className={classes.googleButton}
          color="primary"
          fullWidth
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          startIcon={<Icon />}
          variant="contained"
        >
          Google Sign In
        </Button>
      )}
      onSuccess={googleSuccess}
      onFailure={googleError}
      cookiePolicy="single_host_origin"
      plugin_name="Memories"
      useOneTap
    />
 

 <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
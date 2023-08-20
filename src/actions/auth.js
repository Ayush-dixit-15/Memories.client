import * as api from '../api/index.js';
import {AUTH} from '../constants/actionTypes.js'


export const signin = (formData,navigate) => async(dispatch)=>{
     try {
       const {data} = await api.signIn(formData);
       dispatch({type:AUTH,data});
        navigate('/');
     
     } catch (error) {
        console.log(error);
     }
}

export const signup = (formData,navigate) => async(dispatch)=>{
    try {
      console.log("ab1");
      const {data} = await api.signUp(formData);
      console.log("ab2");
      dispatch({type:AUTH,data});
       navigate('/');
    
    } catch (error) {
       console.log(error);
    }
}
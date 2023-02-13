import {
    LOADING_PROFILE_FAILED ,
    LOADING_PROFILE_SUCCESS ,
    LOADING_PROFILE ,
    PROFILE_FAILED,
    PROFILE_SUCCESS,
    EDIT_PROFILE,
    PHOTO_SUCCESS,
    PHOTO_FAILED,
    ADDING_PHOTO,

    VERIFY_EMAIL,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILED,
    } from './types';
    
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import axios from 'axios';
    import { PROFILE_URL, VERIFY_EMAIL_URL } from '../services/URLs';
    
    
    export const fetchProfile = () => { 
      return (dispatch) => {
        dispatch({ type: LOADING_PROFILE });
        //Call the back-end API
           //Get Token from local storage 
           AsyncStorage.getItem('app_token')
           .then(token => {
             const url =PROFILE_URL;
            
             const config = {
               headers: { 'Authorization': `Bearer ${token}` }
             };
            
            axios.get(PROFILE_URL, config)
              .then( resp =>  handleResponse(dispatch, resp.data)  )
              .catch(error => handleError(dispatch, error.msg))
        
         });
    }
  }
  const handleResponse = (dispatch, data) => {
    if (data.status) {
      dispatch({ type: LOADING_PROFILE_SUCCESS , profile: data.profile })        
    }else{
      dispatch({ type: LOADING_PROFILE_FAILED, error: data.msg })
    }
  
  
  }
  const handleError = (dispatch, message) => {  
      dispatch({ type: LOADING_PROFILE_FAILED, error: message});
  }
  

export const editProfile = ({name, email , photo }) => {
  return (dispatch) => { 
    dispatch({ type: EDIT_PROFILE });
    const data = new FormData();


    if(photo.uri){
      data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
            // Platform.OS === "android" ? photo.uri : photo.uri.toString().replace("file://", "")
       });
      }
   
    data.append("name", name);
    data.append("email", email);
    // data.append("mobile", mobile);
       AsyncStorage.getItem('app_token')
      .then(token => {
        const config = {
          headers: { 'Authorization': `Bearer ${token}`,'Content-Type' : 'multipart/form-data' }
        };
    axios.post(PROFILE_URL,data, config )
    .then(response => handleResponseEdit(dispatch, response.data))
    .catch(error => console.log(error))
  });
  }
};
// 
  //  export const editProfile1 = ({ name, email , imageName, data}) => {

  //    return (dispatch) => { 
  //      dispatch({ type: EDIT_PROFILE });
  //      const formData = new FormData();
  //      formData.append('name',name);
  //      formData.append('email',email);
  //     //  formData.append('imageName',imageName);
  //      formData.append("profileImage",profileImage);
  //     //  formData.append('_method', 'PATCH');

  //       // alert(JSON.stringify(formData))
  //      //Get Token from local storage
  //      AsyncStorage.getItem('app_token')
  //        .then(token => {   
  //          const config = {
  //            headers: {  'Content-Type': 'multipart/form-data;'},
  
  //           //  "Content-Type": "multipart/form-data"
  //          };    
         
  //          axios.post(PROFILE_URL,data, config )
  //            .then(resp => handleResponseEdit(dispatch, resp.data))
  //            .catch(error => alert(error))
  //        });
  //    }   
  //  }
   const handleResponseEdit = (dispatch, data ) => {
     if (data.status) {
        dispatch({ type: PROFILE_SUCCESS })
   }else{
       dispatch({ type: PROFILE_FAILED, error: data.msg })
   }
  }
  const handleErrorEdit = (dispatch, message) => {
    dispatch({ type: PROFILE_FAILED, error:message})
  }



export const editImage = (imageName,profileImage) => {

  return (dispatch) => {
    dispatch({ type: ADDING_PHOTO });
    const formData = new FormData();

    formData.append('imageName',imageName);
    formData.append('profileImage',profileImage);

        const config = {
                 headers:{
                     'Content-Type' : 'multipart/form-data',
                 }
      };

      axios.post(PROFILE_URL_PHOTO, formData,{})
        .then(resp => handleResponsePhoto(dispatch, resp.data))
        .catch(error =>  handleErrorPhoto(dispatch, error.response.data.msg))
     //});
  };
}
 

const handleResponsePhoto = (dispatch, data ) => {
  if (data.status) {
      dispatch({ type: PHOTO_SUCCESS })
  }else{
      dispatch({ type: PHOTO_FAILED, error: data.msg })
  }
}
const handleErrorPhoto = (dispatch, message) => {
  dispatch({ type: PHOTO_FAILED, error:message})
}
 
  
export const verifyEmail = ({ email }) => {
    return (dispatch) => {
      dispatch({ type: VERIFY_EMAIL });
      //Call the back-end API
      axios.post(VERIFY_EMAIL_URL, { email } )
        .then(resp => handleResponseVerify(dispatch, resp.data))
        .catch(error => handleErrorVerify(dispatch, error.msg))
  
    }
  }

const handleResponseVerify = (dispatch, data) => {
  if (data.status) {
    dispatch({ type: VERIFY_EMAIL_SUCCESS })
  }else{
    dispatch({ type: VERIFY_EMAIL_FAILED, error: data.msg })
  }
  }
  const handleErrorVerify = (dispatch, message) => {  
      dispatch({ type: VERIFY_EMAIL_FAILED, error: msg});
  }
  
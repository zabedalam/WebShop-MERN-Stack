function catchErrors(error, displayError) {
  let errorMsg;
  //error.response is specific to axios
  if (error.response){//the req. was made and the server response was not 2XX (2 hundred) something 
      errorMsg = error.response.data;
      console.log("Error response ", errorMsg);

      //cloudinary image upload error
      if (error.response.data.error){
          errorMsg = error.response.data.error;
          console.log("Cloudinary error ", errorMsg);
      }

  } else if (error.request){
      //the req. was made but no response was received
      errorMsg = error.request;
      console.log("Error request", errorMsg);
  } else {
      //some unknown error
      errorMsg = error.message;
      console.log("Error message", errorMsg);
  }
  displayError(errorMsg);
}

export default catchErrors;
  
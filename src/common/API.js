import axios from 'axios';
import { BASE_URL } from './URLs';

export const getAPI= async (url,method,data)=>{
    const headers = {
        "Content-Type": "application/json",
      };
      
  let reqParams = {
    url : BASE_URL+url,
    method,
    headers
  }

  if(data){
    reqParams.data = data
  }

  console.log('requestParams',reqParams)
  let result=await axios(reqParams)
  .then((response)=>{
    console.log('response',response)
    return response.data;
  })
  .catch((error)=>{
    console.log('error',error)
    return null;
  })
  return result;
}
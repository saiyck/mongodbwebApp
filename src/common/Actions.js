import { getAPI } from "./API";
import { END_POINTS } from "./URLs";

export const getCollections = async() => {
  const result = await getAPI(END_POINTS.Get_Collections,'GET',null);
  return result;
}

export const getCollectionFieldsList= async(name) => {
   const result = await getAPI(END_POINTS.Get_Collection_Fields+'?name='+name, 'GET',null)
   return result;
}

export const createCollection = async(data) => {
    let result = await getAPI(END_POINTS.Create_Collection,'POST',data);
     return result; 
}

export const PostCollectionData = async(data) => {
    let result = await getAPI(END_POINTS.Post_Collection,'POST',data)
    return result;
}

export const DeleteCollectionSchema = async(name)=> {
   let result = await getAPI(`/schema/${name}`,'DELETE',null);
   return result;
}

export const GetAllViewData = async(name)=> {
    let result = await getAPI(`/schema/getAll/data?name=${name}`,'GET',null);
    return result;
}

export const GetCollectionViewData = async()=> {
    let result = await getAPI(END_POINTS.All_Collection_View_list,'GET',null);
    return result;
}



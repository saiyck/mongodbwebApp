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

export const DeleteCollectionFields = async(name,data)=> {
    let result = await getAPI(`${END_POINTS.Delete_Collection_Fields}?schema=${name}`,'DELETE',data)
    return result;
}

export const DeleteCollectionData = async(id,name)=> {
    let result = await getAPI(`/schema/delete/${id}?schema=${name}`,'DELETE',null)
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

export const UpdateCollectionFields = async(name,data)=> {
    let result = await getAPI(`${END_POINTS.Update_Collection_Fields}?schema=${name}`,'PATCH',data)
    return result;
}

export const UpdateCollectionData = async(id,name,data) => {
    let result = await getAPI(`${END_POINTS.Update_Collection_Data}/${id}?schema=${name}`,'PATCH',data)
    return result;
}



// import './CrudCollections.css'
import React,{useState,useEffect} from 'react'
import { GetCollectionViewData } from '../../common/Actions';
import { useSelector, useDispatch } from 'react-redux'
import CrudComponent from '../../components/CrudComponent/CrudComponent';
import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import {addAllCollectionListData} from '../../redux/Reducers'


const CrudCollections = () => {
  // const [allData,setAllData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteModal,setOpenDeleteModal] = useState(false);
  const allData = useSelector((state) => state.collection.allData)
  const dispatch = useDispatch();

useEffect(()=>{
  getAllCollections()
},[])


const updateCollection = (result) => {
  dispatch(addAllCollectionListData(result))
}


const getAllCollections= async()=>{
setLoading(true)
 let result = await GetCollectionViewData();
 if(result){
  console.log('result',result)
//  setAllData(result);
 updateCollection(result)
} else{
  // setAllData([])
  updateCollection([])
}
setLoading(false)
}



  return (
    <div>
      <header>
        <Header title={'Crud Collection'}/>
      </header>
     <div>
      { allData.length > 0 ?
      allData.map((val,ind)=> {
       return (
        <div>
          <CrudComponent getAllCollections={()=> getAllCollections()} setLoading={setLoading} GetAllCollectionData={()=>getAllCollections()} item={val}/>
        </div>
       )
      }) : <div style={{textAlign:'center',marginTop:30}}>No Data Found</div>
    } 
     </div>
     <div className='loader'> 
    {loading && <LoadingSpinner/>} 
     </div>
    </div>
  )
}

export default CrudCollections;
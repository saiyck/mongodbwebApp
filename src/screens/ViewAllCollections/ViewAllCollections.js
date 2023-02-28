import React,{useState,useEffect} from 'react'
import { GetCollectionViewData } from '../../common/Actions';
import Header from '../../components/Header/Header'
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import TableComponent from '../../components/TableComponent/TableComponent';

export default function ViewAllCollections() {
    const [allData,setAllData] = useState([]);
    const [loading,setLoading] = React.useState(false);

  useEffect(()=>{
    getAllCollections()
  },[])


const getAllCollections= async()=>{
  setLoading(true)
   let result = await GetCollectionViewData();
   if(result){
   setAllData(result);
} else{
    setAllData([])
}
setLoading(false)
}

  return (
   <div>
    <header>
     <Header title={'All Collections'}/>
    </header>
     <div className='createScheme'>
        {
         allData.map((val,ind)=>{
            return  <TableComponent item={val}/>
         })
        }
     </div>
     <div className='loader'>
    {loading && <LoadingSpinner/>} 
     </div>
   </div>
  )
}

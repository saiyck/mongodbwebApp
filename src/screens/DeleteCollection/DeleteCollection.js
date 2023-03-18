import './DeleteCollection.css'
import React from 'react'
import Header from '../../components/Header/Header'
import { DeleteCollectionSchema, getCollections } from '../../common/Actions';
import { FaRegTrashAlt } from 'react-icons/fa';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import CrudComponent from '../../components/CrudComponent/CrudComponent';

export default function DeleteCollection() {
  const [list,setList] = React.useState([]);
  const [loading,setLoading] = React.useState(false);

  React.useEffect(()=> {
    setLoading(true)
    handleCollections()
 },[])

  const handleCollections= async()=> {
    let result = await getCollections();
    let lists = result.map((val) => val.name);
    setList(lists);
    setLoading(false)
  }

  const handleDelete = async(name)=> {
    setLoading(true)
    let res = await DeleteCollectionSchema(name);
    if(res.status === 200){
      handleCollections();
      alert('collection was deleted!')
    }else{
      alert('failed to delete collection!')
    }
    setLoading(false)
  }

  return (
    <div>
      <header>
        <Header title={'Delete Collection'}/>
      </header>
     <div className='createScheme'>
      <h5 style={{marginBottom:30}}>List of Collections</h5>
       {
        list.map((val)=> {
          return (
            <div className='itemss'>
              <p>{val}</p>
              <FaRegTrashAlt className='iconButton' onClick={()=> handleDelete(val)} style={{marginRight:20}} color='white'/>
            </div>
          )
        })
       }
     </div>
     <div className='loader'> 
    {loading && <LoadingSpinner/>} 
     </div>
    </div>
  )
}

import './ViewCollection.css'
import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { GetAllViewData, getCollections } from '../../common/Actions';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import moment from 'moment';

export default function ViewCollection() {

    const [list,setList] = React.useState([]);
    const [schemaName,setSchemaName] = useState('Please select');
    const [data,setData] = useState([]);
    const [loading,setLoading] = React.useState(false);


    React.useEffect(()=> {
        handleCollections()
     },[])
     
     const handleCollections= async()=> {
      setLoading(true)
       let result = await getCollections();
       let lists = result.map((val) => val.name);
       setList(lists);
       setLoading(false)
     }


    const getCollectionFields = async(name) => {
      setLoading(true)
        setSchemaName(name);
      let result = await GetAllViewData(name);
      if(result){
        setData(result.data);
      }else{
        setData([]);
        alert('no data found')
      }
      setLoading(false)
    }

  return (
    <div>
     <header>
        <Header title={'View Collection'}/>
    </header>   
        <div className='createScheme'>
         
        <div className='input1'>
          <h5>Select collection</h5>
            <DropdownButton onSelect={(key, obj) => getCollectionFields(key)} variant='dark' title={schemaName}>
              {
                list.map((val, ind) => {
                  return <Dropdown.Item key={ind} eventKey={val}>{val}</Dropdown.Item>
                })
              }
            </DropdownButton>
        </div>

        <div className='listData'>
          <div className='viewList'>
            {
              data.length > 0 ?  
                data.map((val,ind)=> {
                 let arr = Object.entries(val);
               return <div className='columns'>
                   {
                    arr.map((val)=> {
                    if(typeof val[1] != 'object' && val[0] != '_id' && val[0] != '__v'){
                    return <div className='rowss'>
                   {ind == 0 &&  <h4>{val[0]}</h4>}   
                   {ind == 0 &&  <div className='line'/>}   
                   { val[0] == "createdAt" || val[0] == "updatedAt" ? <p>{moment(val[1]).format('MMMM Do YYYY, h:mm:ss a')}</p> : <p>{val[1]}</p>}
                  </div>
                  }  
                 })}
                 </div>
                }) : 
                <h5>No Found</h5>
            }
          </div>
        </div>
        </div>
        <div className='loader'>
    {loading && <LoadingSpinner/>} 
     </div>
    </div>
  )
}

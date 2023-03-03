import './PostCollection.css'
import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ReactDropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCollectionFieldsList, getCollections, PostCollectionData } from '../../common/Actions';
import moment from 'moment'
import LoadingSpinner from '../../components/Loading/LoadingSpinner';


export default function PostCollection() {
  const optionTypes = ["single text", "number", "multi text", "date", "select option"]
  const [type, setType] = React.useState('Please select');
  const [startDate, setStartDate] = useState(new Date());
  const [fields, setFields] = React.useState([]);
  const [value,setValue] = React.useState('');
  const [list,setList] = React.useState([]);
  const [schemaName,setSchemaName] = useState('Please select');
  const [finalData,setFinalData] = useState([]);
  const [selectDateFinal,setSelectDateFinal] = useState([]);
  const [loading,setLoading] = React.useState(false);
  const [errorFields,setErrorFields] = React.useState({});

  const options = [
    'one', 'two', 'three'
  ];

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
  setErrorFields({})
    setSchemaName(name);
  let result = await getCollectionFieldsList(name);
  if(result.status == 200){
    let fieldsList = result.fields;
    setFields(fieldsList);
  }
  console.log('result',result)
  setLoading(false)
}

const onSetData=(value,lable,type)=>{
  if(type == 'date'){
    console.log('datess',value.toLocaleDateString())
    console.log(typeof value)
  }

  if(type == 'select option') {
    setFinalData({...finalData, [lable]:value.label});
    return;
  }
  setFinalData({...finalData, [lable]:value});
}

const validateFields = (data) => {
  console.log(data,'data')
  let obj = {}
  let ent = Object.entries(data)
  let keys = Object.keys(data)
   for(let i=0; i< fields.length; i++){
    if(fields[i].require && !keys.includes(fields[i].lable)){
       obj[fields[i].lable] = `please enter ${fields[i].lable}`
    }else if(fields[i].require && ent[i][1] == ''){
         obj[fields[i].lable] = `please enter ${fields[i].lable}`
    }
}
 setErrorFields(obj)
 console.log(obj,'obj')
 console.log(Object.keys(obj).length,'Object.keys(obj).length')
 console.log(errorFields)
 if(Object.keys(obj).length){
  return false
 }else{
  return true
 }
}

const onHandleSubmit = async() => {
  setLoading(true)
  let fields = {}
  let data = {}
  Object.entries(finalData).map((val)=> {
    if(typeof val[1] == 'object'){
      data[val[0]] = val[1].toLocaleDateString()
      return;
    }
    data[val[0]] = val[1]
  })
  fields.name = schemaName;
  fields.data = data
  let result = validateFields(data);
  console.log(result,'result')
  if(result){
  let res = await PostCollectionData(fields);
  if(res.status == 201){
    setList([])
    setFields([])
    handleCollections()
    alert('data created success fully')
  }else{
    alert('data not created. something went wrong!')
  }
  }
  setLoading(false)
}


  return (
    <div>
      <header>
        <Header title={'Post Collection'}/>
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
        
        <div className='square border border-dark formData'>
         {
          fields.map((val,ind)=>(
            val.type == 'single text' ? 
            <div className='input1'>
            <h5>{val.lable}</h5>
            <input onChange={(event) => onSetData(event.target.value,val.lable,val.type)} placeholder='Please enter' />
           { errorFields[val.lable] && <p className='erField'>{errorFields[val.lable]}</p>}
          </div> :
            val.type == 'multi text' ? 
            <div className='input1'>
            <h5>{val.lable}</h5>
            <input onChange={(event) => onSetData(event.target.value,val.lable,val.type)} placeholder='Please enter' />
            { errorFields[val.lable] && <p className='erField'>{errorFields[val.lable]}</p>}
          </div> :
           val.type == 'date' ? 
           <div className='input1'>
            <h5>{val.lable}</h5>
            {/* <p>{finalData[val.lable]}</p> */}
               <DatePicker selected={finalData[val.lable]} onChange={(date) => onSetData(date,val.lable,val.type)} />
               { errorFields[val.lable] && <p className='erField'>{errorFields[val.lable]}</p>}
            </div> :

           val.type == 'select option' ? 
      
           <div className='input1'>
           <h5>{val.lable}</h5>
             <ReactDropdown className='myDroDown' onChange={(data)=> onSetData(data,val.lable,val.type)} options={val.enum} placeholder="Select an option" />
             { errorFields[val.lable] && <p className='erField'>{errorFields[val.lable]}</p>}
         </div> 
         
         : 
          <div className='input1'>
          <h5>{val.lable}</h5>
          <input onChange={(event) => onSetData(event.target.value,val.lable,val.type)} placeholder='Please enter' />
          { errorFields[val.lable] && <p className='erField'>{errorFields[val.lable]}</p>}
         </div>
          ))
         }
         { fields.length > 0 &&  <button onClick={()=> onHandleSubmit()} class="submitbutton1">Submit</button> }
        </div>
      </div>
      <div className='loader'>
    {loading && <LoadingSpinner/>} 
     </div>
    </div>
  )
}

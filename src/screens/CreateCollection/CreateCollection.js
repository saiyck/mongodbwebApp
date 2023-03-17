import './CreateCollection.css'
import React,{useRef} from 'react'
import Header from '../../components/Header/Header'
import {CollectionField} from '../../components/CollectionField.js/CollectionField'
import { createCollection } from '../../common/Actions';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

export default function CreateCollection() {
  const childCompRef = useRef();
  let obj =  {
    "lable":"",
    "type": "",
    "value": "",
    "require": false
   }
   const [loading,setLoading] = React.useState(false);   
    const [schemeName,setSchemeName] = React.useState('');
    const [schemaError,setSchemaError] = React.useState('');
    const [listFields,setListFields] = React.useState([obj]);
    const rfs =[]

   React.useEffect(()=>{
    rfs.push(childCompRef)
    console.log('ref',childCompRef);
   },[])


  const handleSubmitData= async ()=> {
    console.log('refs',rfs)
    if(schemeName == ''){
      setLoading(false)
      setSchemaError('Please enter schema')
      return;
    }
    const finalFields = []

      for(let i=0;i<listFields.length;i++){
        let data = rfs[i].returnValues();
        console.log('data',data);
       let res = rfs[i].validateFields();
       console.log('ress',res)
       if(res){
        finalFields.push(data);
       }else{
        console.log('require fields are mandatory')
       }
      }

      if(listFields.length == finalFields.length){
        setLoading(true)  
         const data = {
            schemaName : schemeName,
            fields: finalFields
         }
         console.log('data',data)
       let result = await createCollection(data);
       console.log('result',result);
       if(result.status == 201){
        setListFields([obj])
        alert('Schema created successfully')
       }else{
        alert('Schema not create')
       }
      }
      setLoading(false)
  }



const addFields=()=>{
  let temp = [...listFields]
  temp.push(obj)
  setListFields(temp)
 rfs.push(childCompRef)
}

const handleRemove=(index)=> {
  let temp = [...listFields]
  temp.splice(index,1);
  setListFields(temp);
  rfs.splice(index,1);
}

  return (
    <div>
      <header>
        <Header title={'Create Collection'}/>
      </header>
      <div className='createScheme'>
        <div>
        <h5>Scheme Name</h5>
        <input onChange={(event) =>{ 
          setSchemaError('')
          setSchemeName(event.target.value)
          }} placeholder='Please enter'/>
        { <p className='error'>{schemaError}</p>}
        </div>
        <div className='lineView'/>
        {
          listFields.map((val,ind)=>{
            return (
            <div>  
            <CollectionField ref={ref=> rfs[ind] = ref} index={ind} list={listFields} onRemoveFields={()=> handleRemove(ind)} onAddFields={()=> addFields()}/>
           { listFields.length-1 != ind && <div className='lineView'/> }
            </div>
            )
          })
        }
       <button onClick={()=> handleSubmitData()}  class="submitbutton">Submit</button>
      </div>
      <div className='loader'>
    {loading && <LoadingSpinner/>} 
     </div>
    </div>
  )
}

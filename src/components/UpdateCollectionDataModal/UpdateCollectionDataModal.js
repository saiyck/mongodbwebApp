import './UpdateCollectionDataModal.css'
import React,{useState} from 'react'
import ReactDropdown from 'react-dropdown';

export default function UpdateCollectionDataModal({closeModal,name,keys,onHandleUpdate,types,schema}) {

    const [updateData,setUpdateData] = useState({});

    const onChangeTextInput = (lable,value) => {
       setUpdateData({...updateData,[lable]:value})
    } 

  return (
    <div className='deleteModal'>
    <div className='headerDiv'>
    <button onClick={()=> closeModal(false)}>X</button>
     </div> 
 <div className='viewModals'>    
   <div className='bodyDiv'>
   <div>Update {name} Schema</div>
   <div className='textBox'>
   {Object.entries(keys).map((val)=> {
    return (
        types[val[0]] == "single text" ?
        <div className='listDataa'>
        <p style={{alignSelf:'flex-start',marginBottom:-10,marginTop:5}}>{val[0]}</p>    
        <input disabled={val[0] == "_id"} onChange={(e)=> onChangeTextInput(val[0],e.target.value)} defaultValue={val[1]}/>
        </div> : 
        types[val[0]] == "number" ?
        <div className='listDataa'>
        <p style={{alignSelf:'flex-start',marginBottom:-10,marginTop:5}}>{val[0]}</p>    
        <input type={'number'} disabled={val[0] == "_id"} onChange={(e)=> onChangeTextInput(val[0],e.target.value)} defaultValue={val[1]}/>
        </div> : 
        types[val[0]] == "select option" ?
        <div className='listDataa'>
        <p style={{alignSelf:'flex-start',marginBottom:-10,marginTop:5}}>{val[0]}</p>    
        {/* <input disabled={val[0] == "_id"} onChange={(e)=> onChangeTextInput(val[0],e.target.value)} defaultValue={val[1]}/> */}
        <ReactDropdown className='dropupdate' onChange={(data)=> onChangeTextInput(val[0],data.value)} options={schema[val[0]].enum} placeholder={val[1]} />
        </div> :
        types[val[0]] == "date" ?
        <div className='listDataa'>
        <p style={{alignSelf:'flex-start',marginBottom:-10,marginTop:5}}>{val[0]}</p>    
        <input disabled={val[0] == "_id"} defaultValue={val[1]} onChange={(e)=> onChangeTextInput(val[0],e.target.value)}/>
        </div> :
        types[val[0]] == "multi text" ?
        <div className='listDataa'>
        <p style={{alignSelf:'flex-start',marginBottom:-10,marginTop:5}}>{val[0]}</p>
        <textarea style={{marginTop:10}} multiple={true} type={'text'} disabled={val[0] == "_id"} onChange={(e)=> onChangeTextInput(val[0],e.target.value)} defaultValue={val[1]}/>    
        {/* <input multiple={true} type={'text'} disabled={val[0] == "_id"} onChange={(e)=> onChangeTextInput(val[0],e.target.value)} defaultValue={val[1]}/> */}
        </div> : 
         <div className='listDataa'>
         <p style={{alignSelf:'flex-start',marginBottom:-10,marginTop:5}}>{val[0]}</p>    
         <input disabled={val[0] == "_id"} onChange={(e)=> onChangeTextInput(val[0],e.target.value)} defaultValue={val[1]}/>
         </div>
    )
   })}
   </div>
   </div>
  <div className='footerDiv'> 
   <button onClick={()=> onHandleUpdate(name,updateData)}>Update</button>
   <button onClick={()=> closeModal(false)}>Cancle</button>
  </div>
 </div>
</div>
  )
}

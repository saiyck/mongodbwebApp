import React,{useState} from 'react'

export default function DeleteRowsModal({closeModal,name,callDelete,keys}) {
 const [deleteFields,setDeleteFields] = useState({});

    const onChangeTextInput = (lable,isChecked) => {
       if(isChecked){
        setDeleteFields({...deleteFields,[lable]: ""})
       }else{
         let tempObj = {...deleteFields}
         delete tempObj[lable]
         setDeleteFields(tempObj)
       }
    }

  return (
    <div className='deleteModal'>
    <div className='headerDiv'>
    <button onClick={()=> closeModal(false)}>X</button>
     </div> 
     <div className='viewModals'>    
          <div className='bodyDiv'>
          <div>Delete {name} Schema</div>
          <div>Please select field</div>
          <div className='textBox'>
          {keys.map((val)=> {
           return (
            <div>
            <input onChange={(e)=> onChangeTextInput(val,e.target.checked)} disabled={val == "_id"} style={{marginRight:10,height:16,width:20}} className='checkBoxVie' type={'checkbox'}/>    
            <input disabled={true} defaultValue={val}/>
            </div>
           )
          })} 
          </div>
          </div>
         <div className='footerDiv'> 
          <button onClick={()=>callDelete(name,deleteFields)}>Delete</button>
          <button onClick={()=> closeModal(false)}>Cancle</button>
         </div>
        </div>
</div>
  )
}

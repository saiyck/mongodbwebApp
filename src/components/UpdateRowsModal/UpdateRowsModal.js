import './UpdateRowsModal.css'
import React, { useCallback, useState } from 'react'

export default function UpdateRowseModal({closeModal,name,keys,onHandleUpdateClick}) {
    const [updatedFields , setUpdatedFields] = useState({});


const onChangeTextInput = (lable,value) => {
    setUpdatedFields({...updatedFields, [lable]: value})
}

const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(onChangeTextInput), []);

  const onHandleUpdate = () => {
    onHandleUpdateClick(name, updatedFields)
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
          {keys.map((val)=>  <input disabled={val == "_id"} onChange={(e)=> onChangeTextInput(val,e.target.value)} defaultValue={val}/>)}
          </div>
          </div>
         <div className='footerDiv'> 
          <button onClick={()=> onHandleUpdate()}>Update</button>
          <button onClick={()=> closeModal(false)}>Cancle</button>
         </div>
        </div>
    </div>
  )
}

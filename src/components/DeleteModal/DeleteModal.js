import './DeleteModal.css'
import React from 'react'

export default function DeleteModal({closeModal,name,callDelete}) {
  return (
    <div className='deleteModal'>
           <div className='headerDiv'>
           <button onClick={()=> closeModal(false)}>X</button>
            </div> 
        <div className='viewModals'>    
          <div className='bodyDiv'>
           Are you sure want to delete
          </div>
         <div className='footerDiv'> 
          <button onClick={()=> callDelete()}>Yes</button>
          <button onClick={()=> closeModal(false)}>Cancle</button>
         </div>
        </div>
    </div>
  )
}

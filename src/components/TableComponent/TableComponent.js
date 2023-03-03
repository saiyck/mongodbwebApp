import React from 'react'

export default function TableComponent(props) {
    const {item} = props;
  return (
    <div>
    <div className='listData'>
     <h3 style={{marginLeft:50,marginBottom:-5}}>Name: {item?.schemaName}</h3>   
      <div className='viewList'>
        {
          item?.data.length > 0 ?  
            item?.data.map((val,ind)=> {
             let arr = Object.entries(val);
           return <div className='columns'>
               {
                arr.map((val)=> {
                if(typeof val[1] != 'object' && val[0] != '_id' && val[0] != '__v'){
                return <div className='rowss'>
               {ind == 0 &&  <h4>{val[0]}</h4>}   
               {ind == 0 &&  <div className='line'/>}   
                <p>{val[1]}</p>
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
  )
}

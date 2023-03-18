import './CrudComponent.css'
import React,{useEffect, useState} from 'react'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import DeleteModal from '../DeleteModal/DeleteModal';
import UpdateRowseModal from '../UpdateRowsModal/UpdateRowsModal';
import {useDispatch } from 'react-redux'
import { DeleteCollectionData, DeleteCollectionFields, GetCollectionViewData, UpdateCollectionData, UpdateCollectionFields } from '../../common/Actions';
import { addAllCollectionListData } from '../../redux/Reducers';
import DeleteRowsModal from '../DeleteRowsModal/DeleteRowsModal';
import UpdateCollectionDataModal from '../UpdateCollectionDataModal/UpdateCollectionDataModal';

export default function CrudComponent(props) {
    const {item,setLoading,getAllCollections} = props;
    const [listData,setListData] = useState([]);
    const [rows,setRows] = useState([]);
    const [openDeleteModal,setOpenDeleteModal] = useState(false);
    const [rowsModal,setRowsModal] = useState(false);
    const [deleteRowsModal,setDeleteRowsModal] = useState(false);
    const [updateCollectionModal,setUpdateCollectionModal] = useState(false);
    const [deleteColumData,setDeleteColumnData] = useState({});
    const [updateData,setUpdateData] = useState({});
    const [types,setTypes] = useState({})
    const [schema,setSchema] = useState({})
    const dispatch = useDispatch();

useEffect(()=> {
   setData()
},[item])

const setData = () => {
   let dataList = [...item.data];
   let firstObj = {...dataList[0]}
    setTypes(firstObj.types)
    setSchema(firstObj.schema)
    delete firstObj['types']
    delete firstObj['schema']
    console.log('first',firstObj)
    dataList.shift()
    dataList.unshift(firstObj)
   let keyss =  Object.keys(firstObj);
   setRows(keyss)
   setListData(dataList)
}

const handleDeleteCall = async() => {
  setLoading(true)
  let res = await DeleteCollectionData(deleteColumData._id,item.schemaName);
  if(res.status === 204){
    getAllCollections()
  } 
  setOpenDeleteModal(false)
  setLoading(false)
}

const handleClickUpdateRows = async(name,data) => {
  setLoading(true)
  let response = await UpdateCollectionFields(name,data);
  if(response && response.status === 201){
    setRowsModal(false)
    getAllCollections()
  }else{
    alert("something went wrong! please try again")
  }
  setLoading(false)
}

const handleDeleteRows = async(name,data) => {
  setLoading(true)
  let res = await DeleteCollectionFields(name,data);
  if(res?.status === 201){
    getAllCollections()
    setDeleteRowsModal(false)
  }else{
    alert("something went wrong! please try again")
  }
  setLoading(false)
}

const handleUpdateCollectionData = async(name,data) => {
  setLoading(true)
  let res  = await UpdateCollectionData(updateData._id,name,data);
  if(res?.status === 204){
    getAllCollections()
    setUpdateCollectionModal(false)
  }else{
    alert("something went wrong! please try again")
  }
 setLoading(false)
}


      
  return (
    <div className="AppTable">
    <div>    
    <h4>Name : {item.schemaName}</h4>    
    <table>
      <tr>
        {rows.map((val,ind)=>  <th key={ind}>{val}</th>)}
        <th>
            <div className='actionRow'>
                <p>Actions</p>
                <div className='actionButtons'>
                <FaRegEdit onClick={()=> setRowsModal(true)} size={18} className='iconButton' style={{marginRight:5,marginLeft:5}} color='black'/>    
                <FaRegTrashAlt onClick={()=> setDeleteRowsModal(true)} className='iconButton' style={{marginRight:5,marginLeft:5}} color='black'/>
                </div>
            </div>
        </th>
      </tr>
      {listData.map((val, key) => {
       let values =  Object.values(val);
        return (  
          <tr key={key}>
            {
              values.map((vals,ind)=>  <td key={ind}>{vals}</td>)  
            }
          <td>
          <div className='actionButtons'>
                <FaRegEdit onClick={()=> {
                  setUpdateCollectionModal(true)
                  setUpdateData(val)
                }} size={18} className='iconButton' style={{marginRight:20,marginLeft:5}} color='black'/>    
                <FaRegTrashAlt opacity={ key == 0 ? 0.5 : 1} onClick={ key != 0 ? ()=>{ 
                  setDeleteColumnData(val)
                  setOpenDeleteModal(true)
              } : null} className='iconButton' style={{marginRight:5,marginLeft:5}} color='black'/>
          </div>
            </td>  
          </tr>
        )
      })}
    </table>
    </div>
    {openDeleteModal && <DeleteModal callDelete={()=> handleDeleteCall()} name={item.id} closeModal={setOpenDeleteModal}/>}
    {deleteRowsModal && <DeleteRowsModal callDelete={(name,data)=> handleDeleteRows(name,data)} name={item.schemaName} keys={rows} closeModal={setDeleteRowsModal}/>}
    {rowsModal && <UpdateRowseModal onHandleUpdateClick={(name,data)=> handleClickUpdateRows(name,data)} keys={rows} name={item.schemaName} closeModal={setRowsModal}/>}
    {updateCollectionModal && <UpdateCollectionDataModal types={types} schema={schema} onHandleUpdate={(name,data)=> handleUpdateCollectionData(name,data) } keys={updateData} name={item.schemaName} closeModal={setUpdateCollectionModal} />}
  </div>
  )
}

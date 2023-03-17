import './CollectionField.css'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';

export const CollectionField = forwardRef((props, ref) => {
  const { onAddFields, list, index, onRemoveFields } = props;
  const [checked, setChecked] = React.useState(false);
  const [falseChecked, setFalseChecked] = React.useState(false);
  const [require, setRequire] = React.useState(null);
  const [lable, setLable] = React.useState('');
  const [type, setType] = React.useState('Please select');
  const optionTypes = ["single text", "number", "multi text", "date", "select option"]
  const [value, setValue] = useState('');
  const [valueError, setValueError] = React.useState('');
  const [typeError, setTypeError] = React.useState('');
  const [lableError,setLableError] = React.useState('');
  const [requireError,setRequireError] = React.useState('');
  const [optionValuError,setOptionValueError] = React.useState('')

  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [optionValues, setOptionValues] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const handleSelectRequire = (from, select) => {
    setRequireError("")
    if (from == 'true' && select) {
      setRequire(true)
      setChecked(true)
      setFalseChecked(false)
    } else {
      setRequire(false)
      setFalseChecked(true)
      setChecked(false)
    }
  }


  useImperativeHandle(ref, () => ({
    returnValues() {
      let obj = {}
      obj.lable = lable;
      obj.type = type;
      obj.value = value;
      obj.require = require
      if (type == 'select option') {
        let v = optionValues.split(" ").join("");
        let vals = v.split(',');
        obj.enum = vals
      }
      return obj;
    },
    resetAllFields() {
     setLable("")
     setType("Please select")
     setChecked(false)
     setFalseChecked(false)
     setRequire(null)
     setValue("")
     setOptionValues("")
    },
    validateFields() {
      let typeB = true
      let valueB = true
      let lableB = true
      let requireB = true
      let optionB = true

      if (type == "Please select") {
        setTypeError('type should not be empty')
        typeB = false
      }else{
        setTypeError('')
        typeB = true
      }
      
      if(require == null){
        setRequireError("please select field required or not")
        requireB = false
      }else{
        setRequireError("")
        requireB = true
      }

      if(lable == ""){
        setLableError("lable should not be empty")
        lableB = false
      }else{
        setLableError("")
        lableB = true
      }

      if(type == "select option"){
        if(optionValues == ""){
          setOptionValueError("options should not empty")
          optionB = false
        }else{
          setOptionValueError("")
          optionB = true
        }
      }

      if(type == "select option"){
        let v = optionValues.split(" ").join("");
        let vals = v.split(',');
        if(vals.includes(value)){
          setValueError('')
          valueB = true
        }else{
          setValueError('entered value should contain in optional value')
          valueB = false
        }}

      if (require) {
        if (value == "") {
          setValueError('value should not be empty')
          valueB = false
        }
      }else if(require == false){
        if(type == "select option" && value == ""){
             alert("hello")
            setChecked(true)
            setFalseChecked(false)
            setRequire(true)
            setValueError('value should not be empty')
            setRequireError("")
            valueB = false
        }
      }
      console.log('ypeB && lableB && valueB && requireB && optionB',typeB , lableB , valueB , requireB , optionB)
      if(typeB && lableB && valueB && requireB && optionB){
         return true
      }else{
         return false
      }

    }
  }))



  return (
    <div className='collectionFieldMain'>
      <div className='form'>

        <div className='input'>
          <h5>Lable</h5>
          <input onChange={(event) => {
            setLable(event.target.value)
            setLableError("")
            }} placeholder='Please enter' />
          {lableError &&  <p className='error'>{lableError}</p>}
        </div>

        <div className='input'>
          <h5>Select type</h5>
          <div className='dropdown'>
            <DropdownButton onSelect={(key, obj) => {
              setType(key)
              setTypeError("")
            }} variant='dark' id="dropdown-basic-button" title={type}>
              {
                optionTypes.map((val, ind) => {
                  return <Dropdown.Item key={ind} eventKey={val}>{val}</Dropdown.Item>
                })
              }
            </DropdownButton>
          </div>
          {typeError &&  <p className='error'>{typeError}</p>}
        </div>

        <div className='input'>
          <h5>Required</h5>
          <div class="form-check">
            <input style={{borderColor:  requireError ? 'red': null}} onClick={(event)=> handleSelectRequire('true',true)} checked={checked} class="form-check-input" type="radio"  />
            <label class="form-check-label" for="flexRadioDefault1">
              True
            </label>
          </div>
          <div class="form-check">
            <input style={{borderColor:  requireError ? 'red': null}} onClick={(event)=> handleSelectRequire('false',true)} checked={falseChecked} class="form-check-input" type="radio"  />
            <label class="form-check-label" for="flexRadioDefault2">
              False
            </label>
          </div>
          {/* {requireError &&  <p className='error'>{requireError}</p>} */}
        </div>

        <div className='input'>
          <h5>Please enter value</h5>
          <input onChange={(event) => {
            setValue(event.target.value)
            setValueError("")
          }} placeholder='Please enter' />
          {valueError &&  <p className='error'>{valueError}</p>}
        </div>

        {
          type == 'select option' ?
            <div className='input'>
              <h5>Option value</h5>
              <input placeholder={'Ex: male,female'} onChange={(event) => setOptionValues(event.target.value)}/>
              {optionValuError &&  <p className='error'>{optionValuError}</p>}
            </div> : null
        }

      </div>

      {
        list.length-1 == index ? 
        <button onClick={()=> onAddFields()} class="button">+ Add</button> :
        <button onClick={()=> onRemoveFields()} class="button">- Remove</button> 
      }
      

    </div>
  )
})

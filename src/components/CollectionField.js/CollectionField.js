import './CollectionField.css'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Icon, { FontAwesome, Feather } from 'react-web-vector-icons';

export const CollectionField = forwardRef((props, ref) => {
  const { onAddFields, list, index, onRemoveFields } = props;
  const [checked, setChecked] = React.useState(false);
  const [falseChecked, setFalseChecked] = React.useState(false);
  const [require, setRequire] = React.useState(false);
  const [lable, setLable] = React.useState('');
  const [type, setType] = React.useState('Please select');
  const optionTypes = ["single text", "number", "multi text", "date", "select option"]
  const [value, setValue] = useState('');
  const [valueError, setValueError] = React.useState('');
  const [typeError, setTypeError] = React.useState('');

  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);
  const [optionValues, setOptionValues] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const handleSelectRequire = (from, select) => {
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
        let vals = optionValues.split(',');
        obj.enum = vals
      }
      return obj;
    },
    validateFields() {
      console.log('call...')
      if (require) {
        if (type == "") {
          setValueError('')
          setTypeError('Type should not be empty')
          console.log('if...')
          return false
        } else if (value == "") {
          setTypeError('')
          setValueError('Value should not be empty')
          return false
        } else {
          console.log('else...')
          setValueError('')
          setTypeError('')
          return true
        }
      } else {
        setValueError('')
        return true
      }
    }
  }))



  return (
    <div className='collectionFieldMain'>
      <div className='form'>

        <div className='input'>
          <h5>Lable</h5>
          <input onChange={(event) => setLable(event.target.value)} placeholder='Please enter' />
        </div>

        <div className='input'>
          <h5>Select type</h5>
          <div className='dropdown'>
            <DropdownButton onSelect={(key, obj) => setType(key)} variant='dark' id="dropdown-basic-button" title={type}>
              {
                optionTypes.map((val, ind) => {
                  return <Dropdown.Item key={ind} eventKey={val}>{val}</Dropdown.Item>
                })
              }
            </DropdownButton>
          </div>
        </div>

        <div className='input'>
          <h5>Required</h5>
          <div class="form-check">
            <input onClick={(event)=> handleSelectRequire('true',true)} value="null" checked={checked} class="form-check-input" type="radio"  />
            <label class="form-check-label" for="flexRadioDefault1">
              True
            </label>
          </div>
          <div class="form-check">
            <input onClick={(event)=> handleSelectRequire('false',true)} checked={falseChecked} class="form-check-input" type="radio"  />
            <label class="form-check-label" for="flexRadioDefault2">
              False
            </label>
          </div>
        </div>

        <div className='input'>
          <h5>Please enter value</h5>
          <input onChange={(event) => setValue(event.target.value)} placeholder='Please enter' />
        </div>

        {
          type == 'select option' ?
            <div className='input'>
              <h5>Option value</h5>
              <input onChange={(event) => setOptionValues(event.target.value)} placeholder='Please enter' />
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

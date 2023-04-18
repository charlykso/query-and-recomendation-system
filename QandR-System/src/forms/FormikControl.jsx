import React from 'react'
import Input from './Input'
import Select from './Select'
import TextArea from './TextArea'

const FormikControl = (props) => {
  const { control, ...rest } = props
    switch (control) {
      case 'input':
        return <Input { ...rest }/>
      case 'textarea':
        return <TextArea { ...rest } />
    //   case 'checkbox':
    //     return <CheckboxGroup { ...rest }/>
      case 'select':
        return <Select {...rest} />
      case 'radio':
        break
      case 'date':
        // return <DatePicker { ...rest } />
        break
      default: return null
    }
}

export default FormikControl

import React from 'react'
import { useField } from 'formik'

const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error text-red-500'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default Select

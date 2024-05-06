'use client'

import { useState } from 'react'
import styles from './FormComponents.module.css'

export const Inputs = ({
  type,
  name,
  id,
  text,
  placeholder,
  value,
  errorMessage,
  minLength,
}) => {
  let pattern = null

  if (type === 'email') {
    pattern = '^[^@]+@[^@]+.[a-zA-Z]{2,}$'
  }
  if (type === 'password') {
    pattern =
      '^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$'
  }
  if (type === 'tel') {
    pattern = '[0-9]+'
  }
  return (
    <div
      className={styles.inputs}
      style={type === 'hidden' ? { display: 'none' } : {}}
    >
      <label htmlFor={id} className={styles.label}>
        {text ? text : <p></p>}
        <input
          className={styles.input}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder ? placeholder : null}
          defaultValue={value ? value : null}
          pattern={pattern}
          required
          onInvalid={(e) => {
            e.target.setCustomValidity(errorMessage)
          }}
          minLength={minLength ? minLength : null}
          onInput={(e) => e.target.setCustomValidity('')}
        />
      </label>
    </div>
  )
}

export const TextArea = ({ name, id, text, placeholder, value }) => {
  return (
    <div className={styles.inputs}>
      <label htmlFor={id} className={styles.label}>
        {text ? text : <p></p>}
        <textarea
          className={styles.textarea}
          name={name}
          id={id}
          cols='30'
          rows='5'
          required
          placeholder={placeholder}
        ></textarea>
      </label>
    </div>
  )
}

export const Select = ({ text, data, id, name, func }) => {
  return (
    <div className={styles.inputs}>
      <label htmlFor={id} className={styles.label}>
        {text ? text : <p></p>}
        <select
          id={id}
          name={name}
          className={styles.select}
          onChange={func}
          defaultValue={() => document.getElementsByName(name)[0]}
        >
          {data.map((item, index) => (
            <option key={index} value={item} className={styles.option}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export const InputTypeFile = ({
  handleFileChange,
  text,
  multiple,
  name,
  id,
}) => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
      <label htmlFor={id} className={styles.inputFileLabel}>
        {text}
        <input
          className={styles.inputFile}
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          name={name}
          id={id}
          required
          multiple={multiple}
          onInvalid={(e) => {
            setError(true)
            setErrorMessage(e.target.validationMessage)
          }}
          onInput={(e) => setError(false)}
        />
      </label>
      {error ? <p className={styles.errorMessage}>{errorMessage}</p> : <p></p>}
    </>
  )
}

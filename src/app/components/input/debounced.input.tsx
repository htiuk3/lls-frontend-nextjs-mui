"use client"

import { TextField } from "@mui/material"
import { InputHTMLAttributes, useEffect, useState } from "react"

interface DebouncedInputProps {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}
// A debounced input react component
export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  //
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (

    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}
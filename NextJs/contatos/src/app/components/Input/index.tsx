import React, { InputHTMLAttributes } from 'react'

type InputProps = React.ComponentProps <'input'>




const input = ( {...rest} : InputProps) => {
  
  return (
    <input
      {...rest}
    />
  
  )
}

export default input
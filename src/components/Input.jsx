import { forwardRef } from 'react'

import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel.jsx'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="border-brand-border outline-brand-primary placeholder:text-brand-text-gray rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

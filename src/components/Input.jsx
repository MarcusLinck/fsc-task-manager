import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel.jsx'

const Input = forwardRef(({ label, errormessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errormessage && <InputErrorMessage>{errormessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'
Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errormessage: PropTypes.string,
  placeholder: PropTypes.string,
}
export default Input

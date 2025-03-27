import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel.jsx'

const Select = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {props.errormessage && (
        <InputErrorMessage>{props.errormessage}</InputErrorMessage>
      )}
    </div>
  )
})

Select.displayName = 'TimeSelect'
Select.propTypes = {
  errormessage: PropTypes.string,
}
export default Select

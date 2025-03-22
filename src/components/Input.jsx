import InpuLabel from './InpuLabel.jsx'

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InpuLabel htmlFor={rest.id}>{label}</InpuLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input

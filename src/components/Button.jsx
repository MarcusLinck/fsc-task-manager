const Button = ({ children, variant = 'primary' }) => {
  const getVariantClass = () => {
    if (variant === 'primary') {
      return 'bg-[#00ADB5] text-white'
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181]'
    }
  }
  return (
    <div>
      <button
        className={`items flex gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-70 ${getVariantClass()} `}
      >
        {children}
      </button>
    </div>
  )
}

export default Button

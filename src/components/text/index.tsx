export const Text = ({
  children,
  className = '',
  style = {},
  click,
}: {
  children?: React.ReactNode
  className?: string
  style?: any
  click?: () => void
}) => {
  return (
    <span
      onClick={click}
      className={`text-[1rem] z-1 font-bold ${className}`}
      style={style}
    >
      {children}
    </span>
  )
}

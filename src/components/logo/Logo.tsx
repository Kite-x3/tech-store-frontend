export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      className={className}
    >
      <g
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
      >
        <path d='M2.75 2.75h10.5v10.5H2.75z' />
        <path d='M6.25 6.25h3.5v3.5h-3.5zm-4 4h-1m1-4.5h-1m13.5 4.5h-1m1-4.5h-1m-3.5 8v1m-4.5-1v1m4.5-13.5v1m-4.5-1v1' />
      </g>
    </svg>
  )
}

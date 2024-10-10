import React, { ComponentProps } from 'react'

export default function Header({
  children,
  className,
  ...props
}: ComponentProps<'header'>) {
  return (
    <header className={className} {...props}>
      {children}
    </header>
  )
}
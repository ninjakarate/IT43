'use client';

// import { useRouter } from 'next/navigation';
import React, { ComponentProps } from 'react'

type Props = {
  nav: Array<{ href: string; label: string }>
}

export default function Sidebar({
  className,
  nav,
  ...props
}: Props & ComponentProps<'div'>) {
  // const router = useRouter();

  return (
    <div className={(className)} {...props}>
      {nav.map((item) => (
        <button
          key={item.href}
          // onClick={() => router.replace(item.href)}
          className='hover:bg-[--color-brand-light] px-2 py-3 rounded-lg text-[--color-brand-dark] hover:text-[--color-secondary] cursor-pointer'>
          {item.label}
        </button>
      ))}
    </div>
  )
}
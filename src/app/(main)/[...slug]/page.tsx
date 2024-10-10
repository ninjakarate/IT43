import React from 'react'

export async function generateStaticParams() {
  return [
    { slug: ['settings'] },
  ]
}

export default function Page({ params }: { params: { slug: string }} ) {
  const { slug } = params;
  return (
    <div>dynamic route: {JSON.stringify(slug)}</div>
  )
}
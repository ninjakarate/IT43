export const metadata = {
  title: 'IT43 example',
  description: 'IT43 test subdomain',
  icons: {
    icon: 'it43.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/it43.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}

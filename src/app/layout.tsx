import '../index.css';
import Header from '../shared/ui/Header';
import Sidebar from '../shared/ui/Sidebar';

export const metadata = {
  title: 'IT43 test subdomain',
  description: 'IT43 test subdomain',
  icons: {
    icon: 'it43.png',
  },
}

const nav = [
  { href: '/', label: 'Home' },
  { href: '/settings', label: 'Settings' },
]

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

      <body className='relative flex flex-row bg-gray-100 w-full h-screen'>
        <Sidebar className='w-[--left-sidebar-width] flex flex-col justify-center items-center gap-20 bg-[--color-brand-light] shadow m-4 p-2 rounded-xl text-xl hover:animate-shake' nav={nav} />

        <div className='flex flex-col w-full h-full'>
          <Header className='top-0 sticky bg-[--color-brand-light] shadow m-4 p-2 rounded-xl text-center text-white hover:animate-shake'>
            <h1 className='text-[--color-brand-dark] text-2xl'>{'example subdomain'}</h1>
          </Header>

          <div className='flex flex-col flex-wrap gap-4 m-4'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

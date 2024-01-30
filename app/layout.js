import './globals.css'
import { ItemContextProvider } from './containers/useItem'
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'DuckmouthB | 2024 的你是哪種角獸？',
  description: '一起來測測看，2024 的你會是哪種角獸！',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ItemContextProvider>
      <body className='w-full h-screen sm:w-[430px] sm:m-auto sm:max-h-[932px] sm:mt-[20%]'>
        {children}
        <SpeedInsights/>
      </body>
      </ItemContextProvider>
    </html>
  )
}

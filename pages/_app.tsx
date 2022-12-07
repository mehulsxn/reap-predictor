import { Inter } from '@next/font/google'
import { AppProps } from 'next/app'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default App

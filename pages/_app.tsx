import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </main>
  )
}

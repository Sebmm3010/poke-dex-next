import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '../themes';
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: ['300', '500', '700'],
  subsets: ['latin']
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </main>
  )
}

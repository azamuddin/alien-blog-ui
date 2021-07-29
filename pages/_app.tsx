import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {initializeStore, useStore} from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  let store = useStore(pageProps.initialReduxState)

  return <Provider store={store}>
     <Component {...pageProps} />
  </Provider>
}
export default MyApp

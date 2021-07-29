import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {initializeStore, useStore} from '../store'
import { withCookie } from 'next-cookie';

function MyApp({ Component, pageProps, cookie }: AppProps) {

  let store = useStore({
    ...pageProps.initialReduxState, 
    user: cookie.get('alien_blog_user')
  })

  return <Provider store={store}>
     <Component {...pageProps} />
  </Provider>
}
export default withCookie(MyApp)

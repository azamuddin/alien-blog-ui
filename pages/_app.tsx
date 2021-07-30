import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppContext, AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore} from '../store'
import {useCookie} from 'next-cookie'
import {User} from '../types'

function MyApp({ Component, pageProps, user }: AppProps & {user: User | null}) {

  let store = useStore({
    ...pageProps?.initialReduxState, 
    user
  })

  return <Provider store={store}>
     <Component {...pageProps} />
  </Provider>
}

MyApp.getInitialProps = function (appContext: AppContext){

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie(appContext.ctx);
  const user = cookie.get('alien_blog_user');

  return {
    user: user || null
  }

}

export default MyApp

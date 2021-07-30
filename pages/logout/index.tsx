import { useEffect } from 'react'; 
import { withCookie } from 'next-cookie'
import { useRouter } from 'next/router'

function Logout(props: { cookie: any}){

  let { cookie } = props;
  const router = useRouter();

  useEffect(() => {
    cookie.remove('alien_blog_user');
    cookie.remove('alien_blog_token');
    router.push('/')
  }, [cookie])

  return <div>
  </div>
}

export default withCookie(Logout);

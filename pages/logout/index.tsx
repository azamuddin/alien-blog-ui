import { useEffect } from 'react'; 
import { withCookie } from 'next-cookie'

function Logout(props: { cookie: any}){

  let { cookie } = props;

  useEffect(() => {
    cookie.remove('alien_blog_user');
    cookie.remove('alien_blog_token');
    window.location.href = "/"
  }, [])

  return <div>
  </div>
}

export default withCookie(Logout);

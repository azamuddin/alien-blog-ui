import axios from 'axios';
import Posts from '../../components/Posts';
import TopNav from '../../components/TopNav';
import { withCookie, useCookie } from 'next-cookie';
import {NextPageContext} from 'next';

function MyPosts(){
  return <>
    <TopNav/>
    <div className="max-w-4xl mx-auto">
      <Posts/>
    </div>
  </>
}

export async function getServerSideProps(ctx: NextPageContext){

  const LIMIT = 1;

  const API = process.env.NEXT_PUBLIC_API
  
  const cookie = useCookie(ctx);
  const token = cookie.get('alien_blog_token');

  let {data: { data: posts} } = await axios.get(`${API}/posts/my-posts?limit=${LIMIT}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  return {
    props: {
      initialReduxState: {
        posts
      }
    }
  }

}


export default withCookie(MyPosts)

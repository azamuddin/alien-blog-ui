import axios from 'axios';
import Posts from '../../components/Posts';
import TopNav from '../../components/TopNav';
import { withCookie, useCookie } from 'next-cookie';
import {NextPageContext} from 'next';
import Link from 'next/link';

function MyPosts(){
  return <>
    <TopNav/>
    <div className="max-w-4xl mx-auto">

      <div className="flex my-5">
        <Link href="/posts/new">
          <button 
            className="
              bg-indigo-600 
              hover:bg-indigo-500
              text-white
              rounded 
              p-2 
              px-3
              ml-auto
            ">
            Create post
          </button>
        </Link>
      </div>

      <Posts/>
    </div>
  </>
}

export async function getServerSideProps(ctx: NextPageContext){

  const LIMIT = 1;

  const API = process.env.NEXT_PUBLIC_API
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

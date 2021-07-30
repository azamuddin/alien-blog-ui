import {useSelector, useDispatch} from "react-redux"
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import axios from 'axios';
import {Post} from "../types";
import {useCookie} from "next-cookie";

export default function Posts({owned} : {owned?: boolean}){

  let posts = useSelector((state: {posts: Post[]}) => state.posts);

  let dispatch = useDispatch();

  const cookie = useCookie(); 
  const token = cookie.get('alien_blog_token');

  const loadMore = async function(){

    const LIMIT = 6

    let ENDPOINT =
      `${process.env.NEXT_PUBLIC_API}/${!owned ? 'posts' : 'posts/my-posts'}?limit=${LIMIT}&skip=${posts.length}`;

    let { data: { data } } = await axios
      .get(ENDPOINT, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

    dispatch({
      type: "APPEND_POSTS", 
      payload: data
    });
  }

  return <div>

    {posts.map(post => {
      return <div key={post.id} className="border-l-4 border-indigo-700 pl-3 py-3 my-4 rounded shadow">
        <div className="text-xl font-bold">
          <Link href={`/read/${post.id}`}>
            {post.title}
          </Link>
        </div>
        <div className="text-sm flex space-x-2">
          <div>
            {post.user?.name}
          </div>
          <div>
            {formatDistance(new Date(), new Date(post.createdAt))}
          </div>
        </div>
      </div>
    })}

    <div 
      className="bg-gray-50 hover:bg-gray-100 text-center my-4 rounded cursor-pointer p-2"
      onClick={loadMore}
    >
      Load more
    </div>

  </div>
}

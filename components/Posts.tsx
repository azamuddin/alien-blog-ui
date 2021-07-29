import {useSelector, useDispatch} from "react-redux"
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import axios from 'axios';
import {Post} from "../types";

export default function Posts(){

  let posts = useSelector((state: {posts: Post[]}) => state.posts);

  let dispatch = useDispatch();

  const loadMore = async function(){
    let { data: { data } } = await axios
    .get(`${process.env.NEXT_PUBLIC_API}/posts?limit=1&skip=${posts.length}`)

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

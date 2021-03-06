import { NextPageContext } from 'next'; 
import * as React from 'react'; 
import axios from 'axios';
import { format } from 'date-fns'; 

import TopNav from '../../components/TopNav'
import {Post} from '../../types';

export default function Read(props: { post: Post }){

  const { post } = props; 

  return <>
    <TopNav/>
    <div className="max-w-4xl mx-auto text-center">
      <div className="text-4xl font-bold mx-auto mt-10 ">
        {post.title} 
      </div>
      <div className="flex space-x-2 justify-center mt-3">
        <div>
          {post.user?.name} 
        </div>
        <div>
          {format(new Date(post.createdAt), 'd/MM/Y')}
        </div>
      </div>
      <div className="mt-10">
        <div dangerouslySetInnerHTML={{__html: post.content}}></div>
      </div>
    </div>
  </>
}


export async function getServerSideProps(ctx: NextPageContext){

  let { query: {id} } = ctx;

  let { data: { data: post }} =
    await axios.get(`${process.env.NEXT_PUBLIC_API}/posts/${id}`)

  return {
    props: {
      post
    }
  }
}

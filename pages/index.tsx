import Posts from '../components/Posts'
import axios from 'axios';

import TopNav from '../components/TopNav'

export default function Home() {

  return (
    <>
      <TopNav/>
      <div className="max-w-4xl mx-auto">
        <Posts/>
      </div>
    </>
  )
}

export async function getServerSideProps(){

  const LIMIT = 1;

  const API = process.env.NEXT_PUBLIC_API

  let {data: { data: posts }} = await axios.get(`${API}/posts?limit=${LIMIT}`)

  return {
    props: {
      initialReduxState: {
        posts
      } 
    }
  }
}

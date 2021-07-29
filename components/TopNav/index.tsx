import * as React from 'react'; 
import Link from 'next/link';
import localStorage from 'localStorage';
import {useSelector} from 'react-redux';

export default function TopNav(){

  let user = useSelector(state => state.user);

  let logout = function(){
    window.location.href = "/logout"
  }

  return <div className="bg-gray-100 p-3">
    <div className="max-w-4xl mx-auto flex">
      <div>
        <Link href="/">
          Aliens .blog
        </Link>
      </div>

      {!user?.name ? <>
        <div className="flex ml-auto space-x-3">
          <div className="p-1 px-3 bg-indigo-600 text-white rounded shadow cursor-pointer">
            <Link href="/login">
              Login
            </Link>
          </div>
          <div className="p-1 underline cursor-pointer">
            <Link href="/register">
              Register
            </Link>
          </div>
        </div>
      </> : null}

      {user?.name ? <>
        <div className="flex ml-auto space-x-3">
          <div className="p-1 px-3 underline cursor-pointer">
            <Link href="/my-posts">
              My Posts
            </Link>
          </div>
          <div className="p-1 underline cursor-pointer">
            <div href="/register" onClick={logout}>
              Logout
            </div>
          </div>
        </div>
      </> : null}

    </div>
  </div>
}

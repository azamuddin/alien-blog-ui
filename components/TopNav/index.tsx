import * as React from 'react'; 
import Link from 'next/link';
import localStorage from 'localStorage';

export default function TopNav(){

  let user = JSON.parse(localStorage.getItem('alien_blog_user') || '{}');

  let logout = function(){
    localStorage.removeItem('alien_blog_user');
    localStorage.removeItem('alien_blog_token');
    window.location.reload();
  }

  return <div className="bg-gray-100 p-3">
    <div className="max-w-4xl mx-auto flex">
      <div>
        <Link href="/">
          Aliens .blog
        </Link>
      </div>

      {!user.name ? <>
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

      {user.name ? <>
        <div className="flex ml-auto space-x-3">
          <div className="p-1 px-3 underline cursor-pointer">
            <Link href="/login">
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

import * as React from 'react'; 

export default function TopNav(){
  return <div className="bg-gray-100 p-3">
    <div className="max-w-4xl mx-auto flex">
      <div>
        Aliens .blog
      </div>
      <div className="flex ml-auto space-x-3">
        <div className="p-1 px-3 bg-indigo-600 text-white rounded shadow cursor-pointer">
          Login
        </div>
        <div className="p-1 underline cursor-pointer">
          Register
        </div>
      </div>
    </div>
  </div>
}

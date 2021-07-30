import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';


const ReactQuill = dynamic(import('react-quill'), {ssr: false})

import TopNav from "../../components/TopNav";
import {useCookie} from 'next-cookie';
import {useRouter} from 'next/router';

function NewPost(){

  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const cookie = useCookie();
  const token = cookie.get('alien_blog_token')

  useEffect(() => {
    if(!token){
      router.push('/')
    }
  }, [token])

  if(!token){
    return <div/>
  }

  const save = async () => {

    setSaving(true);

    try{
      let { data } =
        await axios
        .post(`${process.env.NEXT_PUBLIC_API}/posts`, {
          title, 
          content: value
        }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        router.push(`/read/${data.data.id}`)

    } catch(err) {
      setSaving(false); 
      setError(err.message);
    }

  }

  return <>
    <TopNav /> 

    <div className="max-w-4xl mx-auto py-5">

      {error.length ? <>
        <div className="bg-red-100 text-red-700 p-2 rounded mt-10">
          {error}
        </div>
      </>: null}

      <div className="">
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          className="border border-gray-300 w-full p-2"
          onChange={ e => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
      </div>

      <div className="mt-5">
        <button 
          className={`
            p-2 w-full
            rounded
            text-white 
            ${saving ? 'bg-indigo-200': 'bg-indigo-600'}
          `}
          onClick={save}
        >
          {saving ? "Saving ... " : "Save"}
        </button>
      </div>

    </div>
  </>
}

export default NewPost

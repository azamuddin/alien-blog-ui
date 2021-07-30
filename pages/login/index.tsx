import { useState } from 'react';
import axios from 'axios'; 
import { useForm } from 'react-hook-form';
import { useCookie } from 'next-cookie';
import {NextPageContext} from 'next';
import {useRouter} from 'next/router';

function Login(props: {cookie: string}){

  const { cookie } = useCookie(props.cookie);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [error, setError] = useState('')

  const onSubmit = async (formData: {email: string, password: string}) => {

    let { data } = await 
      axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, formData);

    if(data.error){
      setError(data.message);
      return;
    }

    cookie.set('alien_blog_token', data.data.token);
    cookie.set('alien_blog_user', JSON.stringify(data.data.user));
    router.push('/')

  }

  return <>
    <div className="max-w-2xl mx-auto mt-10">


      <form action="shadow bg-gray-50" onSubmit={handleSubmit(onSubmit)}>

        <div className="mt-5">
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            className="border w-full border-indigo-600 rounded p-2"
            id="email"
            {...register("email", {
              required: true, 
            })}
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">This field is required</div>}
        </div>
        <div className="mt-5">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            className="border w-full border-indigo-600 rounded p-2"
            id="password"
            {...register("password", {
              required: true
            })}
          />
          {errors.password && <div className="text-red-600 text-sm mt-1">This field is required</div>}
        </div>

        <div className="mt-5">
          <button className="w-full bg-indigo-600 p-2 rounded text-white ">
            Login
          </button>
        </div>
      </form>

      {error.length ? <>
        <div className="bg-red-100 text-red-700 p-2 rounded mt-10">
          {error}
        </div>
      </>: null}

    </div>
  </>
}

export function getServerSideProps(ctx: NextPageContext){
  return {
    props: {
      cookie: ctx.req?.headers.cookie || ''
    }
  }
}

export default Login

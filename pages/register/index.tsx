import * as React from 'react' 
import { useForm } from 'react-hook-form'
import * as axios from 'axios'

export default function Register(){

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async formData => {
    let { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, formData);

    if(!data.error){
      return window.location.href = "/login";
    }
  }
  const password = React.useRef({});

  password.current = watch("password","");

  return <div>
    <div className="max-w-2xl mx-auto mt-10">
      <form action="shadow bg-gray-50" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Full name</label>
          <input 
            type="text"
            className="border w-full border-indigo-600 rounded p-2"
            id="name"
            {...register("name", {required: true})}
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">This field is required</div>}
        </div>
        <div className="mt-5">
          <label htmlFor="name">Email</label>
          <input 
            type="email"
            className="border w-full border-indigo-600 rounded p-2"
            id="name"
            {...register("email", {
              required: true, 
            })}
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">This field is required</div>}
        </div>
        <div className="mt-5">
          <label htmlFor="name">Password</label>
          <input 
            type="password"
            className="border w-full border-indigo-600 rounded p-2"
            id="name"
            {...register("password", {
              required: true
            })}
          />
          {errors.password && <div className="text-red-600 text-sm mt-1">This field is required</div>}
        </div>
        <div className="mt-5">
          <label htmlFor="name">Password Confirmation</label>
          <input 
            type="password"
            className="border w-full border-indigo-600 rounded p-2"
            id="name"
            {...register("password_confirmation", {
              validate: value => {
                return value === password.current
              }
            })}
          />
          {errors.password_confirmation && <div className="text-red-600 text-sm mt-1">Password confirmation must match password</div>}

        </div>

        <div className="mt-5">
          <button className="w-full bg-indigo-600 p-2 rounded text-white ">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
}

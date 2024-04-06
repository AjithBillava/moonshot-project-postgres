import Link from 'next/link'
import React from 'react'
import FormInput from '~/components/formInput'



const LoginPage = () => {
  return (
    <div className='flex justify-center  ' >
    <form method='post' className='flex  items-center  flex-col w-[36rem]  border rounded-[20px] border-[#C1C1C1] mt-10 px-[3.75rem] py-10' >
      <h1 className='text-3xl font-semibold ' >Login</h1>

      <h2 className='text-2xl mt-8 font-medium'>Welcome back to ECOMMERCE</h2>
      <h4 className='mb-6'>The next gen business marketplace</h4>

      <div className='flex flex-col gap-6'>
      

      <FormInput label='Email' name='email' type='email' />
      
      <FormInput label='Password' name='password'  type='password' />

      <button className="flex justify-center items-center bg-black text-white h-12 mt-4 rounded-md tracking-wide" >LOGIN</button>
      </div>
      
      <p className='mt-8 pt-6 border-t-2 justify-center w-full text-[#333333] text-sm flex gap-2'>
        Don&apos;t have an Account? 
        <Link href={'/registration'} className='tracking-wider font-medium'>SIGN UP</Link>
      </p>

        
        {/* <label htmlFor='name'>Name</label>
        <input className='h-12 px-3.5 py-3' placeholder='Enter' type='text' name='name'/> */}
      {/* </div> */}
      
    </form>
  </div>
  )
}

export default LoginPage
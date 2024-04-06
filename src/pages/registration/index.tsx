import Link from 'next/link'
import React from 'react'
import FormInput from '~/components/formInput'





function RegistrationPage() {
  return (
    <div className='flex justify-center h-[43rem] ' >
      <form method='post' className='flex  items-center  flex-col w-[36rem]  border rounded-[20px] border-[#C1C1C1] mt-10 px-[3.75rem] py-10' >
        <h1 className='text-3xl font-semibold pb-4' >Create your account</h1>

        <div className='flex flex-col gap-6'>
        <FormInput label='Name' name='name'  type='text' />
        

        <FormInput label='Email' name='email' type='email' />
        
        <FormInput label='Password' name='paswword' type='password' />

        <button className="flex justify-center items-center bg-black text-white h-12 rounded-md tracking-wide" >CREATE ACCOUNT</button>
        </div>
        
        <p className='mt-12 text-[#333333] text-sm flex gap-2'>
          Have an Account? 
          <Link href={'/login'} className='tracking-wider font-medium'>LOGIN</Link>
        </p>

          
          {/* <label htmlFor='name'>Name</label>
          <input className='h-12 px-3.5 py-3' placeholder='Enter' type='text' name='name'/> */}
        {/* </div> */}
        
      </form>
    </div>
  )
}

export default RegistrationPage
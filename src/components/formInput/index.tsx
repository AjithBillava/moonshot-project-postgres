import { usePathname } from "next/navigation";
import React, { useState,type MouseEvent } from "react";

type FormInputTextboxType = {
  label: string;
  name:string;
  value?: string | number;
  type: string;
};

const FormInputTextbox = ({ label, name, value, type }: FormInputTextboxType): React.JSX.Element => {

    const [show,setShow] = useState(false)
    const pathName = usePathname()
    const isLoginPage = pathName.includes('login')
    console.log("🚀 ~ FormInputTextbox ~ pathName:", pathName)

    const handleShowClick = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setShow(!show)
    }

  return (
    <div className="flex  w-[456px]  flex-col">
      <label className='py-1' htmlFor={name}>{label}</label>
      <div className="relative">
      <input
        className="h-12 px-3.5 py-3 border  w-full rounded-md border-[#C1C1C1]"
        placeholder="Enter"
        type={show?'text':type}
        id={name}
        name={name}
        value={value}
      />
      {type==='password' && isLoginPage &&<button onClick={handleShowClick} className="absolute inset-y-0 right-0 pr-3.5 underline decoration-1 font-normal ">Show</button>}
      </div>
    </div>
  );
};

export default FormInputTextbox;

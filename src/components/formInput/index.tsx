import { usePathname } from "next/navigation";
import React, { KeyboardEvent, useState,type MouseEvent } from "react";

type FormInputTextboxType = {
  label: string;
  name:string;
  value?: string | number;
  type: string;
  setValue:React.Dispatch<React.SetStateAction<string>>
};

const FormInputTextbox = ({ label, name, value, type, setValue }: FormInputTextboxType): React.JSX.Element => {

    const [show,setShow] = useState(false)
    const pathName = usePathname()
    const isLoginPage = pathName.includes('login')
    console.log("🚀 ~ FormInputTextbox ~ isLoginPage:", isLoginPage)

    const handleShowClick = (e:MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setShow(!show)
    }
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setValue(e.target.value)
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
        onChange={(e)=>handleInputChange(e)}
        value={value}
      />
      {type==='password' && isLoginPage &&<button onClick={handleShowClick} className="absolute inset-y-0 right-0 pr-3.5 underline decoration-1 font-normal ">Show</button>}
      </div>
    </div>
  );
};

export default FormInputTextbox;

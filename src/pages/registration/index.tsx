import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, type MouseEvent } from "react";
import FormInputTextbox from "~/components/formInput";
import { api } from "~/utils/api";
import { AppContext } from "../AppContext";

function RegistrationPage() {
  const userRoute = api.user.createUser.useMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {setUser} = useContext(AppContext)


  useEffect(() => {
    const { data } = userRoute;
    if (data?.token) {
      setUser(data.user)
      localStorage.setItem("token", data?.token);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push("/categories");
      return;
    }
  }, [userRoute, router]);

  const handleRegistrationSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    userRoute.mutate({name:name,email:email,password:password})
  };
  // const handleOnchange()

  return (
    <div className="flex h-[43rem] justify-center ">
      <form
        method="post"
        className="mt-10  flex  w-[36rem] flex-col  items-center rounded-[20px] border border-[#C1C1C1] px-[3.75rem] py-10"
      >
        <h1 className="pb-4 text-3xl font-semibold">Create your account</h1>

        <div className="flex flex-col gap-6">
          <FormInputTextbox
            setValue={setName}
            label="Name"
            name="name"
            value={name}
            type="text"
          />

          <FormInputTextbox
            label="Email"
            name="email"
            setValue={setEmail}
            value={email}
            type="email"
          />

          <FormInputTextbox
            label="Password"
            name="password"
            setValue={setPassword}
            value={password}
            type="password"
          />

          <button
            type="submit"
            className="flex h-12 items-center justify-center rounded-md bg-black tracking-wide text-white"
            onClick={(e)=>handleRegistrationSubmit(e)}
          >
            CREATE ACCOUNT
          </button>
        </div>

        <p className="mt-12 flex gap-2 text-sm text-[#333333]">
          Have an Account?
          <Link href={"/login"} className="font-medium tracking-wider">
            LOGIN
          </Link>
        </p>

        {/* <label htmlFor='name'>Name</label>
          <input className='h-12 px-3.5 py-3' placeholder='Enter' type='text' name='name'/> */}
        {/* </div> */}
      </form>
    </div>
  );
}

export default RegistrationPage;

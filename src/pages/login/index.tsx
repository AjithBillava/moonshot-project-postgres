import Link from "next/link";
import { useRouter } from "next/router";
import React, { type MouseEvent, useContext, useEffect, useState } from "react";
import FormInput from "~/components/formInput";
import { api } from "~/utils/api";
import { AppContext, type userType } from "../AppContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userRoute = api.user.loginUser.useMutation();
  const router = useRouter();
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    const { data } = userRoute;
    if (userRoute.isError) {
      setError(userRoute?.error?.message)
    }

    if (data?.token) {
      setUser(data.user as unknown as userType);
      localStorage.setItem("token", data?.token); 
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push("/categories");

      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoute, router]);

  const handleLoginSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    userRoute.mutate({ email, password });

  };

  return (
    <div className="flex justify-center  ">
      <form
        method="post"
        className="mt-10  flex  w-[36rem] flex-col  items-center rounded-[20px] border border-[#C1C1C1] px-[3.75rem] py-10"
      >
        <h1 className="text-3xl font-semibold ">Login</h1>

        <h2 className="mt-8 text-2xl font-medium">Welcome back to ECOMMERCE</h2>
        <h4 className="mb-6">The next gen business marketplace</h4>

        <div className="flex flex-col gap-6">
          <FormInput
            label="Email"
            name="email"
            value={email}
            setValue={setEmail}
            type="email"
          />

          <FormInput
            label="Password"
            name="password"
            value={password}
            setValue={setPassword}
            type="password"
          />

          <button
            onClick={(e) => handleLoginSubmit(e)}
            className="mt-4 flex h-12 items-center justify-center rounded-md bg-black tracking-wide text-white"
          >
            LOGIN
          </button>
          <div className="h-8">
          {error && <p className=" text-center text-red-400 ">{error}</p>}
          </div>

        </div>

        <p className=" flex w-full justify-center gap-2 border-t-2 pt-6 text-sm text-[#333333]">
          Don&apos;t have an Account?
          <Link href={"/registration"} className="font-medium tracking-wider">
            SIGN UP
          </Link>
        </p>

      </form>
    </div>
  );
};

export default LoginPage;

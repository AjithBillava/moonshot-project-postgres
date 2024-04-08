import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, type MouseEvent } from "react";
import FormInputTextbox from "~/components/formInput";
import { api } from "~/utils/api";
import { AppContext, type userType } from "../AppContext";

function RegistrationPage() {
  const userRoute = api.user.createUser.useMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    const { data } = userRoute;
    console.log("🚀 ~ useEffect ~ userRoute:");

    if (password.length > 8 && name.length !== 0) {
      if (userRoute.isError) {
        !error && setError(userRoute?.error?.message);
      }
      if (data?.token) {
        setUser(data.user as unknown as userType);
        localStorage.setItem("token", data?.token);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push("/categories");
        return;
      }
    }
    // }
  }, [userRoute, router, password, name]);

  const handleRegistrationSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Name length be minimum of 1");
    } else if (password.length < 8) {
      setError("Password length be minimum of 8");
    } else {
      setError("");
      userRoute.mutate({ name: name, email: email, password: password });
    }
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
            onClick={(e) => handleRegistrationSubmit(e)}
          >
            CREATE ACCOUNT
          </button>
        </div>
        <div className="h-8 mt-4">
          {error && <p className=" text-center text-red-400 ">{error}</p>}
        </div>

        <p className="mt-12 flex gap-2 text-sm text-[#333333]">
          Have an Account?
          <Link href={"/login"} className="font-medium tracking-wider">
            LOGIN
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationPage;

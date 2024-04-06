import React, { useState } from "react";
import OtpInput from "react-otp-input";

function EmailVerifcationPage() {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex justify-center  ">
      <form method='post' className="mt-10  flex  w-[36rem] flex-col  items-center rounded-[20px] border border-[#C1C1C1] px-[3.75rem] py-10">
        <h1 className="text-3xl font-semibold ">Verify your email</h1>

        <h2 className="mt-8 text-2xl font-medium">Welcome back to ECOMMERCE</h2>
        <h4 className="flex justify-center">
          Enter the 8 digit code you have received on
        </h4>
        <h4 className="mb-6  flex justify-center">swa***@gmail.com</h4>

        <div className="flex flex-col gap-6">
          <div className="flex   flex-col">
          <label htmlFor="otp" >Code</label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            renderSeparator={<span style={{ width: "12px" }}></span>}
            shouldAutoFocus={true}
            inputStyle={{
              border: "1px solid #C1C1C1",
              borderRadius: "6px",
              width: "48px",
              height: "48px",
              fontSize: "12px",
              fontWeight: "400",
              caretColor: "blue",
            }}
            inputType='number'
            renderInput={(props) => <input name="otp" {...props} />}
          />
          </div>

          <button className="mt-4 flex h-12 items-center justify-center rounded-md bg-black tracking-wide text-white">
            VERIFY
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailVerifcationPage;

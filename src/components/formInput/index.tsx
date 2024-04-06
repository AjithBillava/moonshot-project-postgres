import React from "react";

type formInputType = {
  label: string;
  value?: string | number;
  type: string;
};

const FormInput = ({ label, value, type }: formInputType): React.JSX.Element => {
  return (
    <div className="flex  w-[456px]  flex-col">
      <label htmlFor="name">{label}</label>
      <input
        className="h-12 px-3.5 py-3 border rounded-md border-[#C1C1C1]"
        placeholder="Enter"
        type={type}
        name="name"
        value={value}
      />
    </div>
  );
};

export default FormInput;

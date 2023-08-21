import { HTMLAttributes, InputHTMLAttributes } from "react";

export function Input(p: InputHTMLAttributes<HTMLInputElement>) {
  const { ...props } = p;
  return <input maxLength={32} className="input input-bordered w-full max-w-md" type="text" {...props} />;
}

export function LableInput(p: { lable: string } & InputHTMLAttributes<HTMLInputElement>) {
  const { lable, ...props } = p;
  return (
    <div className="w-full flex flex-col gap-2.5 text-base">
      <div>{lable}:</div>
      <Input {...props} />
    </div>
  );
}

export function LableInfo(p: { lable: string; value: string }) {
  const { lable, value } = p;
  return (
    <div className="w-full flex flex-col gap-2.5 text-base">
      <div className="text-black">{lable}:</div>
      <div className="text-stone-500 break-words">{value}</div>
    </div>
  );
}

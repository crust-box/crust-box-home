
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { Input } from "./input";
import { login } from "@/http/api";
import { useLogined } from "@/hooks/useLogined";
import { withRootLoading } from "./loading";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isValidName = !!name && name.length >= 4 && name.length <= 32;
  const isValidPassword = !!password && password.length >= 6 && password.length <= 16;
  const disabledLogin = !isValidName || !isValidPassword;
  const { setLogined } = useLogined();
  
  const onLogin = () => {
    if (disabledLogin) return;
    withRootLoading(() => login(name, password))
      .then((logined) => setLogined(logined))
      .catch(console.error)
  };
  return (
    <div className="max-w-sm w-full flex flex-col gap-5 items-center p-5 mt-[20vmin]">
      <CiUser className="text-9xl mb-2.5" />
      <Input maxLength={32} value={name} onChange={(e) => setName(e.target.value)} placeholder="商家账户" />
      <Input maxLength={16} value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-full max-w-md" disabled={disabledLogin} onClick={onLogin}>
        登录
      </button>
    </div>
  );
}

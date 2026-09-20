import { Mail, Lock, LogIn } from "lucide-react";
import { AuthInput } from "../components/AuthInput";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, password });
  }

  return (
    <div className="flex items-center justify-center bg-stone-100 px-4 min-h-screen ">
      <div className="flex flex-col min-w-sm py-8 px-4 items-center justify-center bg-white rounded-3xl shadow-md">
        <div className="flex flex-col gap-2 items-center justify-center mb-10">
          <LogIn className="h-6 w-6 text-violet-500" />
          <p className="text-stone-600 text-xl font-bold ">Welcome!</p>
          <p className="text-sm leading-none text-zinc-400">
            Sign in to your account!
          </p>
        </div>

        <form
          className="flex flex-col gap-2 w-full px-4"
          onSubmit={handleSubmit}
        >
          <AuthInput
            label="E-mail"
            type="email"
            icon={Mail}
            value={email}
            onChange={setEmail}
          />
          <AuthInput
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={setPassword}
          />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center leading-none gap-1.5  text-stone-400 text-sm">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 accent-violet-500"
              />
              remember me?
            </label>

            <button
              type="button"
              className="text-sm leading-none text-violet-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button className="bg-violet-500 px-8 py-2 w-max rounded-3xl text-white font-semibold hover:bg-violet-600 transition-colors">
            Login
          </button>
          <p className="text-sm text-stone-400 mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-violet-500 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

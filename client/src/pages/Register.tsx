import { User, Lock, Mail } from "lucide-react";
import { AuthInput } from "../components/AuthInput";
import { useState } from "react";

export function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log({name, email, password});
    }

    return (
        <div className="flex items-center justify-center bg-stone-100 px-4 min-h-screen ">
            <div className="flex flex-col min-w-sm py-8 px-4 items-center justify-center bg-white rounded-3xl shadow-md">
                <div className="flex flex-col gap-2 items-center justify-center mb-10">
                    <User className="h-6 w-6 text-violet-500" />
                    <span className="text-stone-600 text-xl font-bold ">
                        Create account!
                    </span>
                </div>

                <form className="flex flex-col gap-2 w-full px-4" onSubmit={handleSubmit}>
                    <AuthInput label="Name" type="text"  icon={User} value={name} onChange={setName} />
                    <AuthInput label="E-mail" type="email" icon={Mail} value={email} onChange={setEmail} />
                    <AuthInput label="Password" type="password" icon={Lock} value={password} onChange={setPassword} />
                    <button className="bg-violet-500 px-8 py-2 w-max rounded-3xl text-white font-semibold hover:bg-violet-600 transition-colors">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}
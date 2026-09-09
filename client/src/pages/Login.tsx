
export function Login() {
    return (
        <div className="flex items-center justify-center bg-stone-100 px-4 min-h-screen ">
            <div className="flex flex-col min-w-sm py-8 px-4 items-center justify-center bg-white rounded-sm shadow-md">
                <div className="flex flex-col gap-2 items-center justify-center mb-10">
                    <img src="/images/login.png" alt="login icon" className="w-8 h-8"/>
                    <p className="text-stone-600 text-xl font-bold ">
                        Welcome!
                    </p>
                    <p className="text-sm leading-none text-zinc-400">
                        Sign in to your account!
                    </p>
                </div>

                <form className="flex flex-col gap-2 w-full px-4">
                    <div className="relative mb-6">
                        <label className="text-semibold mb-1 block text-sm text-stone-400">Name</label>
                        <input
                            type="text"
                            className="w-full border-b border-stone-400 bg-transparent pb-2 pr-8 text-sm text-stone-100 outline-none focus:border-lime-400"
                        />
                        {/* <UserIcon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" /> */}
                    </div>
                    <div className="relative mb-6">
                        <label className="text-semibold mb-1 block text-sm text-stone-400">E-mail</label>
                        <input
                            type="text"
                            className="w-full border-b border-stone-400 bg-transparent pb-2 pr-8 text-sm text-stone-100 outline-none focus:border-lime-400"
                        />
                        {/* <UserIcon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" /> */}
                    </div>
                    <div className="relative mb-2">
                        <label className="text-semibold mb-1 block text-sm text-stone-400">Password</label>
                        <input
                            type="text"
                            className="w-full border-b border-stone-400 bg-transparent pb-2 pr-8 text-sm text-stone-100 outline-none focus:border-lime-400"
                        />
                        {/* <UserIcon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" /> */}
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm leading-none text-zinc-400">
                            remember me?
                        </div>
                        <div className="text-sm leading-none">
                            forgot password?
                        </div>
                    </div>

                    <button className="bg-lime-500 px-8 py-2 w-max rounded-sm text-white font-semibold hover:bg-lime-600 transition-colors">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export function Register() {
    return (
        <div className="flex items-center justify-center bg-stone-100 px-4 min-h-screen ">
            <div className="flex flex-col min-w-xs py-6 items-center justify-center bg-white shadow-md">
                <img src="" alt="user icon" />
                <span className="text-stone-600 text-xl font-bold mb-4">
                    Create account!
                </span>

                <form className="flex flex-col gap-2 w-full px-4">
                    <div className="relative mb-6">
                        <label className="text-semibold mb-1 block text-xs text-stone-400">Name</label>
                        <input
                            type="text"
                            className="w-full border-b border-stone-700 bg-transparent pb-2 pr-8 text-sm text-stone-100 outline-none focus:border-lime-400"
                        />
                        {/* <UserIcon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" /> */}
                    </div>
                    <div className="relative mb-6">
                        <label className="text-semibold mb-1 block text-xs text-stone-400">E-mail</label>
                        <input
                            type="text"
                            className="w-full border-b border-stone-700 bg-transparent pb-2 pr-8 text-sm text-stone-100 outline-none focus:border-lime-400"
                        />
                        {/* <UserIcon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" /> */}
                    </div>
                    <div className="relative mb-6">
                        <label className="text-semibold mb-1 block text-xs text-stone-400">Password</label>
                        <input
                            type="text"
                            className="w-full border-b border-stone-700 bg-transparent pb-2 pr-8 text-sm text-stone-100 outline-none focus:border-lime-400"
                        />
                        {/* <UserIcon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" /> */}
                    </div>

                    <button className="bg-lime-500 px-6 py-2 w-max rounded-sm text-white font-semibold hover:bg-lime-600 transition-colors">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}
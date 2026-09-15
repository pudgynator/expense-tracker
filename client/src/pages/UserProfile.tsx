import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleUserRound, Mail, User, Camera } from 'lucide-react';

export function UserProfile() {
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@example.com');

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, email });
  }

  return (
    <div className="flex flex-col px-6 py-4 gap-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-stone-800 font-bold text-2xl">Your profile</h1>
          <p className="text-stone-400 leading-none text-sm">
            Manage your personal information
          </p>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-2 border p-2 border-stone-300 rounded-full text-sm leading-none text-stone-800"
        >
          <CircleUserRound className="w-8 h-8 rounded-full" />
          <span className="text-stone-800 font-medium text-sm">{name}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-stone-300">
          <div className="relative">
            <CircleUserRound className="w-24 h-24 text-stone-400" />
            <button
              type="button"
              className="absolute bottom-0 right-0 rounded-full p-2 border border-stone-300 bg-white hover:bg-violet-50 transition-colors"
              aria-label="Change photo"
            >
              <Camera className="w-4 h-4 text-violet-500" />
            </button>
          </div>
          <div className="text-center">
            <p className="text-stone-800 text-lg font-bold">{name}</p>
            <p className="text-stone-400 text-sm">{email}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-6 rounded-3xl border border-stone-300 lg:col-span-2"
        >
          <p className="text-stone-800 text-sm font-bold">Account details</p>
          <div className="relative">
            <label className="mb-1 block text-sm font-semibold text-stone-400">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-stone-400 bg-transparent pb-2 pr-8 text-sm text-stone-900 outline-none focus:border-violet-400"
            />
            <User className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" />
          </div>

          <div className="relative">
            <label className="mb-1 block text-sm font-semibold text-stone-400">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-stone-400 bg-transparent pb-2 pr-8 text-sm text-stone-900 outline-none focus:border-violet-400"
            />
            <Mail className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" />
          </div>

          <button
            type="submit"
            className="bg-violet-500 px-8 py-2 w-max rounded-3xl text-white font-semibold hover:bg-violet-600 transition-colors"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

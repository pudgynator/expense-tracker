
type AuthInputProps = {
    label: string;
    type: string;
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    onChange: (value: string) => void;
}

export function AuthInput({ label, type, icon: Icon, value, onChange }: AuthInputProps) {
    return (
        <div className="relative mb-6">
            <label className="mb-1 block text-sm font-semibold text-stone-400">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border-b border-stone-400 bg-transparent pb-2 pr-8 text-sm text-stone-800 outline-none focus:border-lime-400"
            />
            <Icon className="absolute right-0 bottom-2 h-4 w-4 text-stone-500" />
        </div>
    )
}
import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    icon,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `flex items-center px-6 py-3 transition-colors duration-200 ` +
                (active
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white')
            }
        >
            {icon && <span className="mr-3">{icon}</span>}
            {children}
        </Link>
    );
}
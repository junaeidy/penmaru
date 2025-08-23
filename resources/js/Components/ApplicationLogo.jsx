import { usePage } from "@inertiajs/react";

export default function ApplicationLogo({ className = "h-12 w-auto" }) {
    const { props } = usePage();
    const logo = props.app?.logo;

    return (
        <img
            src={logo ? `/storage/${logo}` : "/logo.png"}
            alt="Logo"
            className={className}
        />
    );
}

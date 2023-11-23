'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
    const router = useRouter();
    useEffect(() => {
        // redirect to auth/login
        router.push("/auth/login");
    }, [router]);
    return (
        <h6>Logout User</h6>
    );
}

export default LogoutPage;
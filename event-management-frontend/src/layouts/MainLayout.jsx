import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import AIChat from "../components/AIChat/AIChat";

export default function MainLayout() {
    return (
        <>
            <Navbar />

            <main className="container py-4">
                <Outlet />
            </main>

            <AIChat />
        </>
    );
}
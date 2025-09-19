"use client";

import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container mx-auto px-1 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <h1 className="text-lg font-bold text-foreground">Rehearsal Planner</h1>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

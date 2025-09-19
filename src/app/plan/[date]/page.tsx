import { notFound } from "next/navigation";
import { Header } from "@/components/header";

interface PlanPageProps {
    params: Promise<{
        date: string;
    }>;
}

export default async function PlanPage({ params }: PlanPageProps) {
    const { date } = await params;

    // Validate date format (MM-DD-YYYY)
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(date)) {
        notFound();
    }

    // Parse the date to validate it's a real date
    const [month, day, year] = date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    // Check if the date is valid
    if (selectedDate.getMonth() !== month - 1 || selectedDate.getDate() !== day || selectedDate.getFullYear() !== year) {
        notFound();
    }

    // Format the date for display
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-4">
                        Rehearsal Planning
                    </h1>
                    <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                            Selected Date
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {formattedDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

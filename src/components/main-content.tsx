"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";

export function MainContent() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const router = useRouter();

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleStartPlanning = () => {
        if (selectedDate) {
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const year = selectedDate.getFullYear();
            const dateString = `${month}-${day}-${year}`;
            router.push(`/plan/${dateString}`);
        }
    };

    const handleStartRehearsal = () => {
        if (selectedDate) {
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const year = selectedDate.getFullYear();
            const dateString = `${month}-${day}-${year}`;
            router.push(`/start/${dateString}`);
        }
    };

    const formatSelectedDate = (date: Date | undefined) => {
        if (!date) return "No date selected";
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <main className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4">
            <div className="max-w-4xl w-full">
                {/* Calendar Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar Card */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5" />
                                Select Rehearsal Date
                            </CardTitle>
                            <CardDescription>
                                Choose the date for your rehearsal to get started with planning.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                className="rounded-xl border"
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </CardContent>
                    </Card>

                    {/* Selected Date Info */}
                    <Card className="shadow-lg flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClockIcon className="h-5 w-5" />
                                Selected Date
                            </CardTitle>
                            <CardDescription>
                                Your chosen rehearsal date and next steps.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-1 flex flex-col justify-center">
                            <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground mb-1">Selected Date:</p>
                                <p className="text-lg font-semibold text-foreground">
                                    {formatSelectedDate(selectedDate)}
                                </p>
                            </div>

                            {selectedDate && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <UsersIcon className="h-4 w-4" />
                                        <span>Ready to plan your rehearsal schedule</span>
                                    </div>
                                    <Button className="w-full" size="lg" onClick={handleStartPlanning}>
                                        Start Planning Rehearsal
                                    </Button>
                                    <Button className="w-full" size="lg" variant="outline" onClick={handleStartRehearsal}>
                                        Start Rehearsal
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}

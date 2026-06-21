import AppLayout from "@/components/layout/AppLayout";

export default function DashboardPage() {
    return (
        <AppLayout>
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to Hi Mentor
                </p>
            </div>
        </AppLayout>
    );
}
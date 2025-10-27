import { useGetStatsQuery } from '../features/dashboard/dashboardApi';

export function DashboardPage() {
    const { data: stats, isLoading } = useGetStatsQuery();

    if (isLoading) return <p>Loading dashboard...</p>;
    if (!stats) return <p>No Stats</p>;
    return (
        <div>
            <p>Total Users: {stats.totalUsers}</p>
            <p>Total Teams: {stats.totalTeams}</p>
            <p>Tasks Completed: {stats.tasksCompleted}</p>
        </div>
    );
}

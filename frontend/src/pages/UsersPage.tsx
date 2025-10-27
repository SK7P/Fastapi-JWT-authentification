import { useGetUsersQuery, useDeleteUserMutation } from '../features/users/usersApi';

export function UsersPage() {
    const { data: users, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    if (isLoading) return <p>Loading users...</p>;

    return (
        <ul>
            {users?.map(u => (
                <li key={u.id}>
                    {u.name} ({u.email})
                    <button onClick={() => deleteUser(u.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

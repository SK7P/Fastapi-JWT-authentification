import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

export function Header() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return (
        <header style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
            {isAuthenticated && <button onClick={() => dispatch(logout())}>Logout</button>}
        </header>
    );
}

import { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({ email, password }); // trigger login mutation
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

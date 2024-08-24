import { useState } from 'react';
import Image from 'next/image';

export default function Register() {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, nickname, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setSuccess(true);
        } else {
            setError(data.message);
        }
    };

    return (
        <>
        <div className="min-h-screen flex flex-col">
            {/* 상단 네비게이션 바 */}
            <nav className="flex items-center p-4 bg-gray-100">
                <Image 
                    src="/images/logo-lg.png" 
                    alt="Logo" 
                    width={40} // Specify the width of the image
                    height={40} // Specify the height of the image
                    className="h-10 mr-3" 
                />
                <h2 className="text-xl font-semibold">My Application</h2>
            </nav>
        </div>
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Registration successful!</p>}
        </div>
        </>
    );
}

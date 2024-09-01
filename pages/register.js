import { useState } from 'react';
import Image from 'next/image';
import logo from '/images/logo-lg.png';
import logoo from '/images/logo.png';

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
            <nav className="flex items-center p-4 bg-gray-100">
                <Image 
                    src={logo}
                    alt="Logo" 
                    width={172}
                    height={30}
                    className="ml-[150px]" 
                />
                <p className="ml-[1000px] cursor-pointer">로그인</p>
                <p className="ml-[30px] cursor-pointer">회원가입</p>
            </nav>

        </div>


        
        <div className="text-center justify-center mb-[300px] lg:w-[1920]x] lg:h-[200px]">
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

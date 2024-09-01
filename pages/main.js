import navlogo from '/images/logo-lg.png';
import largelogo from '../images/logo2.png';
import main from '../images/main.png';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Main = () => {
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const storedNickname = localStorage.getItem('nickname');
        if (storedNickname) {
            setNickname(storedNickname);
        }
    }, []);

    return (
        <>
            <div className="flex flex-col w-[1920px] h-[70px]">
                <nav className="flex items-center p-4 bg-[#FAFBFC] border-b border-gray-300">
                    <Image
                        src={navlogo}
                        alt="Logo"
                        width={172}
                        height={30}
                        className="ml-[150px]"
                    />
                    <Link href="/">
                        <p className="ml-[1000px] cursor-pointer">로그인</p>
                    </Link>
                    <Link href="/signup">
                        <p className="ml-[30px] cursor-pointer">{nickname}</p>
                    </Link>
                </nav>
            </div>
            <div>
                <Image
                    src={main}
                    alt="Logo"
                    width={1920}
                    height={550}
                    className=""
                />
            </div>
        </>
    );
};

export default Main;

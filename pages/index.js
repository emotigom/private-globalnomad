import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import navlogo from '/images/logo-lg.png';
import largelogo from '../images/logo2.png';
import logoo from '/images/logo.png';
import visible from '../images/visible.svg';
import invisible from '../images/invisible.svg';
import SimpleModal from '../components/SimpleModal';
import google from '../images/google.png';
import kakao from '../images/kakao.png';

export default function Register() {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({ password: false });
    const [success, setSuccess] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const onBlur = (e) => {
        const { name, value } = e.target;
    
        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(
                !emailPattern.test(value) ? '이메일 형식으로 작성해 주세요.' : '',
            );
            }
        
            if (name === 'password') {
            setPasswordError(value.length < 8 ? '8자 이상 입력해 주세요.' : '');
            }
        };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility({
            ...passwordVisibility,
            [field]: !passwordVisibility[field],
        });
    };

    const isFormValid = email && password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isFormValid) {
            setEmailError('이메일과 비밀번호를 확인해 주세요.');
            return;
        }
    
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await res.json();
            console.log('서버 응답:', data);
    
            if (res.ok) {
                setSuccess(true);
                setModalMessage('로그인이 완료되었습니다.');
                setIsModalOpen(true);
                localStorage.setItem('nickname', nickname);
            } else {
                setEmailError(data.message || '비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            setEmailError('로그인 중 오류가 발생했습니다.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
            if (success) {
        window.location.href = '/main';
            }
    };

    return (
        <>
            <div className="flex flex-col w-[1920px] h-[70px]">
                <nav className="flex items-center p-4 bg-[FAFBFC] border-b border-gray-300">
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
                        <p className="ml-[30px] cursor-pointer">회원가입</p>
                    </Link>
                </nav>
            </div>
            <div className="text-center justify-center w-[640px] h-[1019px] mx-auto my-[38px]">
                <Image src={largelogo}
                        alt="Logo" 
                        width={340}
                        height={192}
                        className="ml-[150px] mb-[56px]"
                />
                <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[20px] px-[12px]">
                    <div className="flex flex-col gap-[16px]">
                        <div className="text-left flex flex-col gap-[8px] pb-[28px]">
                            <div>이메일</div>
                            <input
                                name="email"
                                value={email}
                                onBlur={onBlur}
                                onChange={onChangeEmail}
                                className={`px-[22px] py-[15px]  border-[1px] border-[#A4A1AA] rounded-[6px] ${emailError ? 'errorInput' : 'input'}`}
                                placeholder="이메일을 입력해 주세요"
                                type="email"
                                autoComplete="email"
                            />
                            {emailError && <div className="text-[14px] text-[red]">{emailError}</div>}
                        </div>
                        <div className="text-left relative flex flex-col gap-[8px] pb-[28px]">
                            <div>비밀번호</div>
                            <input
                                id="pw"
                                name="password"
                                value={password}
                                onBlur={onBlur}
                                onChange={onChangePassword}
                                className={`px-[22px] py-[15px] border-[1px] border-[#A4A1AA] rounded-[6px] ${passwordError ? 'errorInput' : 'input'}`}
                                placeholder="비밀번호를 입력해주세요"
                                type={passwordVisibility.password ? 'text' : 'password'}
                                autoComplete="password"
                            />
                            {passwordError && (
                                <div className="text-[14px] text-[red]">{passwordError}</div>
                            )}
                            <div
                                className="absolute right-[15px] top-[45px] cursor-pointer"
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                <Image
                                    src={passwordVisibility.password ? visible : invisible}
                                    alt={passwordVisibility.password ? 'visible' : 'invisible'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-col gap-[24px] flex-[center]">
                            <button
                                type="submit"
                                className={isFormValid ?
                                    'w-full h-[48px] rounded-[6px] text-lg font-medium leading-[22px] text-white bg-[#0B3B2D] rounded-lg;'
                                    :
                                    'w-full h-[48px] rounded-[6px] text-lg font-medium leading-[22px] text-white bg-[#9FA6B2] rounded-lg;'}
                                disabled={!isFormValid}
                            >

                                로그인 하기
                            </button>
                        <div className="mt-[32px] mb-[48px]">
                            회원이 아니신가요?{' '}
                            <Link className="text-violet-20 underline text-[#0B3B2D]" href="/signup">
                                회원가입하기
                            </Link>
                        </div>
                        <div class="flex items-center">
                            <div class="flex-grow h-px bg-[#DDDDDD] mr-[37.5px]"></div>
                            SNS 계정으로 로그인하기
                            <div class="flex-grow h-px bg-[#DDDDDD] ml-[37.5px]"></div>
                        </div>
                    </div>
                    <div className="flex flex-row w-[160px] h-[72px] m-auto mt-[20px]">
                <Image
                src={google}
                alt="google-logo"
                width={72}
                height={72}
                className="mr-[16px] cursor-pointer"
                />
                <Image
                src={kakao}
                alt="kakao-logo"
                width={72}
                height={72}
                className="cursor-pointer"
                />
            </div>
                    {modalMessage && (
                        <SimpleModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        >
                            <div className="">{modalMessage}</div>
                            <button
                                onClick={closeModal}
                                className="absolute bottom-[28px] right-[28px] w-[120px] h-[48px] bg-[#0B3B2D] text-[#FFFFFF] rounded-[8px]"
                            >
                                확인
                            </button>
                        </SimpleModal>
                    )}
                </form>
                
            </div>

        </>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FocusEvent, useState } from 'react';
import SimpleModal from './SimpleModal';
import invisible from '@/images/ic-invisible.svg';
import visible from '@/images/ic-visible.svg';

    const Login = () => {
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
        });
        const [input, setInput] = useState({
        email: '',
        password: '',
        });
        const router = useRouter();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [modalMessage, setModalMessage] = useState('');
    
        const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
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
        const togglePasswordVisibility = () => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
        };
    
        const isFormValid =
        !emailError &&
        !passwordError &&
        Boolean(input.email) &&
        Boolean(input.password);
    
        const handleSubmit = async () => {
        e.preventDefault();
        const { email, password } = input;
    
        try {
            const res = await axios.post('auth/login', { email, password });
            const { accessToken } = res.data;
            // 쿠키에 토큰 저장
            // 'accessToken' 쿠키 이름
            // accessToken 쿠키에 저장할 실제 값 서버로부터 받은 액세서 토큰
            // expires 만료 날짜 7= 일주일
            // secure 보안 강화 코드 https 연결에서만 전송
            // sameSite 사이트 간 요청에 어떻게 처리할지 결정
            // Strict 동일한 사이트에서만 전송되도록 처리 CSRF공격 방지 유용
            cookies.set('accessToken', accessToken, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
            });
            router.replace('mydashboard');
            console.log('로그인 성공');
        } catch (error) {
            if (isAxiosError(error)) {
            openModal();
            setModalMessage(error.response?.data.message);
            console.log(error);
            }
        }
        };
    
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
    
        return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-20 px-12">
            <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
                <div>이메일</div>
                <input
                name="email"
                value={input.email}
                onBlur={onBlur}
                onChange={onChange}
                className={`px-16 py-15 ${emailError ? 'errorInput' : 'input'}`}
                placeholder="이메일을 입력해 주세요"
                type="email"
                autoComplete="email"
                />
                {emailError && <div className="text-14 text-red">{emailError}</div>}
            </div>
            <div className="relative flex flex-col gap-8">
                <div>비밀번호</div>
                <input
                id="pw"
                name="password"
                value={input.password}
                onBlur={onBlur}
                onChange={onChange}
                className={`px-16 py-15 ${passwordError ? 'errorInput' : 'input'}`}
                placeholder="8자 이상 입력해 주세요"
                type={passwordVisibility.password ? 'text' : 'password'}
                autoComplete="password"
                />
                {passwordError && (
                <div className="text-14 text-red">{passwordError}</div>
                )}
                <div
                className="absolute right-15 top-45 cursor-pointer"
                onClick={() => togglePasswordVisibility('password')}
                >
                <Image
                    src={passwordVisibility.password ? visible : invisible}
                    alt={passwordVisibility.password ? 'visible' : 'invisible'}
                />
                </div>
            </div>
            </div>
            <div className="flex-col gap-24 flex-center">
            <button
                type="submit"
                className={
                isFormValid ? 'btn_login_large_active' : 'btn_login_large_disabled'
                }
                disabled={!isFormValid}
            >
                로그인
            </button>
            <div>
                회원이 아니신가요?{' '}
                <Link className="text-violet-20 underline" href="/signup">
                회원가입하기
                </Link>
            </div>
            </div>
            {modalMessage && (
            <SimpleModal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <div className="pb-44 sm:pb-24">{modalMessage}</div>
    
                <button
                onClick={closeModal}
                className="absolute bottom-28 btn_modal_small_purple sm:right-28 sm:btn_modal_large_purple"
                >
                확인
                </button>
            </SimpleModal>
            )}
        </form>
        );
    };

export default Login;
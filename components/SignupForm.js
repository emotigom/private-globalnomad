import invisible from '../images/invisible.svg';
import visible from '../images/visible.svg';
import navlogo from '/images/logo-lg.png';
import largelogo from '../images/logo2.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SimpleModal from '../components/SimpleModal';
import google from '../images/google.png';
import kakao from '../images/kakao.png';

const SignupForm = () => {
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkPasswordError, setCheckPasswordError] = useState('');
  const [input, setInput] = useState({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // 성공 여부 추가
  const router = useRouter();

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const CheckToggle = () => {
    setChecked(!checked);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    validateField({ name, value });
  };

  const validateField = ({ name, value }) => {
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        !emailPattern.test(value) ? '이메일 형식으로 작성해 주세요.' : '',
      );
    } else if (name === 'nickname') {
      setNameError(value ? '' : '닉네임을 입력해 주세요.');
    } else if (name === 'password') {
      setPasswordError(value.length > 7 ? '' : '8자 이상 입력해 주세요.');
      if (input.checkPassword) {
        setCheckPasswordError(
          value === input.checkPassword ? '' : '비밀번호가 일치하지 않습니다.',
        );
      }
    } else if (name === 'checkPassword') {
      setCheckPasswordError(
        value === input.password ? '' : '비밀번호가 일치하지 않습니다.',
      );
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    validateField({
      name,
      value,
    });
  };

  const isFormValid =
    !emailError &&
    !nameError &&
    !passwordError &&
    !checkPasswordError &&
    input.email &&
    input.nickname &&
    input.password &&
    input.checkPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, nickname, password } = input;

    // if (!isFormValid) {
    //   setModalMessage('모든 필드를 올바르게 작성해 주세요.');
    //   setIsSuccess(false);
    //   openModal();
    //   return;
    // }

    // try {
    //   const signupResponse = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, nickname, password }),
    //   });

    //   const signupData = await signupResponse.json();
    //   if (!signupResponse.ok) {
    //     throw new Error(signupData.message || '회원가입에 실패했습니다.');
    //   }

    //   const loginResponse = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const loginData = await loginResponse.json();

    //   if (!loginResponse.ok) {
    //     throw new Error(loginData.message || '로그인에 실패했습니다.');
    //   }

    //   const { accessToken } = loginData;

    //   if (accessToken) {
    //     localStorage.setItem('accessToken', accessToken);
    //   }

    //   setModalMessage('가입이 완료되었습니다!');
    //   setIsSuccess(true);
    //   openModal();
    //   console.log('로그인 성공');
    // } catch (error) {
    //   console.error(error);
    //   setModalMessage(error.message || '가입 과정에서 오류가 발생했습니다.');
    //   setIsSuccess(false);
      setIsSuccess(true);
      setModalMessage('가입이 완료되었습니다!');
      openModal();
      localStorage.setItem('nickname', nickname);
    // }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      window.location.href = '/main';
    }
  };

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
            <p className="ml-[30px] cursor-pointer">회원가입</p>
          </Link>
        </nav>
      </div>

      <div className="text-center justify-center w-[640px] h-[1019px] mx-auto my-[38px]">
        <Image
          src={largelogo}
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
                value={input.email}
                onBlur={onBlur}
                onChange={onChange}
                className={`px-[22px] py-[15px] border-[1px] border-[#A4A1AA] rounded-[6px] ${
                  emailError ? 'errorInput' : 'input'
                }`}
                placeholder="이메일을 입력해 주세요"
                type="email"
                autoComplete="email"
              />
              {emailError && <div className="text-[14px] text-red-500">{emailError}</div>}
            </div>

            <div className="text-left relative flex flex-col gap-[8px] pb-[28px]">
              <div>닉네임</div>
              <input
                name="nickname"
                value={input.nickname}
                onBlur={onBlur}
                onChange={onChange}
                className={`px-[22px] py-[15px] border-[1px] border-[#A4A1AA] rounded-[6px] ${
                  nameError ? 'errorInput' : 'input'
                }`}
                placeholder="닉네임을 입력해 주세요"
                type="text"
                autoComplete="username"
              />
              {nameError && <div className="text-[14px] text-red-500">{nameError}</div>}
            </div>

            <div className="text-left relative flex flex-col gap-[8px] pb-[28px]">
              <div>비밀번호</div>
              <input
                id="pw"
                name="password"
                value={input.password}
                onBlur={onBlur}
                onChange={onChange}
                className={`px-[22px] py-[15px] border-[1px] border-[#A4A1AA] rounded-[6px] ${
                  passwordError ? 'errorInput' : 'input'
                }`}
                placeholder="8자 이상 입력해 주세요"
                type={passwordVisibility.password ? 'text' : 'password'}
                autoComplete="new-password"
              />
              {passwordError && (
                <div className="text-[14px] text-red-500">{passwordError}</div>
              )}
              <div
                className="absolute right-[15px] top-[45px] cursor-pointer"
                onClick={() => togglePasswordVisibility('password')}
              >
                <Image
                  src={passwordVisibility.password ? visible : invisible}
                  alt={passwordVisibility.password ? 'visible' : 'invisible'}
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="text-left relative flex flex-col gap-[8px] pb-[28px]">
              <div>비밀번호 확인</div>
              <input
                id="pw-confirm"
                name="checkPassword"
                value={input.checkPassword}
                onBlur={onBlur}
                onChange={onChange}
                className={`px-[22px] py-[15px] border-[1px] border-[#A4A1AA] rounded-[6px] ${
                  checkPasswordError ? 'errorInput' : 'input'
                }`}
                placeholder="비밀번호를 한번 더 입력해 주세요"
                type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
              />
              {checkPasswordError && (
                <div className="text-[14px] text-red-500">{checkPasswordError}</div>
              )}
              <div
                className="absolute right-[15px] top-[45px] cursor-pointer"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                <Image
                  src={passwordVisibility.confirmPassword ? visible : invisible}
                  alt={passwordVisibility.confirmPassword ? 'visible' : 'invisible'}
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>

          <div className="flex-col gap-[24px] flex-[center]">
            <button
              type="submit"
              className={
                isFormValid
                  ? 'w-full h-[48px] rounded-[6px] text-lg font-medium leading-[22px] text-white bg-[#0B3B2D]'
                  : 'w-full h-[48px] rounded-[6px] text-lg font-medium leading-[22px] text-white bg-[#9FA6B2]'
              }
              disabled={!isFormValid}
            >
              회원가입 하기
            </button>
            <div className="mt-[32px] mb-[48px]">
              회원이신가요?{' '}
              <Link className="text-violet-20 underline text-[#0B3B2D]" href="/">
                로그인하기
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex-grow h-px bg-[#DDDDDD] mr-[37.5px]"></div>
              SNS 계정으로 로그인하기
              <div className="flex-grow h-px bg-[#DDDDDD] ml-[37.5px]"></div>
            </div>
            <div className="flex flex-row w-[160px] h-[72px] m-auto mt-[40px]">
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
          </div>
          <div className="mt-[40px]"></div>

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
};

export default SignupForm;

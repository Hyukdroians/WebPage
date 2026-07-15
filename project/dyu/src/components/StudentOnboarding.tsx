import React, { useState } from 'react';
import { ScreenType, Student } from '../types';
import { GraduationCap, User, Lock, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface OnboardingProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  setStudent: (student: Student) => void;
  onLoginSuccess: () => void;
}

export const StudentOnboarding: React.FC<OnboardingProps> = ({
  currentScreen,
  setScreen,
  setStudent,
  onLoginSuccess,
}) => {
  // Join Code State
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');

  // Student Info State
  const [grade, setGrade] = useState('');
  const [classNum, setClassNum] = useState('');
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [infoError, setInfoError] = useState('');

  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleJoinCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim().length === 6) {
      setJoinError('');
      setScreen('student_info');
    } else {
      setJoinError('6자리 가입 코드를 입력해 주세요. (예: 123456)');
    }
  };

  const handleStudentInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade || !classNum || !name.trim()) {
      setInfoError('모든 필드를 올바르게 입력해 주세요.');
      return;
    }
    if (!agree) {
      setInfoError('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setInfoError('');
    const newStudent: Student = {
      name: name.trim(),
      grade,
      classNum,
      id: `${grade}0${classNum}${Math.floor(10 + Math.random() * 89)}`
    };
    setStudent(newStudent);
    onLoginSuccess();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('아이디와 비밀번호를 입력해 주세요.');
      return;
    }
    setLoginError('');
    const mockStudent: Student = {
      name: '김우성',
      grade: '3',
      classNum: '5',
      id: '30507'
    };
    setStudent(mockStudent);
    onLoginSuccess();
  };

  if (currentScreen === 'join_code') {
    return (
      <div id="join-code-screen" className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto w-full">
        <div className="flex-grow flex flex-col items-center justify-center pt-12 pb-24">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary-brand rounded-2xl rotate-45 flex items-center justify-center shadow-md transition-transform hover:scale-105">
              <div className="w-8 h-8 bg-[#1B1B1F] rounded-full -rotate-45 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-brand" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-[#1B1B1F] leading-tight px-4">
              학교 전용 앱입니다, <br />
              가입 코드를 입력해 주세요
            </h1>
          </div>

          {/* Input Form */}
          <form onSubmit={handleJoinCodeSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                id="join-code-input"
                type="text"
                maxLength={6}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="가입 코드 6자리 입력 (예: 123456)"
                className="w-full bg-white border border-[#e4e1e7] focus:border-secondary-brand focus:ring-2 focus:ring-[#FFC72C]/20 rounded-2xl px-6 py-4 font-sans text-[#1B1B1F] placeholder-[#6B6B72] shadow-sm focus:outline-none transition-all text-center tracking-widest text-lg font-semibold"
              />
            </div>
            {joinError && (
              <p className="text-alert-brand text-sm text-center font-medium mt-1">{joinError}</p>
            )}
            <p className="text-xs text-[#6B6B72] text-center mt-2">
              가입 코드는 소속 고등학교 교무처에서 발급받을 수 있습니다.
            </p>
          </form>
        </div>

        {/* Fixed Bottom Button */}
        <div className="w-full pb-4">
          <button
            id="join-code-confirm-btn"
            onClick={handleJoinCodeSubmit}
            className="w-full bg-primary-brand hover:bg-[#E9AE00] text-[#1B1B1F] font-bold py-4 rounded-2xl shadow-sm active:scale-[0.98] transition-all flex justify-center items-center text-base"
          >
            코드 확인
          </button>
          <div className="text-center mt-4">
            <button 
              id="goto-login-btn"
              onClick={() => setScreen('login')}
              className="text-[#6B6B72] hover:text-[#1B1B1F] text-sm font-medium underline"
            >
              기존 계정으로 로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'student_info') {
    return (
      <div id="student-info-screen" className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-0 w-full bg-transparent flex items-center justify-center py-6 z-40">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-brand" />
            <h1 className="font-display text-xl font-bold text-[#1B1B1F]">Academic Excellence</h1>
          </div>
        </header>

        {/* Main Form Content */}
        <div className="w-full pt-16 pb-6">
          {/* Status Banner */}
          <div className="bg-[#ffdf99] text-[#5a4300] rounded-xl p-4 mb-6 flex items-center gap-2 shadow-sm border border-[#ffc72c]/30">
            <Info className="w-5 h-5 shrink-0" />
            <p className="text-sm font-semibold">승인 대기 중 · 제한 모드</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(27,27,31,0.04)] border border-[#e4e1e7]">
            <h2 className="font-sans text-lg font-bold text-[#1B1B1F] mb-6">학생 정보 입력</h2>
            <form onSubmit={handleStudentInfoSubmit} className="space-y-5">
              {/* Dropdowns Row */}
              <div className="flex gap-4">
                <div className="flex-1 space-y-1.5">
                  <label htmlFor="grade-select" className="block text-xs font-bold text-[#4f4633]">학년</label>
                  <select
                    id="grade-select"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="block w-full bg-white border border-[#d3c5ac] text-[#1b1b1f] rounded-2xl focus:border-[#E9AE00] focus:ring-2 focus:ring-[#FFC72C]/20 font-sans px-4 py-3 focus:outline-none transition-all text-sm"
                  >
                    <option value="" disabled>선택</option>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                  </select>
                </div>
                <div className="flex-1 space-y-1.5">
                  <label htmlFor="class-select" className="block text-xs font-bold text-[#4f4633]">반</label>
                  <select
                    id="class-select"
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
                    className="block w-full bg-white border border-[#d3c5ac] text-[#1b1b1f] rounded-2xl focus:border-[#E9AE00] focus:ring-2 focus:ring-[#FFC72C]/20 font-sans px-4 py-3 focus:outline-none transition-all text-sm"
                  >
                    <option value="" disabled>선택</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={String(n)}>{n}반</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="student-name-input" className="block text-xs font-bold text-[#4f4633]">이름</label>
                <input
                  id="student-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="실명을 입력해주세요"
                  className="block w-full bg-white border border-[#d3c5ac] text-[#1b1b1f] rounded-2xl focus:border-[#E9AE00] focus:ring-2 focus:ring-[#FFC72C]/20 font-sans px-4 py-3 placeholder-[#817661] focus:outline-none transition-all text-sm"
                />
              </div>

              {/* Divider */}
              <hr className="border-[#e4e1e7] my-4" />

              {/* Agreement Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  id="privacy-checkbox"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-5 w-5 rounded border-[#d3c5ac] text-primary-brand focus:ring-primary-brand focus:ring-offset-white bg-white mt-0.5 cursor-pointer"
                />
                <div className="text-sm">
                  <label htmlFor="privacy-checkbox" className="font-sans text-[#1b1b1f] font-medium cursor-pointer">
                    개인정보 수집 및 이용에 동의합니다.
                  </label>
                  <p className="text-xs text-[#817661] mt-1 leading-tight">
                    입력하신 정보는 학사 관리 목적으로만 사용되며, 안전하게 보호됩니다.
                  </p>
                </div>
              </div>

              {infoError && (
                <p className="text-alert-brand text-sm font-medium mt-2">{infoError}</p>
              )}
            </form>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              id="student-info-submit-btn"
              onClick={handleStudentInfoSubmit}
              type="button"
              className="w-full bg-primary-brand hover:bg-[#E9AE00] text-[#1B1B1F] rounded-2xl py-4 font-sans font-bold shadow-sm active:scale-[0.98] transition-all"
            >
              제출하기
            </button>
            <div className="text-center mt-4">
              <button
                id="student-info-back-btn"
                onClick={() => setScreen('join_code')}
                className="text-[#6B6B72] hover:text-[#1B1B1F] text-sm font-medium"
              >
                이전 단계로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'login') {
    return (
      <div id="login-screen" className="min-h-screen flex flex-col justify-between p-6 max-w-md mx-auto w-full">
        {/* Header */}
        <header className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-brand" />
            <h1 className="font-display text-xl font-bold text-primary-brand">Academic Excellence</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-center py-8">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl text-[#1B1B1F]">로그인</h2>
            <p className="text-sm text-[#4f4633] mt-2">환영합니다. 학습 여정을 시작하세요.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* ID Input */}
            <div className="space-y-1">
              <label htmlFor="login-username" className="text-xs font-bold text-[#1B1B1F] ml-1">아이디</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4f4633]" />
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="학번 또는 아이디 입력"
                  className="w-full bg-white border border-[#e4e1e7] focus:border-secondary-brand focus:ring-2 focus:ring-[#FFC72C]/20 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm text-[#1B1B1F] placeholder-[#6B6B72] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="login-password" className="text-xs font-bold text-[#1B1B1F] ml-1">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4f4633]" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full bg-white border border-[#e4e1e7] focus:border-secondary-brand focus:ring-2 focus:ring-[#FFC72C]/20 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm text-[#1B1B1F] placeholder-[#6B6B72] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center px-1 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="login-remember"
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-[#e4e1e7] text-[#FFC72C] focus:ring-primary-brand"
                />
                <span className="text-xs font-sans text-[#4f4633]">로그인 유지</span>
              </label>
              <button
                id="login-forgot-btn"
                type="button"
                onClick={() => alert('소속 고등학교의 관리자에게 비밀번호 재설정을 요청해 주세요.')}
                className="text-xs font-bold text-[#795900] hover:underline"
              >
                비밀번호 찾기
              </button>
            </div>

            {loginError && (
              <p className="text-alert-brand text-sm text-center font-medium mt-1">{loginError}</p>
            )}
          </form>
        </div>

        {/* Action Button */}
        <div className="pb-6">
          <button
            id="login-submit-btn"
            onClick={handleLoginSubmit}
            className="w-full bg-primary-brand hover:bg-[#E9AE00] text-[#1B1B1F] rounded-2xl py-4 font-sans font-bold flex justify-center items-center gap-2 shadow-sm active:scale-[0.98] transition-all"
          >
            로그인
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-[#4f4633]">
              처음이신가요?{' '}
              <button
                id="goto-signup-btn"
                onClick={() => setScreen('join_code')}
                className="text-[#775a00] font-bold hover:underline"
              >
                회원가입 (가입코드)
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

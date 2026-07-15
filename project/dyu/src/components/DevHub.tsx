import React, { useState } from 'react';
import { ScreenType } from '../types';
import { Layers, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface DevHubProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  isAdminMode: boolean;
  setAdminMode: (admin: boolean) => void;
}

export const DevHub: React.FC<DevHubProps> = ({
  currentScreen,
  setScreen,
  isAdminMode,
  setAdminMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenType; name: string; desc: string }[] = [
    { id: 'join_code', name: '가입 코드 입력', desc: 'Screen 7 - Onboarding Code' },
    { id: 'student_info', name: '학생 정보 입력', desc: 'Screen 8 - Info Registration' },
    { id: 'login', name: '로그인 화면', desc: 'Screen 5 - Login Portal' },
    { id: 'home', name: '메인 홈', desc: 'Screen 1 - Dashboard Home' },
    { id: 'schedule', name: '시간표 화면', desc: 'Screen 2 - Timetable Views' },
    { id: 'school_life', name: '학교생활 (수행평가)', desc: 'Screen 4 - Tasks & Assessments' },
    { id: 'barcode', name: '급식 바코드', desc: 'Screen 3 - Meal Barcode' },
    { id: 'notice', name: '공지사항', desc: 'Screen 5 - Notice Board' },
    { id: 'my', name: '마이페이지', desc: 'Screen 6 - Profile & Alarms' },
    { id: 'admin', name: '관리자 콘솔', desc: 'Screen 9 - Admin Console summary' },
  ];

  return (
    <div id="dev-hub-container" className="fixed bottom-[96px] right-4 z-50 font-sans">
      {/* Dev Switcher Toggle */}
      <button
        id="dev-hub-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#1B1B1F] hover:bg-black text-white px-4 py-3 rounded-full shadow-lg border border-primary-brand/30 transition-all transform active:scale-95 text-xs font-semibold"
      >
        <Layers className="w-4 h-4 text-primary-brand animate-pulse" />
        <span>화면 신속 스위처</span>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>

      {/* Expanded list of screens */}
      {isOpen && (
        <div id="dev-hub-menu" className="absolute bottom-[56px] right-0 w-72 bg-[#1B1B1F] border border-[#e4e1e7]/20 rounded-2xl shadow-2xl p-4 overflow-hidden max-h-[420px] overflow-y-auto">
          <div className="border-b border-white/10 pb-2 mb-3">
            <p className="text-xs font-bold text-primary-brand uppercase tracking-wider">Screen Preview Hub</p>
            <p className="text-[10px] text-gray-400 mt-1">클릭하면 원하는 화면으로 바로 이동합니다.</p>
          </div>

          <div className="space-y-1.5">
            {screens.map((sc) => {
              const isActive = currentScreen === sc.id;
              return (
                <button
                  key={sc.id}
                  id={`dev-hub-sc-${sc.id}`}
                  onClick={() => {
                    setScreen(sc.id);
                    if (sc.id === 'admin') {
                      setAdminMode(true);
                    } else {
                      setAdminMode(false);
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-primary-brand text-[#1B1B1F] font-bold'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{sc.name}</p>
                    <p className={`text-[9px] ${isActive ? 'text-[#1B1B1F]/70' : 'text-gray-400'}`}>
                      {sc.desc}
                    </p>
                  </div>
                  {isActive && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1B1B1F]" />}
                </button>
              );
            })}
          </div>

          <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center">
            <span className="text-[10px] text-gray-400">교사 / 관리자 권한</span>
            <button
              id="dev-hub-admin-toggle"
              onClick={() => {
                const target = !isAdminMode;
                setAdminMode(target);
                setScreen(target ? 'admin' : 'home');
              }}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                isAdminMode 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {isAdminMode ? '관리자 권한 활성화' : '일반 학생 모드'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

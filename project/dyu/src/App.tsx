import { useState, useEffect } from 'react';
import { ScreenType, Student } from './types';
import { StudentOnboarding } from './components/StudentOnboarding';
import { MainScreens } from './components/MainScreens';
import { DevHub } from './components/DevHub';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle, 
  Activity, 
  Layers, 
  BookOpen, 
  Smartphone,
  Info
} from 'lucide-react';

export default function App() {
  // Navigation states
  const [screen, setScreen] = useState<ScreenType>('join_code');
  const [isAdminMode, setAdminMode] = useState(false);

  // Student Profile states
  const [student, setStudent] = useState<Student>({
    name: '김우성',
    grade: '3',
    classNum: '5',
    id: '30507'
  });

  // Track if user has completed onboarding/is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on boot to see if logged in
  useEffect(() => {
    const saved = localStorage.getItem('dyu_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStudent(parsed);
        setIsLoggedIn(true);
        setScreen('home');
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setScreen('home');
    localStorage.setItem('dyu_student', JSON.stringify(student));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setScreen('login');
    localStorage.removeItem('dyu_student');
  };

  const isOnboardingScreen = ['join_code', 'student_info', 'login'].includes(screen);

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F5F6F8] text-[#1B1B1F] flex flex-col md:flex-row font-sans">
      
      {/* LEFT COLUMN: Educational & Interactive Guidance Panel (Visible on Desktops/Tablets) */}
      <aside id="desktop-guidance-panel" className="hidden lg:flex lg:w-96 bg-[#1B1B1F] text-white p-8 flex-col justify-between shrink-0 border-r border-[#e4e1e7]/10 relative overflow-hidden">
        {/* Background decorative vector */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFC72C]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-4 bottom-12 w-24 h-24 bg-[#FFC72C]/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="space-y-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-[#1B1B1F]" />
            </div>
            <div>
              <h1 className="font-display font-black text-xl text-[#FFC72C]">우성 D'yu</h1>
              <p className="text-[10px] text-gray-400 tracking-wider font-semibold uppercase">Academic Helper App</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs font-bold text-[#FFC72C] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC72C]" />
                완벽한 모바일 시뮬레이터
              </p>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                오른쪽 모바일 뷰포트 영역에서 실제 스마트폰 환경과 똑같은 해상도와 터치감으로 학사 시스템을 체험해 보세요.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400">체험 가능한 9가지 화면:</p>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-300">
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 가입 코드 입력</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 학생 정보 등록</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 로그인 화면</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 통합 메인 홈</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 시간표 / 일정</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 수행평가 목록</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 급식 바코드</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 실시간 공지사항</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-lg">✓ 관리자 콘솔</span>
              </div>
            </div>
          </div>

          <div className="bg-[#ffdf99]/10 border border-[#ffc72c]/20 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-[#FFC72C] mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              개발자 테스트 가이드
            </h4>
            <p className="text-[10px] text-gray-300 leading-normal">
              가입 코드에서 <code className="text-[#FFC72C] font-semibold bg-white/5 px-1 py-0.5 rounded">123456</code>을 입력하고 실명을 입력하면 즉시 본인 계정이 생성되어 홈 화면으로 진입합니다.
            </p>
          </div>
        </div>

        <div className="text-[10px] text-gray-500 border-t border-white/10 pt-4 mt-6">
          <p>© 2026 Academic Excellence System.</p>
          <p className="mt-1">Designed with Generous Softness.</p>
        </div>
      </aside>

      {/* RIGHT COLUMN / CORE PREVIEW: Interactive Screen Wrapper */}
      <main id="core-interactive-container" className="flex-grow flex items-center justify-center py-0 md:py-8 px-0 md:px-4 bg-[#F5F6F8] min-h-screen">
        
        {/* Simulating a perfect mobile device viewport frame on desktop */}
        <div id="mobile-device-simulator" className="w-full max-w-lg md:max-w-[420px] bg-white min-h-screen md:min-h-[840px] md:max-h-[880px] md:rounded-[40px] md:shadow-2xl overflow-hidden flex flex-col justify-between border border-[#e4e1e7] relative">
          
          {/* Main Display Route Router */}
          <div id="active-viewport" className="flex-grow overflow-y-auto hide-scrollbar">
            {isOnboardingScreen ? (
              <StudentOnboarding
                currentScreen={screen}
                setScreen={setScreen}
                setStudent={setStudent}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <MainScreens
                currentScreen={screen}
                setScreen={setScreen}
                student={student}
                setStudent={setStudent}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Dev Quick Selector Widget (Helps user preview all screens shown in mockups instantly) */}
          <DevHub
            currentScreen={screen}
            setScreen={setScreen}
            isAdminMode={isAdminMode}
            setAdminMode={setAdminMode}
          />

        </div>
      </main>
      
    </div>
  );
}


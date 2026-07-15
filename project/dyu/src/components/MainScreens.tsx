import React, { useState } from 'react';
import { ScreenType, Student, ClassSchedule, UpcomingEvent, Assessment, NoticeItem } from '../types';
import { 
  Home as HomeIcon, 
  Calendar as CalendarIcon, 
  GraduationCap, 
  Bell, 
  Settings, 
  User, 
  ChevronRight, 
  QrCode, 
  Wifi, 
  WifiOff, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  Utensils, 
  ChevronLeft, 
  Plus, 
  AlertCircle, 
  ShieldCheck, 
  Trash2, 
  EyeOff, 
  Search, 
  MessageSquare,
  Check,
  X,
  FileText,
  Activity
} from 'lucide-react';
import { 
  initialSchedules, 
  upcomingEvents, 
  upcomingAcademicSchedules, 
  initialAssessments, 
  initialNotices, 
  mealMenu, 
  avatarUrls 
} from '../data';

interface MainScreensProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  student: Student;
  setStudent: (student: Student) => void;
  onLogout: () => void;
}

export const MainScreens: React.FC<MainScreensProps> = ({
  currentScreen,
  setScreen,
  student,
  setStudent,
  onLogout,
}) => {
  // Global States shared between screens
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices);
  
  // Schedule Screen states
  const [scheduleTab, setScheduleTab] = useState<'daily' | 'weekly' | 'academic'>('daily');
  const [currentDate, setCurrentDate] = useState('7월 7일 (화)');

  // School Life state
  const [schoolLifeTab, setSchoolLifeTab] = useState<'assessment' | 'meal' | 'library'>('assessment');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [newAssessmentTitle, setNewAssessmentTitle] = useState('');
  const [newAssessmentDDay, setNewAssessmentDDay] = useState('D-7');

  // Notice Board states
  const [noticeFilter, setNoticeFilter] = useState<'all' | 'academic' | 'life' | 'emergency'>('all');

  // Alarm switches in My Page
  const [alarmSchedule, setAlarmSchedule] = useState(true);
  const [alarmAssessment, setAlarmAssessment] = useState(true);
  const [alarmMeal, setAlarmMeal] = useState(false);

  // Admin Console state
  const [applications, setApplications] = useState([
    { id: 'app-1', name: '김대동', grade: '3', classNum: '5' },
    { id: 'app-2', name: '이우성', grade: '2', classNum: '1' },
    { id: 'app-3', name: '박하은', grade: '1', classNum: '3' },
  ]);
  const [approvedCount, setApprovedCount] = useState(1248);
  const [waitCount, setWaitCount] = useState(12);
  const [errorCount, setErrorCount] = useState(2);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'academic' | 'life' | 'emergency'>('academic');

  // Handlers
  const handleToggleAssessment = (id: string) => {
    setAssessments(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
          dDay: item.isCompleted ? 'D-5' : '완료'
        };
      }
      return item;
    }));
  };

  const handleAddAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssessmentTitle.trim()) return;
    const newAss: Assessment = {
      id: `ass-custom-${Date.now()}`,
      title: newAssessmentTitle.trim(),
      type: '개인 추가',
      dDay: newAssessmentDDay,
      isCompleted: false
    };
    setAssessments(prev => [newAss, ...prev]);
    setNewAssessmentTitle('');
  };

  const handleApproveApplication = (id: string, name: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    setWaitCount(prev => Math.max(0, prev - 1));
    setApprovedCount(prev => prev + 1);
    alert(`${name} 학생의 가입을 승인했습니다.`);
  };

  const handleRejectApplication = (id: string, name: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    setWaitCount(prev => Math.max(0, prev - 1));
    alert(`${name} 학생의 가입을 거절했습니다.`);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    const item: NoticeItem = {
      id: `notice-custom-${Date.now()}`,
      title: newNoticeTitle.trim(),
      department: '관리자',
      timeAgo: '방금 전',
      category: newNoticeCategory === 'emergency' ? 'emergency' : newNoticeCategory,
      isEmergency: newNoticeCategory === 'emergency',
      isImportant: newNoticeCategory === 'academic'
    };
    setNotices(prev => [item, ...prev]);
    setNewNoticeTitle('');
    alert('새로운 공지사항을 등록했습니다!');
  };

  // Profile avatar based on logged-in student
  const profileAvatar = student.name === '김우성' ? avatarUrls.femaleUniform1 : avatarUrls.femaleUniform2;

  // Render individual screens
  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#1B1B1F] flex flex-col justify-between pb-24 md:pb-0 font-sans">
      
      {/* 1. HOME SCREEN */}
      {currentScreen === 'home' && (
        <div id="home-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40">
            <div className="flex justify-between items-center px-5 py-4 w-full max-w-lg mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-brand/20 flex items-center justify-center shrink-0 overflow-hidden border border-[#d3c5ac]">
                  <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-lg text-[#1B1B1F]">{student.name}님, 좋은 아침!</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setScreen('notice')}
                  className="text-[#4f4633] hover:bg-surface-container p-2 rounded-full transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-alert-brand rounded-full"></span>
                </button>
                <button 
                  onClick={() => setScreen('my')}
                  className="text-[#4f4633] hover:bg-surface-container p-2 rounded-full transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <main className="px-5 py-6 max-w-lg mx-auto space-y-6">
            
            {/* Next Class Card */}
            <section id="next-class-section">
              <div className="bg-[#1B1B1F] text-white rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-brand/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute right-12 bottom-0 w-20 h-20 bg-primary-brand/10 rounded-full blur-lg pointer-events-none"></div>
                
                <div className="flex items-center gap-2 text-primary-brand">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-sans font-bold text-sm uppercase tracking-wider">다음 수업</span>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-gray-400">3교시</p>
                  <h2 className="font-display font-extrabold text-2xl text-primary-brand tracking-tight">언어와 매체</h2>
                  <div className="flex items-center gap-1.5 text-gray-300 mt-2 text-xs">
                    <MapPin className="w-4 h-4 text-primary-brand" />
                    <span>인문관 302</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Horizontal Scroll Schedule Cards */}
            <section id="upcoming-events-section">
              <h3 className="font-sans font-bold text-[#1B1B1F] text-base mb-3 px-1">다가오는 일정</h3>
              <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-3 -mx-5 px-5 snap-x snap-mandatory">
                {upcomingEvents.map((evt, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-5 min-w-[240px] flex-shrink-0 snap-start shadow-[0px_4px_20px_rgba(27,27,31,0.04)] border border-[#e4e1e7] flex flex-col justify-between h-28"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-[#817661] font-medium">{evt.category}</span>
                      <span className="bg-[#F0433A]/10 text-alert-brand px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold">
                        {evt.dDay}
                      </span>
                    </div>
                    <p className="font-sans font-bold text-[#1b1b1f] text-sm truncate">{evt.title}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Today's Meal Card */}
            <section id="meals-section">
              <div className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(27,27,31,0.04)] flex flex-col gap-4 border border-[#e4e1e7] relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-[#1B1B1F] text-base flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary-brand" />
                    오늘의 급식
                  </h3>
                  <span className="text-xs font-bold text-[#6D5000] bg-[#ffdf99] px-2.5 py-1 rounded-full">중식</span>
                </div>
                
                <p className="font-sans text-[#1B1B1F] text-sm leading-relaxed font-medium bg-[#F5F6F8] p-3 rounded-xl border border-[#e4e1e7]/40">
                  {mealMenu.join(', ')}
                </p>

                <button 
                  onClick={() => setScreen('barcode')}
                  className="w-full bg-primary-brand hover:bg-[#E9AE00] text-[#1B1B1F] font-bold rounded-2xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors active:scale-95 duration-150 text-sm shadow-sm"
                >
                  <QrCode className="w-5 h-5 text-[#1B1B1F]" />
                  급식 바코드 바로 보기
                </button>
              </div>
            </section>

            {/* Latest Notice Card */}
            <section id="notice-shortcut-section" className="pb-6">
              <div 
                onClick={() => setScreen('notice')}
                className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(27,27,31,0.04)] border border-[#e4e1e7] flex items-center gap-3 justify-between hover:bg-gray-50 cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="bg-alert-brand text-white px-2 py-0.5 rounded-lg font-sans text-[10px] font-bold shrink-0">긴급</span>
                  <p className="font-sans text-sm text-[#1b1b1f] font-semibold truncate">
                    이번 주 금요일 단축수업 안내
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#817661] shrink-0" />
              </div>
            </section>
          </main>
        </div>
      )}

      {/* 2. TIMETABLE/SCHEDULE SCREEN */}
      {currentScreen === 'schedule' && (
        <div id="schedule-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40">
            <div className="flex justify-between items-center px-5 py-4 w-full max-w-lg mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e4e1e7]">
                  <img src={avatarUrls.femaleUniform2} alt="Student" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h1 className="font-display text-xl font-bold text-[#1B1B1F]">우성 D'yu</h1>
              </div>
              <button 
                onClick={() => setScreen('notice')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-[#1b1b1f]" />
              </button>
            </div>
          </header>

          <main className="px-5 py-6 max-w-lg mx-auto space-y-6">
            {/* Segmented control tabs */}
            <div className="flex bg-[#f0edf2] rounded-full p-1 border border-[#e4e1e7]">
              <button 
                onClick={() => setScheduleTab('daily')}
                className={`flex-1 py-2 rounded-full font-sans text-xs font-bold transition-all ${
                  scheduleTab === 'daily' 
                    ? 'bg-primary-brand text-[#1B1B1F] shadow-sm' 
                    : 'text-[#4f4633] hover:bg-[#e4e1e7]/60'
                }`}
              >
                일간
              </button>
              <button 
                onClick={() => setScheduleTab('weekly')}
                className={`flex-1 py-2 rounded-full font-sans text-xs font-bold transition-all ${
                  scheduleTab === 'weekly' 
                    ? 'bg-primary-brand text-[#1B1B1F] shadow-sm' 
                    : 'text-[#4f4633] hover:bg-[#e4e1e7]/60'
                }`}
              >
                주간
              </button>
              <button 
                onClick={() => setScheduleTab('academic')}
                className={`flex-1 py-2 rounded-full font-sans text-xs font-bold transition-all ${
                  scheduleTab === 'academic' 
                    ? 'bg-primary-brand text-[#1B1B1F] shadow-sm' 
                    : 'text-[#4f4633] hover:bg-[#e4e1e7]/60'
                }`}
              >
                학사 캘린더
              </button>
            </div>

            {/* Date and Navigation for Daily */}
            {scheduleTab === 'daily' && (
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#E9AE00]" />
                  <span className="font-sans font-bold text-base text-[#1b1b1f]">{currentDate} · 오늘</span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setCurrentDate(currentDate === '7월 7일 (화)' ? '7월 6일 (월)' : '7월 7일 (화)')}
                    className="w-8 h-8 rounded-full border border-[#d3c5ac] flex items-center justify-center bg-white hover:bg-gray-50 text-[#1b1b1f]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentDate(currentDate === '7월 7일 (화)' ? '7월 8일 (수)' : '7월 7일 (화)')}
                    className="w-8 h-8 rounded-full border border-[#d3c5ac] flex items-center justify-center bg-white hover:bg-gray-50 text-[#1b1b1f]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Timetable List (Screen 2 Mockup style) */}
            {scheduleTab === 'daily' && (
              <div className="space-y-3">
                {initialSchedules.map((cls) => (
                  <div 
                    key={cls.period} 
                    className="bg-white rounded-2xl p-5 shadow-sm border border-[#e4e1e7] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {/* Left colored status bar and number */}
                      <div className="flex items-center gap-3">
                        <span className="font-display font-black text-lg text-[#817661] w-4 text-center">{cls.period}</span>
                        <div className={`w-1 h-12 rounded-full ${cls.isChanged ? 'bg-alert-brand' : 'bg-primary-brand'}`} />
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-sans font-bold text-sm text-[#1B1B1F]">{cls.subject}</h3>
                          {cls.isChanged && (
                            <span className="bg-alert-brand text-white px-2 py-0.5 rounded-full font-sans text-[10px] font-bold">
                              변경
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#817661] font-medium">
                          {cls.location} · {cls.teacher}
                        </p>
                        {cls.note && (
                          <p className="text-xs text-alert-brand font-semibold mt-0.5">
                            {cls.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Weekly Timetable Stand-In */}
            {scheduleTab === 'weekly' && (
              <div className="bg-white rounded-2xl p-5 border border-[#e4e1e7] shadow-sm overflow-x-auto">
                <table className="w-full text-center text-xs font-sans">
                  <thead>
                    <tr className="border-b border-[#e4e1e7] text-[#817661] font-bold">
                      <th className="py-2">교시</th>
                      <th className="py-2">월</th>
                      <th className="py-2">화</th>
                      <th className="py-2 font-bold text-[#E9AE00]">수 (오늘)</th>
                      <th className="py-2">목</th>
                      <th className="py-2">금</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e4e1e7]/40 text-[#1B1B1F]">
                    <tr>
                      <td className="py-3 font-bold text-[#817661]">1</td>
                      <td className="py-3">영어</td>
                      <td className="py-3 font-semibold text-primary-brand">문학</td>
                      <td className="py-3">수학</td>
                      <td className="py-3">과학</td>
                      <td className="py-3">미술</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-[#817661]">2</td>
                      <td className="py-3">체육</td>
                      <td className="py-3 font-semibold text-primary-brand">수학</td>
                      <td className="py-3">영어</td>
                      <td className="py-3">기가</td>
                      <td className="py-3">음악</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-[#817661]">3</td>
                      <td className="py-3">독서</td>
                      <td className="py-3 font-bold text-alert-brand">영어*</td>
                      <td className="py-3">한국사</td>
                      <td className="py-3">진로</td>
                      <td className="py-3">창체</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-[#817661]">4</td>
                      <td className="py-3">수학</td>
                      <td className="py-3 font-semibold text-primary-brand">체육</td>
                      <td className="py-3">과학</td>
                      <td className="py-3">중국어</td>
                      <td className="py-3">독서</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[10px] text-alert-brand font-medium mt-3 text-center">* 영어 교시는 오늘 자습으로 대체 변경되었습니다.</p>
              </div>
            )}

            {/* Academic Schedule List (Screen 2 bottom) */}
            <section id="academic-events-section" className="pb-6">
              <h3 className="font-sans font-bold text-[#1B1B1F] text-base mb-3 px-1">다가오는 학사일정</h3>
              <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-3 -mx-5 px-5 snap-x snap-mandatory">
                {upcomingAcademicSchedules.map((sch, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-5 min-w-[240px] flex-shrink-0 snap-start shadow-[0px_4px_20px_rgba(27,27,31,0.04)] border border-[#e4e1e7] flex flex-col justify-between h-28"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-[#817661] font-medium">{sch.category}</span>
                      <span className="bg-[#FFC72C]/20 text-[#6f5400] px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold">
                        {sch.dDay}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-bold text-[#1b1b1f] text-sm truncate">{sch.title}</p>
                      <p className="text-xs text-[#817661] mt-1">{sch.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}

      {/* 3. MEAL BARCODE SCREEN (Screen 3) */}
      {currentScreen === 'barcode' && (
        <div id="barcode-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40 h-16 flex items-center justify-between px-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-brand/10">
                <img src={avatarUrls.femaleUniform3} alt="Student avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h1 className="font-display text-lg font-bold text-[#1B1B1F]">급식 바코드</h1>
            </div>
            <button 
              onClick={() => setScreen('home')}
              className="px-3 py-1.5 rounded-full hover:bg-gray-100 text-xs text-[#817661] border border-[#d3c5ac] font-bold"
            >
              닫기
            </button>
          </header>

          <main className="px-5 py-6 pb-24 max-w-md mx-auto space-y-6">
            {/* Barcode Display Card */}
            <section className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(27,27,31,0.04)] border border-[#e4e1e7] flex flex-col items-center relative overflow-hidden">
              {/* Decorative design element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffc72c]/10 rounded-bl-[64px] pointer-events-none"></div>
              
              <div className="z-10 w-full flex flex-col items-center">
                <h2 className="font-sans text-sm font-bold text-[#817661] mb-2">우성고등학교 학생증</h2>
                <h3 className="font-sans font-bold text-lg text-[#1b1b1f] mb-6">3학년 8반 김우성</h3>
                
                {/* Barcode Image Hotlinked */}
                <div className="w-full max-w-[280px] p-2 bg-white border-2 border-[#e4e1e7] rounded-xl overflow-hidden mb-6 flex items-center justify-center shadow-sm">
                  <img 
                    src={avatarUrls.barcode} 
                    alt="급식 바코드 실물" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>

                <p className="font-mono text-lg font-bold text-[#1b1b1f] tracking-[0.4em] mb-6 text-center">
                  20230707
                </p>

                <div className="flex items-center gap-1.5 px-4 py-2 bg-[#f0edf2] rounded-full text-xs text-[#817661] font-semibold">
                  <WifiOff className="w-4 h-4" />
                  <span>오프라인 상태에서도 표시돼요</span>
                </div>
              </div>
            </section>

            {/* Today's Meal Card inside Barcode View */}
            <section className="bg-white rounded-2xl p-5 shadow-[0px_4px_20px_rgba(27,27,31,0.04)] border border-[#e4e1e7] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-brand"></div>
              
              <div className="flex justify-between items-center mb-3 pl-2">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary-brand" />
                  <h4 className="font-sans font-bold text-sm text-[#1B1B1F]">오늘의 급식</h4>
                </div>
                <span className="px-2.5 py-0.5 bg-[#ffdf99] text-[#6d5000] font-sans text-[10px] font-bold rounded-full">중식</span>
              </div>
              
              <div className="pl-2 space-y-1">
                {mealMenu.map((m, i) => (
                  <p key={i} className="font-sans text-sm text-[#4f4633] font-medium">• {m}</p>
                ))}
              </div>
            </section>
          </main>
        </div>
      )}

      {/* 4. SCHOOL LIFE SCREEN (Screen 4) */}
      {currentScreen === 'school_life' && (
        <div id="school-life-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40">
            <div className="flex justify-between items-center px-5 py-4 w-full max-w-lg mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e4e1e7]">
                  <img src={avatarUrls.femaleUniform1} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h1 className="font-display text-xl font-bold text-[#1B1B1F]">School Life</h1>
              </div>
              <button 
                onClick={() => setScreen('notice')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-[#1b1b1f]" />
              </button>
            </div>
          </header>

          <main className="px-5 py-6 max-w-lg mx-auto space-y-6">
            {/* Segmented Control */}
            <div className="flex bg-white rounded-full p-1 border border-[#e4e1e7] shadow-sm">
              <button 
                onClick={() => setSchoolLifeTab('assessment')}
                className={`flex-1 py-2.5 rounded-full font-sans text-xs font-bold transition-all ${
                  schoolLifeTab === 'assessment' 
                    ? 'bg-primary-brand text-[#1B1B1F] shadow-sm' 
                    : 'text-[#817661] hover:bg-gray-50'
                }`}
              >
                수행평가
              </button>
              <button 
                onClick={() => setSchoolLifeTab('meal')}
                className={`flex-1 py-2.5 rounded-full font-sans text-xs font-bold transition-all ${
                  schoolLifeTab === 'meal' 
                    ? 'bg-primary-brand text-[#1B1B1F] shadow-sm' 
                    : 'text-[#817661] hover:bg-gray-50'
                }`}
              >
                급식
              </button>
              <button 
                onClick={() => setSchoolLifeTab('library')}
                className={`flex-1 py-2.5 rounded-full font-sans text-xs font-bold transition-all ${
                  schoolLifeTab === 'library' 
                    ? 'bg-primary-brand text-[#1B1B1F] shadow-sm' 
                    : 'text-[#817661] hover:bg-gray-50'
                }`}
              >
                도서관
              </button>
            </div>

            {schoolLifeTab === 'assessment' && (
              <>
                {/* Filter Chips */}
                <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
                  <button className="whitespace-nowrap px-4 py-2 rounded-full border border-[#d3c5ac] bg-white text-[#4f4633] font-sans text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
                    마감임박순
                  </button>
                  <button className="whitespace-nowrap px-4 py-2 rounded-full border border-[#d3c5ac] bg-white text-[#4f4633] font-sans text-xs font-semibold hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
                    과목별
                  </button>
                  <button 
                    onClick={() => setHideCompleted(!hideCompleted)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border font-sans text-xs font-semibold active:scale-95 transition-all shadow-sm ${
                      hideCompleted 
                        ? 'bg-[#FFC72C]/20 border-secondary-brand text-[#6D5000]' 
                        : 'bg-white border-[#d3c5ac] text-[#4f4633]'
                    }`}
                  >
                    {hideCompleted ? '완료 보이기' : '완료 숨기기'}
                  </button>
                </div>

                {/* Performance Assessment list */}
                <div className="space-y-3">
                  {assessments
                    .filter(item => !(hideCompleted && item.isCompleted))
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => handleToggleAssessment(item.id)}
                        className={`bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-[#e4e1e7] transition-all cursor-pointer active:scale-[0.99] hover:border-secondary-brand/40 ${
                          item.isCompleted ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            item.isCompleted ? 'bg-gray-100 text-[#817661]' : 'bg-[#f0edf2] text-[#775a00]'
                          }`}>
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <h3 className={`font-sans font-bold text-sm text-[#1b1b1f] ${item.isCompleted ? 'line-through text-[#817661]' : ''}`}>
                              {item.title}
                            </h3>
                            <span className="text-xs text-[#817661] font-medium">{item.type}</span>
                          </div>
                        </div>

                        <div className={`px-3 py-1 rounded-lg font-sans text-xs font-bold ${
                          item.isCompleted 
                            ? 'bg-[#eae7ed] text-[#4f4633]' 
                            : item.isUrgent 
                              ? 'bg-alert-brand text-white' 
                              : 'bg-primary-brand text-[#1B1B1F]'
                        }`}>
                          {item.dDay}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Add Custom Assessment Form */}
                <form onSubmit={handleAddAssessment} className="bg-white rounded-2xl p-5 border border-[#e4e1e7] shadow-sm space-y-3">
                  <h4 className="font-sans font-bold text-xs text-[#4f4633]">+ 나의 수행평가/할 일 추가</h4>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newAssessmentTitle}
                      onChange={(e) => setNewAssessmentTitle(e.target.value)}
                      placeholder="수행평가 또는 과제명 입력"
                      className="flex-grow bg-[#F5F6F8] border border-[#d3c5ac] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-secondary-brand"
                    />
                    <select 
                      value={newAssessmentDDay}
                      onChange={(e) => setNewAssessmentDDay(e.target.value)}
                      className="bg-white border border-[#d3c5ac] rounded-xl px-2 py-2 text-xs focus:outline-none"
                    >
                      <option value="D-1">D-1</option>
                      <option value="D-2">D-2</option>
                      <option value="D-3">D-3</option>
                      <option value="D-7">D-7</option>
                      <option value="D-14">D-14</option>
                    </select>
                    <button 
                      type="submit"
                      className="bg-primary-brand hover:bg-[#E9AE00] text-[#1B1B1F] px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                    >
                      추가
                    </button>
                  </div>
                </form>
              </>
            )}

            {schoolLifeTab === 'meal' && (
              <div className="bg-white rounded-2xl p-6 border border-[#e4e1e7] shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-bold text-base text-[#1B1B1F] flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-[#775a00]" />
                    식단 및 급식 정보
                  </h3>
                  <button 
                    onClick={() => setScreen('barcode')}
                    className="bg-[#ffdf99] text-[#5a4300] hover:bg-[#ffdf99]/80 transition-all font-sans text-xs font-bold px-3 py-1.5 rounded-full"
                  >
                    바코드 인증하기
                  </button>
                </div>
                
                <div className="space-y-4 font-sans text-sm">
                  <div>
                    <span className="font-bold text-[#E9AE00] block mb-1">[중식] 12:40 ~ 13:30</span>
                    <p className="bg-gray-50 p-4 rounded-xl leading-relaxed text-[#1b1b1f] border border-[#e4e1e7]/40">
                      치킨마요덮밥, 미소된장국, 깍두기, 귤, 친환경주스
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#817661] block mb-1">[석식] 18:00 ~ 19:00</span>
                    <p className="bg-gray-50 p-4 rounded-xl leading-relaxed text-[#1b1b1f] border border-[#e4e1e7]/40">
                      차돌박이된장찌개, 안동찜닭, 깻잎지, 김치, 바나나우유
                    </p>
                  </div>
                </div>
              </div>
            )}

            {schoolLifeTab === 'library' && (
              <div className="bg-white rounded-2xl p-6 border border-[#e4e1e7] shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-sans font-bold text-base text-[#1B1B1F]">나의 도서 대출 현황</h3>
                  <span className="bg-primary-brand/30 text-[#6D5000] text-xs px-2.5 py-0.5 rounded-full font-bold">1권 대출 중</span>
                </div>
                <div className="space-y-3 font-sans text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-[#1b1b1f]">데미안 (Demian)</p>
                      <p className="text-xs text-[#817661] mt-0.5">반납 기한: 7월 8일 (수)</p>
                    </div>
                    <span className="bg-alert-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-md">D-1</span>
                  </div>
                  <div className="text-xs text-[#817661] leading-relaxed p-1">
                    • 도서 연체 시 일수만큼 추가 대출이 제한됩니다. <br />
                    • 도서관 운영 시간: 평일 09:00 ~ 16:30
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* 5. NOTICE BOARD SCREEN */}
      {currentScreen === 'notice' && (
        <div id="notice-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40">
            <div className="flex justify-between items-center px-5 py-4 w-full max-w-lg mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#e4e1e7]">
                  <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h1 className="font-display text-xl font-bold text-[#1B1B1F]">공지사항</h1>
              </div>
              <button 
                onClick={() => setScreen('home')}
                className="text-xs font-bold text-[#817661] hover:text-[#1b1b1f]"
              >
                홈으로
              </button>
            </div>
          </header>

          <main className="px-5 py-6 max-w-lg mx-auto space-y-6">
            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              <button 
                onClick={() => setNoticeFilter('all')}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-xs font-bold active:scale-95 transition-all shrink-0 shadow-sm ${
                  noticeFilter === 'all' 
                    ? 'bg-primary-brand text-[#1B1B1F] border border-secondary-brand' 
                    : 'bg-white border border-[#d3c5ac] text-[#817661]'
                }`}
              >
                전체
              </button>
              <button 
                onClick={() => setNoticeFilter('academic')}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-xs font-bold active:scale-95 transition-all shrink-0 ${
                  noticeFilter === 'academic' 
                    ? 'bg-primary-brand text-[#1B1B1F] border border-secondary-brand' 
                    : 'bg-white border border-[#d3c5ac] text-[#817661]'
                }`}
              >
                학사
              </button>
              <button 
                onClick={() => setNoticeFilter('life')}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-xs font-bold active:scale-95 transition-all shrink-0 ${
                  noticeFilter === 'life' 
                    ? 'bg-primary-brand text-[#1B1B1F] border border-secondary-brand' 
                    : 'bg-white border border-[#d3c5ac] text-[#817661]'
                }`}
              >
                생활
              </button>
              <button 
                onClick={() => setNoticeFilter('emergency')}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-xs font-bold active:scale-95 transition-all shrink-0 ${
                  noticeFilter === 'emergency' 
                    ? 'bg-primary-brand text-[#1B1B1F] border border-secondary-brand' 
                    : 'bg-white border border-[#d3c5ac] text-[#817661]'
                }`}
              >
                긴급
              </button>
            </div>

            {/* Notice List */}
            <div className="space-y-3">
              {notices
                .filter(item => noticeFilter === 'all' || item.category === noticeFilter)
                .map((not) => (
                  <div 
                    key={not.id}
                    className={`bg-white rounded-2xl p-5 border flex gap-4 items-start shadow-sm active:scale-[0.99] transition-transform cursor-pointer ${
                      not.isEmergency ? 'border-alert-brand' : 'border-[#e4e1e7]'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                      not.isEmergency 
                        ? 'bg-[#ffdad6] text-[#ba1a1a]' 
                        : 'bg-[#f0edf2] text-[#4f4633]'
                    }`}>
                      <Bell className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-sans font-bold text-sm text-[#1B1B1F] line-clamp-2 leading-snug">
                          {not.title}
                        </h3>
                        {not.isEmergency && (
                          <span className="px-2 py-0.5 bg-alert-brand/10 text-alert-brand rounded font-sans text-[9px] font-bold shrink-0">
                            긴급
                          </span>
                        )}
                        {not.isImportant && !not.isEmergency && (
                          <span className="px-2 py-0.5 bg-primary-brand/20 text-[#6D5000] rounded font-sans text-[9px] font-bold shrink-0">
                            중요
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#817661] font-medium">
                        {not.department} · {not.timeAgo}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      )}

      {/* 6. MY PAGE (Screen 6) */}
      {currentScreen === 'my' && (
        <div id="my-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40">
            <div className="flex justify-between items-center px-5 py-4 w-full max-w-lg mx-auto">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-brand/10">
                <img src={profileAvatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h1 className="font-display text-xl font-bold text-primary-brand">마이</h1>
              <button 
                onClick={() => setScreen('notice')}
                className="text-[#4f4633] hover:bg-gray-100 p-2 rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-alert-brand rounded-full"></span>
              </button>
            </div>
          </header>

          <main className="max-w-lg mx-auto px-5 py-6 space-y-6">
            {/* Profile Section */}
            <section className="flex flex-col items-center justify-center py-4 bg-white rounded-3xl border border-[#e4e1e7] p-6 shadow-sm">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-primary-brand rounded-full flex items-center justify-center text-3xl text-white overflow-hidden shadow-inner border-2 border-white">
                  <img src={profileAvatar} alt="Woosung profile large" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white shadow-md rounded-full w-7 h-7 flex items-center justify-center border border-[#e4e1e7] hover:bg-gray-50 transition-colors">
                  <span className="text-[12px] font-bold text-[#1b1b1f]">편집</span>
                </button>
              </div>
              <h2 className="font-sans font-bold text-lg text-[#1b1b1f] mb-1">{student.name}</h2>
              <p className="text-xs text-[#817661] font-semibold">학생 · {student.grade}학년 {student.classNum}반</p>
            </section>

            {/* Notifications Settings Card */}
            <section className="bg-white rounded-2xl p-5 border border-[#e4e1e7] shadow-sm">
              <h3 className="font-sans font-bold text-sm text-[#1B1B1F] mb-4">알림 설정</h3>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-sm font-semibold text-[#1b1b1f]">시간표 변경 알림</span>
                  <button 
                    onClick={() => setAlarmSchedule(!alarmSchedule)}
                    className={`w-12 h-6 rounded-full transition-all flex items-center p-0.5 ${
                      alarmSchedule ? 'bg-primary-brand justify-end' : 'bg-gray-200 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-md transition-all block"></span>
                  </button>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-sm font-semibold text-[#1b1b1f]">수행평가 마감 알림</span>
                  <button 
                    onClick={() => setAlarmAssessment(!alarmAssessment)}
                    className={`w-12 h-6 rounded-full transition-all flex items-center p-0.5 ${
                      alarmAssessment ? 'bg-primary-brand justify-end' : 'bg-gray-200 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-md transition-all block"></span>
                  </button>
                </li>
                <li className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="text-sm font-semibold text-[#1b1b1f]">급식·도서관 알림</span>
                  <button 
                    onClick={() => setAlarmMeal(!alarmMeal)}
                    className={`w-12 h-6 rounded-full transition-all flex items-center p-0.5 ${
                      alarmMeal ? 'bg-primary-brand justify-end' : 'bg-gray-200 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-md transition-all block"></span>
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#1b1b1f]">방해금지 시간대 설정</span>
                  <button className="text-xs font-bold text-[#817661] hover:text-[#1b1b1f] flex items-center">
                    <span>오후 10시 ~ 오전 7시</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </li>
              </ul>
            </section>

            {/* Account Settings Card */}
            <section className="bg-white rounded-2xl p-5 border border-[#e4e1e7] shadow-sm">
              <h3 className="font-sans font-bold text-sm text-[#1B1B1F] mb-4">계정 관리</h3>
              <ul className="space-y-3 font-sans text-sm">
                <li className="pb-2 border-b border-gray-100 last:border-0">
                  <button className="w-full flex justify-between items-center text-left text-sm font-semibold text-[#1b1b1f] hover:opacity-80">
                    <span>개인정보 처리방침</span>
                    <ChevronRight className="w-4 h-4 text-[#817661]" />
                  </button>
                </li>
                <li className="pb-2 border-b border-gray-100 last:border-0">
                  <button 
                    onClick={onLogout}
                    className="w-full text-left text-sm font-semibold text-[#1b1b1f] hover:text-alert-brand transition-colors"
                  >
                    로그아웃
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      if(confirm('정말로 계정을 탈퇴하시겠습니까?')) {
                        onLogout();
                      }
                    }}
                    className="w-full text-left text-sm font-bold text-alert-brand hover:underline"
                  >
                    탈퇴 요청
                  </button>
                </li>
              </ul>
            </section>

            {/* Admin Banner (Screen 6 bottom) */}
            <section 
              onClick={() => setScreen('admin')}
              className="bg-[#ffdf99] rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-primary-brand transition-colors active:scale-[0.98] duration-200 shadow-sm border border-[#ffc72c]/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#5a4300]" />
                </div>
                <div>
                  <p className="font-sans font-bold text-[#251a00] text-sm">학교 관리자이신가요?</p>
                  <p className="text-xs text-[#5a4300] font-semibold">관리자 콘솔 열기</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#251a00]" />
            </section>
          </main>
        </div>
      )}

      {/* 7. ADMIN CONSOLE SCREEN (Screen 9) */}
      {currentScreen === 'admin' && (
        <div id="admin-view" className="w-full">
          {/* Header */}
          <header className="bg-white sticky top-0 z-40 border-b border-[#e4e1e7]/40">
            <div className="flex justify-between items-center px-5 py-4 w-full max-w-lg mx-auto">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary-brand" />
                <h1 className="font-display text-lg font-bold text-[#1B1B1F]">관리자 콘솔</h1>
              </div>
              <button 
                onClick={() => setScreen('home')}
                className="px-3 py-1.5 bg-[#f0edf2] hover:bg-[#e4e1e7] text-[#1b1b1f] text-xs font-bold rounded-full transition-colors border border-[#d3c5ac]"
              >
                일반 학생모드 전환
              </button>
            </div>
          </header>

          <main className="px-5 py-6 max-w-lg mx-auto space-y-6">
            {/* Statistics Section */}
            <section id="admin-stats-section">
              <h2 className="font-sans font-bold text-sm text-[#1B1B1F] mb-3">대시보드 요약</h2>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e4e1e7] min-w-[120px] flex-grow">
                  <p className="text-[10px] text-[#817661] font-bold mb-1">전체 사용자</p>
                  <p className="font-display font-extrabold text-xl text-[#1B1B1F]">{approvedCount.toLocaleString()}</p>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e4e1e7] min-w-[120px] flex-grow">
                  <p className="text-[10px] text-primary-brand font-bold mb-1">승인 대기</p>
                  <p className="font-display font-extrabold text-xl text-[#E9AE00]">{waitCount}</p>
                </div>
                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e4e1e7] min-w-[120px] flex-grow">
                  <p className="text-[10px] text-alert-brand font-bold mb-1">연동 오류</p>
                  <p className="font-display font-extrabold text-xl text-alert-brand">{errorCount}</p>
                </div>
              </div>
            </section>

            {/* Membership Application Management */}
            <section id="admin-applications-section">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-sans font-bold text-sm text-[#1B1B1F]">가입 신청 관리</h2>
                <span className="text-xs text-[#817661] font-semibold">{applications.length}건 신규</span>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e4e1e7] space-y-4">
                {applications.length === 0 ? (
                  <p className="text-xs text-[#817661] text-center py-4 font-medium">대기 중인 가입 신청이 없습니다.</p>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f0edf2] flex items-center justify-center text-[#817661]">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-sans font-bold text-sm text-[#1b1b1f]">{app.name}</p>
                          <p className="text-xs text-[#817661] font-semibold">{app.grade}학년 {app.classNum}반</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button 
                          onClick={() => handleRejectApplication(app.id, app.name)}
                          className="px-3 py-1.5 rounded-xl border border-[#d3c5ac] text-xs font-bold text-[#817661] hover:bg-gray-50 active:scale-95 transition-all"
                        >
                          거절
                        </button>
                        <button 
                          onClick={() => handleApproveApplication(app.id, app.name)}
                          className="px-3 py-1.5 rounded-xl bg-[#ffc72c] text-[#1b1b1f] font-bold text-xs hover:bg-[#E9AE00] active:scale-95 transition-all"
                        >
                          승인
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Notice Management Panel */}
            <section id="admin-notice-write">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e4e1e7]">
                <h3 className="font-sans font-bold text-sm text-[#1B1B1F] mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-brand" />
                  공지사항 작성 및 관리
                </h3>
                <form onSubmit={handleAddNotice} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#817661] mb-1">공지 구분</label>
                    <div className="flex gap-2">
                      {(['academic', 'life', 'emergency'] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewNoticeCategory(cat)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                            newNoticeCategory === cat 
                              ? 'bg-[#1b1b1f] text-white border-transparent' 
                              : 'bg-white text-[#817661] border-[#d3c5ac]'
                          }`}
                        >
                          {cat === 'academic' ? '학사' : cat === 'life' ? '생활' : '긴급'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new-notice-input" className="block text-xs font-bold text-[#817661] mb-1">공지 내용</label>
                    <input 
                      id="new-notice-input"
                      type="text" 
                      value={newNoticeTitle}
                      onChange={(e) => setNewNoticeTitle(e.target.value)}
                      placeholder="학부모 및 학생에게 안내할 내용을 작성하세요."
                      className="w-full bg-[#f0edf2] border border-[#d3c5ac] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-secondary-brand font-sans"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary-brand hover:bg-[#E9AE00] text-[#1b1b1f] font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
                  >
                    새 공지사항 배포하기
                  </button>
                </form>
              </div>
            </section>

            {/* 연동 상태 모니터링 (Screen 9 bottom) */}
            <section id="admin-servers-section" className="pb-6">
              <h2 className="font-sans font-bold text-sm text-[#1B1B1F] mb-3">연동 상태 모니터링</h2>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e4e1e7] space-y-3">
                <div className="flex justify-between items-center bg-[#f0edf2]/50 p-3 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-[#1b1b1f]">나이스 연동</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] font-sans text-[10px] font-bold flex items-center gap-1">
                    ● 정상
                  </span>
                </div>
                <div className="flex justify-between items-center bg-[#f0edf2]/50 p-3 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-[#1b1b1f]">급식 데이터</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] font-sans text-[10px] font-bold flex items-center gap-1">
                    ● 정상
                  </span>
                </div>
                <div className="flex justify-between items-center bg-[#f0edf2]/50 p-3 rounded-xl border border-alert-brand/30">
                  <span className="text-xs font-bold text-[#1b1b1f]">시간표 서버</span>
                  <button 
                    onClick={() => {
                      setErrorCount(Math.max(0, errorCount - 1));
                      alert('시간표 서버를 정상 복구했습니다!');
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#fce8e6] text-[#c5221f] font-sans text-[10px] font-bold flex items-center gap-1 animate-pulse hover:bg-red-200 transition-colors cursor-pointer"
                  >
                    ● 오류 발생 (복구하기)
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}

      {/* BOTTOM TAB BAR NAVIGATION (Styled precisely to material icons in Screen 1 & Screen 4) */}
      {currentScreen !== 'barcode' && (
        <nav 
          id="main-bottom-navbar" 
          className="fixed bottom-0 left-0 w-full bg-white border-t border-[#e4e1e7] shadow-lg py-2 px-4 flex justify-around items-center z-40 max-w-lg mx-auto"
        >
          {/* 홈 Tab */}
          <button 
            id="tab-btn-home"
            onClick={() => setScreen('home')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentScreen === 'home' 
                ? 'bg-[#ffdf99] text-[#795900] px-4 font-bold' 
                : 'text-[#817661] hover:text-[#1b1b1f]'
            }`}
          >
            <HomeIcon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">홈</span>
          </button>

          {/* 시간표 Tab */}
          <button 
            id="tab-btn-schedule"
            onClick={() => setScreen('schedule')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentScreen === 'schedule' 
                ? 'bg-[#ffdf99] text-[#795900] px-4 font-bold' 
                : 'text-[#817661] hover:text-[#1b1b1f]'
            }`}
          >
            <CalendarIcon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">시간표</span>
          </button>

          {/* 학교생활 Tab */}
          <button 
            id="tab-btn-school-life"
            onClick={() => setScreen('school_life')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentScreen === 'school_life' 
                ? 'bg-[#ffdf99] text-[#795900] px-4 font-bold' 
                : 'text-[#817661] hover:text-[#1b1b1f]'
            }`}
          >
            <GraduationCap className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">학교생활</span>
          </button>

          {/* 공지 Tab */}
          <button 
            id="tab-btn-notice"
            onClick={() => setScreen('notice')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentScreen === 'notice' 
                ? 'bg-[#ffdf99] text-[#795900] px-4 font-bold' 
                : 'text-[#817661] hover:text-[#1b1b1f]'
            }`}
          >
            <Bell className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">공지</span>
          </button>

          {/* 마이 Tab */}
          <button 
            id="tab-btn-my"
            onClick={() => setScreen('my')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              currentScreen === 'my' 
                ? 'bg-[#ffdf99] text-[#795900] px-4 font-bold' 
                : 'text-[#817661] hover:text-[#1b1b1f]'
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold">마이</span>
          </button>
        </nav>
      )}

    </div>
  );
};

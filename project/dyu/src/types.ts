export interface Student {
  name: string;
  grade: string;
  classNum: string;
  id: string;
}

export interface ClassSchedule {
  period: number;
  subject: string;
  location: string;
  teacher: string;
  note?: string;
  isChanged?: boolean;
}

export interface UpcomingEvent {
  category: string;
  title: string;
  dDay: string;
  date?: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: string;
  dDay: string;
  isUrgent?: boolean;
  isCompleted?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  department: string;
  timeAgo: string;
  isEmergency?: boolean;
  isImportant?: boolean;
  category: 'all' | 'academic' | 'life' | 'emergency';
}

export type ScreenType = 
  | 'join_code' 
  | 'student_info' 
  | 'login' 
  | 'home' 
  | 'schedule' 
  | 'school_life' 
  | 'notice' 
  | 'my' 
  | 'barcode' 
  | 'admin';

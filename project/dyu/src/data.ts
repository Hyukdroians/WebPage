import { ClassSchedule, UpcomingEvent, Assessment, NoticeItem } from './types';

export const initialSchedules: ClassSchedule[] = [
  {
    period: 1,
    subject: "문학",
    location: "인문관 201",
    teacher: "김우성"
  },
  {
    period: 2,
    subject: "수학",
    location: "자연관 305",
    teacher: "이진수"
  },
  {
    period: 3,
    subject: "영어",
    location: "인문관 102",
    teacher: "박지민",
    note: "자습 (담당교사 부재)",
    isChanged: true
  },
  {
    period: 4,
    subject: "체육",
    location: "체육관",
    teacher: "최동석"
  }
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    category: "수행평가",
    title: "국어 문학 감상문 제출",
    dDay: "D-2"
  },
  {
    category: "도서관",
    title: "도서 반납 예정",
    dDay: "D-1"
  },
  {
    category: "학교 행사",
    title: "동아리 발표회",
    dDay: "D-7"
  }
];

export const upcomingAcademicSchedules: UpcomingEvent[] = [
  {
    category: "학사",
    title: "1학기 기말고사",
    dDay: "D-14",
    date: "7월 21일"
  },
  {
    category: "방학",
    title: "여름방학",
    dDay: "D-21",
    date: "7월 28일"
  }
];

export const initialAssessments: Assessment[] = [
  {
    id: "ass-1",
    title: "국어 문학 감상문",
    type: "학교 배포",
    dDay: "D-3",
    isUrgent: true
  },
  {
    id: "ass-2",
    title: "화학 실험 보고서",
    type: "개인 추가",
    dDay: "D-14"
  },
  {
    id: "ass-3",
    title: "영어 에세이",
    type: "학교 배포",
    dDay: "완료",
    isCompleted: true
  }
];

export const initialNotices: NoticeItem[] = [
  {
    id: "notice-1",
    title: "이번 주 금요일 단축수업 안내",
    department: "교무부",
    timeAgo: "2시간 전",
    isEmergency: true,
    category: "emergency"
  },
  {
    id: "notice-2",
    title: "1학기 기말고사 유의사항 안내",
    department: "학년부",
    timeAgo: "1일 전",
    isImportant: true,
    category: "academic"
  },
  {
    id: "notice-3",
    title: "급식 메뉴 변경 안내 (7월 10일)",
    department: "영양실",
    timeAgo: "2일 전",
    category: "life"
  },
  {
    id: "notice-4",
    title: "여름방학 방과후 학교 신청 안내",
    department: "방과후학교부",
    timeAgo: "3일 전",
    category: "academic"
  }
];

export const mealMenu = ["치킨마요덮밥", "미소된장국", "깍두기", "귤"];

export const avatarUrls = {
  woosung: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhl0qbd-oNYCBRvpG-r0QylUJYNi8OCJS_xEpIsetDiAPLE62Ohusvs8FUwI-7scumWGW3qUAMCvpC-3LMmq5CwRWsjsW_JHv7dlsdz2dObRkTO18-Jbw2XPsxidFprrCo6FH2rX-PCw6zsnbOGL9lRCSETWSQDMFwRButkH6XCgsD-fkfWRubpZDlVIlO6dte2IrJ26xqCCwv3xId65RvL49Y63K0vmD9nxqjGiTDYWniEU7F5zudGdImPcYVAnVLVDPdIQzbiDrT",
  femaleUniform1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAIousZs13HlgDgP-vHbDbk0fz_KxWMA38LMqwFaNZqy6sx7D7rn1YEpQUWkvwB9D91EiS1NaK1O3mAZgGJl0SjKNDhvx-AII6Khvi4BnJEVS_1TkICthp8jq_m5kB8T5fgBzyXgY7nawDADdBpUS0lW9CElY8NAJd1-tvA7UkLq70jedatR61e5SiKCIKL5Z0opTPHULLcBO5VYlG6fzFzxjtH7khvVR-7-JC9Zm_mbcZS4ABp0FQDjeDwQdw_wnipVdzb7cZ3sKL",
  femaleUniform2: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5TiXKL8-_h_H-GbnHjivrNGA4Rnf4s_bVM1N9TkK-2rnR41jBSH3o0HCSsjJx-N4j8lbMJukFSxOXwBCmgSXB6Y3dr_UBHV9iKv9DKHnTT_pd7Ct6k10fZubWzRWSy25bdYz-hpp701jRfw3WJp-cWb6zKPFdbIxIZ7HSMm8hIB_B9eqXaGZ5ZpFNE4UzX2trvNCW38aGRPRU8vgmVKRV-1e3iiSLzWIBBDxKw-fZt41Y526qeWu50Dchuoz2jXv5m-Hufx0zYCJB",
  femaleUniform3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvMgYpZyOJmpGNMuHknuxU17IviLbytRV0S3aAsarjBR8gie2pDOrpqXhFunPaqsdmLM4ZPff59skeMwWaehEE2VoKO5BZP0ocGv8Q7RNCHPkvSYb6ddc7Ow6xvi3jn5U2tqUrvaINwmI8ovjKss11XKTBI0wrYLmD0pdRuE1cW-oWmCS07ktDqK-Qb8PTiz6vfRI4wSEcOv9sJZjAmUqS6p4BFyn52Ie7vEWMo4CRxa9yV2gkrKRHpsMb7cYTHUCVOSh_QwEdCaSw",
  avatarYellowBg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkY65YTX9xs66XlRpNtLBw-MMMDXTO7PgoiOON1AlqpP5OxqY4_ltsRkrKuQ1tzoO8DwjTtfbKLbX-tq9qaVS2k4OLWpK9IZQvm5bqiDhRqpVFQBqM8ECJoZhORcTrAndp00zngQUngcxmT_R-b53JB1SeC0f95l6THb-vZUyWq7zFjDAPIkd9eTpWnLja4ljdkQPuVhn4IP4ZwP4PgSmVCeEPI8Kw5HB4z4OzdD7e6KEsEjN7I_ZYJF1XwFbpqWsKevAofhWROa35",
  barcode: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzsd9_pSLbYcR8IcXj5ycINSCFJQZv8GNnA15Y3bG7uO0gSR7m0se7YnuT74Pv8GivYhK-z9NM27C6bhVQHSX5Cp4QtNWQMAJwvTQJu4ypqPhTKNMS0eemHcH6nPeUDUwnU11sRwnNV9TZSwalq_cCSlmIuEduUps___gjaZhuI3Q-9iIXeU7VS-Gqz4lqf2xy12TuUq4Itw2BMJ01aM5aW9CnfVtpPEYIxnit-dayHsad1PzpS4mWZAzlIql7nBW-T1GwAwsStFvr"
};

// Simple mock data for development
export const mockUser = {
  id: '1',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  major: 'Công nghệ thông tin',
  subMajor: 'Kỹ thuật phần mềm',
  role: 'student' as const,
  isInGroup: false,
};

export const mockGroups = [
  {
    id: 'group1',
    name: 'Nhóm Frontend',
    description: 'Tìm kiếm thành viên có kinh nghiệm React Native',
    currentMembers: 3,
    maxMembers: 6,
    isRecruiting: true,
    majors: ['CNTT', 'KTPM'],
  },
  {
    id: 'group2',
    name: 'Nhóm Backend',
    description: 'Tìm kiếm thành viên có kinh nghiệm Node.js',
    currentMembers: 2,
    maxMembers: 5,
    isRecruiting: true,
    majors: ['CNTT'],
  },
];

export const mockNotifications = [
  {
    id: 'notif1',
    title: 'Yêu cầu tham gia nhóm',
    message: 'Nguyễn Văn A muốn tham gia nhóm Frontend',
    isRead: false,
    time: '2 giờ trước',
  },
  {
    id: 'notif2',
    title: 'Thành viên mới',
    message: 'Trần Thị B đã tham gia nhóm Backend',
    isRead: true,
    time: '1 ngày trước',
  },
];

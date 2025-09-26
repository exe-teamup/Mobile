# EXE TeamUp Mobile App

Ứng dụng quản lý phân chia nhóm sinh viên cho môn EXE.

## 🚀 Tính năng chính

- **Quản lý nhóm**: Tạo, tham gia, quản lý nhóm 4-6 thành viên
- **Tìm kiếm nhóm**: Xem danh sách nhóm đang tuyển thành viên
- **Thông báo**: Nhận thông báo về hoạt động nhóm
- **Hồ sơ cá nhân**: Quản lý thông tin và trạng thái

## 🛠 Công nghệ sử dụng

- **Expo Router**: Navigation và routing
- **TypeScript**: Type safety
- **React Native**: Cross-platform mobile development
- **ESLint + Prettier**: Code quality
- **Husky**: Git hooks

## 📁 Cấu trúc dự án

```
Mobile/
├── app/                   # Expo Router pages
│   ├── (tab)/             # Tab navigation
│   │   ├── index.tsx      # Home
│   │   ├── post.tsx       # Post
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   └── _layout.tsx        # Root layout
├── components/            # Shared components
├── lib/                   # Business logic
│   ├── data/              # Mock data
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom hooks
│   ├── services/          # API services
│   ├── store/             # State management
│   └── utils/             # Utility functions
├── constants/             # App constants
└── assets/               # Images, fonts, etc.
```

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm start
or
npx expo

# Chạy trên iOS
npm run ios

# Chạy trên Android
npm run android
```

## 📝 Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Development

Dự án sử dụng:

- **Husky** cho git hooks
- **Lint-staged** cho pre-commit linting
- **ESLint + Prettier** cho code quality
- **TypeScript** cho type safety

## 📱 Màn hình chính

1. **Home**: Dashboard với thông tin tổng quan
2. **Post**: Tạo bài đăng (chỉ leader)
3. **Notifications**: Danh sách thông báo
4. **Profile**: Hồ sơ cá nhân và cài đặt

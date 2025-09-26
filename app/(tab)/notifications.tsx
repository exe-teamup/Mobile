import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Mock notification data
const mockNotifications = [
  {
    id: '1',
    type: 'group_application',
    title: 'Yêu cầu tham gia nhóm',
    message: 'Nguyễn Văn A muốn tham gia nhóm Frontend của bạn',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z',
    groupId: 'group1',
  },
  {
    id: '2',
    type: 'group_join',
    title: 'Thành viên mới',
    message: 'Trần Thị B đã tham gia nhóm Backend',
    isRead: true,
    createdAt: '2024-01-15T09:15:00Z',
    groupId: 'group2',
  },
  {
    id: '3',
    type: 'deadline_reminder',
    title: 'Nhắc nhở hạn chốt',
    message: 'Nhóm của bạn cần hoàn thành trước ngày 20/01/2024',
    isRead: false,
    createdAt: '2024-01-15T08:00:00Z',
  },
];

export default function NotificationsScreen() {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'group_application':
        return 'person.badge.plus';
      case 'group_join':
        return 'person.2.fill';
      case 'group_leave':
        return 'person.2.slash';
      case 'deadline_reminder':
        return 'clock.fill';
      default:
        return 'bell.fill';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'group_application':
        return '#FF9500';
      case 'group_join':
        return '#34C759';
      case 'group_leave':
        return '#FF3B30';
      case 'deadline_reminder':
        return '#FF9500';
      default:
        return '#007AFF';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <Text style={styles.headerSubtitle}>
          {unreadCount > 0 ? `${unreadCount} thông báo mới` : 'Tất cả đã đọc'}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {mockNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="bell.slash" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Không có thông báo</Text>
            <Text style={styles.emptySubtitle}>
              Bạn sẽ nhận được thông báo khi có hoạt động mới
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {mockNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.isRead && styles.unreadNotification,
                ]}
              >
                <View style={styles.notificationIcon}>
                  <IconSymbol
                    name={getNotificationIcon(notification.type)}
                    size={20}
                    color={getNotificationColor(notification.type)}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {formatTime(notification.createdAt)}
                  </Text>
                </View>
                {!notification.isRead && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {unreadCount > 0 && (
        <TouchableOpacity style={styles.markAllReadButton}>
          <Text style={styles.markAllReadText}>Đánh dấu tất cả đã đọc</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5F4FF',
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  notificationsList: {
    padding: 15,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
    marginTop: 8,
  },
  markAllReadButton: {
    backgroundColor: '#007AFF',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  markAllReadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

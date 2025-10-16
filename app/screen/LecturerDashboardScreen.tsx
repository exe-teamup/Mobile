import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LecturerDashboardScreen() {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2025');

  const metrics = [
    {
      label: 'Nhóm được phân công',
      value: '18',
      icon: 'people-outline',
      color: '#FF7A00',
    },
    {
      label: 'Cần kiểm tra Checkpoint',
      value: '4',
      icon: 'alert-circle-outline',
      color: '#FF9500',
    },
    {
      label: 'Sinh viên hướng dẫn',
      value: '90',
      icon: 'school-outline',
      color: '#34C759',
    },
  ];

  const workloadData = [
    {
      code: 'EXE201',
      name: 'Experiential Entrepreneurship',
      groups: 6,
      total: 6,
    },
    { code: 'SWP391', name: 'Software Project', groups: 8, total: 8 },
    { code: 'PRN211', name: 'Basic Cross-Platform', groups: 4, total: 6 },
  ];

  const recentActivities = [
    {
      group: 'Project Alpha',
      action: 'đã nộp Checkpoint 1',
      time: '2 giờ trước',
      type: 'success',
    },
    {
      group: 'Team Delta',
      action: 'hoàn tất thành viên',
      time: '5 giờ trước',
      type: 'info',
    },
    {
      group: 'Group Beta',
      action: 'cần review Checkpoint 2',
      time: '1 ngày trước',
      type: 'warning',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#FF7A00', '#FF5500']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <ThemedText type="defaultSemiBold" style={styles.greeting}>
                Chào mừng, GV Minh An!
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Quản lý nhóm và workload của bạn
              </ThemedText>
            </View>
            <Image
              source={require('@/assets/images/dembele.jpg')}
              style={styles.avatar}
            />
          </View>

          {/* Semester Selector */}
          <TouchableOpacity style={styles.semesterSelector} activeOpacity={0.8}>
            <Ionicons name="calendar-outline" size={18} color="#007AFF" />
            <ThemedText style={styles.semesterText}>
              {selectedSemester}
            </ThemedText>
            <Ionicons name="chevron-down" size={18} color="#007AFF" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Metrics Cards */}
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View
                style={[
                  styles.metricIcon,
                  { backgroundColor: `${metric.color}15` },
                ]}
              >
                <Ionicons
                  name={metric.icon as any}
                  size={24}
                  color={metric.color}
                />
              </View>
              <ThemedText type="title" style={styles.metricValue}>
                {metric.value}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
            </View>
          ))}
        </View>

        {/* Workload Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Phân bổ Workload
            </ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: '#007AFF', fontSize: 14 }}>
                Xem tất cả
              </ThemedText>
            </TouchableOpacity>
          </View>

          {workloadData.map((course, index) => (
            <View key={index} style={styles.workloadCard}>
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold">{course.code}</ThemedText>
                <ThemedText style={styles.courseName}>{course.name}</ThemedText>
              </View>
              <View style={styles.workloadBadge}>
                <ThemedText style={styles.workloadText}>
                  {course.groups}/{course.total} nhóm
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Hoạt động gần đây
            </ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: '#007AFF', fontSize: 14 }}>
                Xem tất cả
              </ThemedText>
            </TouchableOpacity>
          </View>

          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <View
                style={[
                  styles.activityDot,
                  {
                    backgroundColor:
                      activity.type === 'success'
                        ? '#34C759'
                        : activity.type === 'warning'
                          ? '#FF9500'
                          : '#007AFF',
                  },
                ]}
              />
              <View style={{ flex: 1 }}>
                <ThemedText>
                  <ThemedText type="defaultSemiBold">
                    {activity.group}
                  </ThemedText>{' '}
                  {activity.action}
                </ThemedText>
                <ThemedText style={styles.activityTime}>
                  {activity.time}
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: { color: '#fff', fontSize: 18 },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    fontSize: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  semesterSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  semesterText: { flex: 1, fontWeight: '600', color: '#007AFF' },
  metricsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -30,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricValue: { fontSize: 24, marginBottom: 4 },
  metricLabel: { fontSize: 11, color: '#666', textAlign: 'center' },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16 },
  workloadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  courseName: { fontSize: 13, color: '#666', marginTop: 2 },
  workloadBadge: {
    backgroundColor: '#FF7A0015',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  workloadText: { color: '#FF7A00', fontSize: 13, fontWeight: '600' },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  activityDot: { width: 8, height: 8, borderRadius: 4 },
  activityTime: { fontSize: 12, color: '#999', marginTop: 2 },
});

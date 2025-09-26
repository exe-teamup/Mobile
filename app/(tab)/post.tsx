import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PostScreen() {
  // Mock data - trong thực tế sẽ lấy từ store
  const isInGroup = false; // Giả sử user chưa có nhóm
  const isLeader = false; // Giả sử user chưa là leader

  const handleCreatePost = () => {
    if (!isLeader) {
      Alert.alert(
        'Xác nhận',
        'Bạn có muốn trở thành leader không? Chỉ leader mới có thể tạo bài đăng.',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đồng ý', onPress: () => console.log('Become leader') },
        ]
      );
    } else {
      // Navigate to create post screen
      console.log('Navigate to create post');
    }
  };

  if (isInGroup && !isLeader) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <IconSymbol name="person.2.fill" size={80} color="#ccc" />
          <Text style={styles.title}>Bạn đã là thành viên</Text>
          <Text style={styles.subtitle}>
            Chỉ leader mới có thể tạo bài đăng. Bạn đang là thành viên trong
            nhóm.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tạo bài đăng</Text>
        <Text style={styles.headerSubtitle}>
          Chia sẻ thông tin về nhóm của bạn
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreatePost}
        >
          <IconSymbol name="plus.circle.fill" size={24} color="#fff" />
          <Text style={styles.createButtonText}>Tạo bài đăng mới</Text>
        </TouchableOpacity>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Bài đăng của bạn</Text>
          <View style={styles.emptyState}>
            <IconSymbol name="doc.text" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Chưa có bài đăng nào</Text>
            <Text style={styles.emptySubtext}>
              Tạo bài đăng đầu tiên để bắt đầu tuyển thành viên
            </Text>
          </View>
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});

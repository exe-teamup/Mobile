import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Group = {
  id: string;
  name: string;
  status: 'finalized' | 'pending' | 'active';
  members: number;
  totalMembers: number;
  course: string;
};

export default function MyGroupsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'main' | 'support'>('main');

  const groups: Group[] = [
    {
      id: '1',
      name: 'Project Alpha',
      status: 'finalized',
      members: 6,
      totalMembers: 6,
      course: 'EXE201',
    },
    {
      id: '2',
      name: 'Team Delta',
      status: 'active',
      members: 5,
      totalMembers: 6,
      course: 'SWP391',
    },
    {
      id: '3',
      name: 'Group Beta',
      status: 'pending',
      members: 4,
      totalMembers: 6,
      course: 'EXE201',
    },
    {
      id: '4',
      name: 'Innovation Squad',
      status: 'finalized',
      members: 6,
      totalMembers: 6,
      course: 'PRN211',
    },
    {
      id: '5',
      name: 'Tech Titans',
      status: 'active',
      members: 5,
      totalMembers: 6,
      course: 'SWP391',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalized':
        return '#34C759';
      case 'pending':
        return '#FF9500';
      case 'active':
        return '#007AFF';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'finalized':
        return 'Đã hoàn tất';
      case 'pending':
        return 'Chờ checkpoint';
      case 'active':
        return 'Đang hoạt động';
      default:
        return status;
    }
  };

  const renderGroupCard = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.groupCard}
      activeOpacity={0.7}
      onPress={() =>
        router.push(`/screen/GroupDetailScreen?id=${item.id}` as any)
      }
    >
      <View style={styles.groupHeader}>
        <View style={{ flex: 1 }}>
          <ThemedText type="defaultSemiBold" style={styles.groupName}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.courseName}>{item.course}</ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}15` },
          ]}
        >
          <ThemedText
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {getStatusText(item.status)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.groupFooter}>
        <View style={styles.memberInfo}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <ThemedText style={styles.memberText}>
            {item.members}/{item.totalMembers} thành viên
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <ThemedText style={styles.viewButtonText}>Xem chi tiết</ThemedText>
          <Ionicons name="chevron-forward" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title">Nhóm của tôi</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {groups.length} nhóm được phân công
        </ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          placeholder="Tìm kiếm nhóm..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === 'main' && styles.filterTabActive,
          ]}
          onPress={() => setFilter('main')}
        >
          <ThemedText
            style={[
              styles.filterText,
              filter === 'main' && styles.filterTextActive,
            ]}
          >
            Nhóm chính
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            filter === 'support' && styles.filterTabActive,
          ]}
          onPress={() => setFilter('support')}
        >
          <ThemedText
            style={[
              styles.filterText,
              filter === 'support' && styles.filterTextActive,
            ]}
          >
            Nhóm hỗ trợ
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Groups List */}
      <FlatList
        data={groups}
        renderItem={renderGroupCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, padding: 0 },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  filterTabActive: {
    backgroundColor: '#FF7A00',
  },
  filterText: { fontSize: 14, fontWeight: '600', color: '#666' },
  filterTextActive: { color: '#fff' },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  groupName: { fontSize: 16 },
  courseName: { fontSize: 13, color: '#666', marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { fontSize: 12, fontWeight: '600' },
  groupFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberText: { fontSize: 13, color: '#666' },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: { color: '#FF7A00', fontSize: 14, fontWeight: '600' },
});

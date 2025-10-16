import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import EXEButton from '@/components/ui/EXEButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type Member = {
  id: string;
  name: string;
  studentCode: string;
  major: string;
  role: 'leader' | 'member';
  email: string;
  phone: string;
  avatar?: string;
};

export default function GroupDetailScreen() {
  const router = useRouter();

  const groupInfo = {
    name: 'Project Alpha',
    course: 'EXE201 - Experiential Entrepreneurship',
    status: 'finalized',
    checkpoint: 'Checkpoint 2',
  };

  const members: Member[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      studentCode: 'SE161234',
      major: 'Kỹ thuật phần mềm',
      role: 'leader',
      email: 'annv@fpt.edu.vn',
      phone: '0912345678',
      avatar: require('@/assets/images/dembele.jpg'),
    },
    {
      id: '2',
      name: 'Trần Thị Bình',
      studentCode: 'SE161235',
      major: 'Kỹ thuật phần mềm',
      role: 'member',
      email: 'binhtt@fpt.edu.vn',
      phone: '0987654321',
    },
    {
      id: '3',
      name: 'Lê Minh Cường',
      studentCode: 'IA161236',
      major: 'Trí tuệ nhân tạo',
      role: 'member',
      email: 'cuonglm@fpt.edu.vn',
      phone: '0909123456',
    },
    {
      id: '4',
      name: 'Phạm Thu Dung',
      studentCode: 'MK161237',
      major: 'Marketing',
      role: 'member',
      email: 'dungpt@fpt.edu.vn',
      phone: '0938765432',
    },
  ];

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#FF7A00" />
        </TouchableOpacity>
        <ThemedText type="title" style={{ flex: 1 }}>
          Chi tiết nhóm
        </ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Group Info Card */}
        <View style={styles.infoCard}>
          <ThemedText type="title" style={styles.groupName}>
            {groupInfo.name}
          </ThemedText>
          <ThemedText style={styles.courseName}>{groupInfo.course}</ThemedText>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle" size={18} color="#34C759" />
              <ThemedText style={styles.infoText}>Đã hoàn tất</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="clipboard-outline" size={18} color="#FF7A00" />
              <ThemedText style={styles.infoText}>
                {groupInfo.checkpoint}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Members Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Thành viên ({members.length}/6)
            </ThemedText>
          </View>

          {members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <Image
                  source={member.avatar || require('@/assets/images/icon.png')}
                  style={styles.memberAvatar}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <ThemedText type="defaultSemiBold">
                      {member.name}
                    </ThemedText>
                    {member.role === 'leader' && (
                      <View style={styles.leaderBadge}>
                        <Ionicons name="star" size={12} color="#FF9500" />
                        <ThemedText style={styles.leaderText}>
                          Nhóm trưởng
                        </ThemedText>
                      </View>
                    )}
                  </View>
                  <ThemedText style={styles.studentCode}>
                    {member.studentCode}
                  </ThemedText>
                  <ThemedText style={styles.major}>{member.major}</ThemedText>
                </View>
              </View>

              {/* Contact Info */}
              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleEmail(member.email)}
                >
                  <Ionicons name="mail-outline" size={18} color="#FF7A00" />
                  <ThemedText style={styles.contactText}>
                    {member.email}
                  </ThemedText>
                </TouchableOpacity>
              </View>

              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleCall(member.phone)}
                >
                  <Ionicons name="call-outline" size={18} color="#34C759" />
                  <ThemedText style={styles.contactText}>
                    {member.phone}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <EXEButton
            title="GỬI EMAIL CHO NHÓM"
            onPress={() => {
              const emails = members.map((m) => m.email).join(',');
              Linking.openURL(`mailto:${emails}`);
            }}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: { marginRight: 8 },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  groupName: { fontSize: 20, marginBottom: 4 },
  courseName: { fontSize: 14, color: '#666', marginBottom: 16 },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: { fontSize: 14, color: '#666' },
  section: { paddingHorizontal: 20 },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16 },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  studentCode: { fontSize: 13, color: '#666', marginTop: 2 },
  major: { fontSize: 12, color: '#999', marginTop: 2 },
  leaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  leaderText: { fontSize: 11, color: '#FF9500', fontWeight: '600' },
  contactRow: {
    marginTop: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: { fontSize: 13, color: '#666' },
  actionsContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
});

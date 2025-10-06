import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileHeader({
  avatar,
  name,
  major,
  isEditing,
  onNameChange,
  onMajorChange,
  status,
  onEdit,
  onStatusPress,
}: {
  avatar: string;
  name: string;
  major: string;
  isEditing: boolean;
  onNameChange: (text: string) => void;
  onMajorChange: (text: string) => void;
  status: string;
  onEdit: () => void;
  onStatusPress: () => void;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.orangeBg} />
      <Image
        source={typeof avatar === 'string' ? { uri: avatar } : avatar}
        style={styles.avatar}
      />
      <Text style={styles.name}>
        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={onNameChange}
            style={styles.input}
            autoCapitalize="words"
          />
        ) : (
          <>
            {name || 'Tên của bạn'}{' '}
            <TouchableOpacity onPress={onStatusPress}>
              <MaterialIcons name="arrow-drop-down" size={20} />
            </TouchableOpacity>
          </>
        )}
      </Text>
      <Text style={styles.major}>
        {isEditing ? (
          <TextInput
            value={major}
            onChangeText={onMajorChange}
            style={styles.input}
            autoCapitalize="words"
          />
        ) : (
          major || 'Ngành của bạn'
        )}
      </Text>
      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <MaterialIcons name="edit" size={18} color="#FF7A00" />
        <Text style={styles.editText}>
          {isEditing ? 'Cập nhật' : 'Chỉnh sửa'}
        </Text>
      </TouchableOpacity>
      {status === 'đang tìm nhóm' && (
        <View style={styles.statusTag}>
          <MaterialIcons name="group" size={16} color="green" />
          <Text style={{ color: 'green', marginLeft: 4 }}>Tìm nhóm</Text>
        </View>
      )}
      {status === 'đã có nhóm' && (
        <View style={styles.statusTag}>
          <MaterialIcons name="group" size={16} color="blue" />
          <Text style={{ color: 'blue', marginLeft: 4 }}>Đã có nhóm</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingBottom: 16, backgroundColor: '#fff' },
  orangeBg: {
    backgroundColor: '#FF7A00',
    height: 120,
    width: '100%',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginTop: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: { fontWeight: 'bold', fontSize: 20, marginTop: 12 },
  major: { color: '#888', marginBottom: 10 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 4,
  },
  editText: { color: '#FF7A00', marginLeft: 5, fontWeight: 'bold' },
  input: {
    borderBottomWidth: 1,
    borderColor: '#FF7A00',
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  statusTag: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
});

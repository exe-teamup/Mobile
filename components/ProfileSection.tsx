import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Profile {
  bio: string;
  contact: { id: string; icon: string; link: string }[];
  skills: string[];
  interested: string[];
}
export default function ProfileSection({
  profile,
  isEditing,
  onUpdateBio,
  onUpdateContact,
  onAddContact,
  onRemoveContact,
  onUpdateSkills,
  onAddSkill,
  onRemoveSkill,
  onUpdateInterests,
  onAddInterest,
  onRemoveInterest,
}: {
  profile: Profile;
  isEditing: boolean;
  onUpdateBio: (text: string) => void;
  onUpdateContact: (id: string, field: string, value: string) => void;
  onAddContact: () => void;
  onRemoveContact: (id: string) => void;
  onUpdateSkills: (index: number, value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onUpdateInterests: (index: number, value: string) => void;
  onAddInterest: () => void;
  onRemoveInterest: (index: number) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Giới thiệu</Text>
        {isEditing ? (
          <TextInput
            value={profile.bio}
            onChangeText={onUpdateBio}
            multiline
            style={styles.input}
          />
        ) : (
          <Text>{profile.bio}</Text>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>📧 Liên hệ</Text>
        {profile.contact.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2,
            }}
          >
            {isEditing ? (
              <>
                <TextInput
                  value={item.icon}
                  onChangeText={(text) =>
                    onUpdateContact(item.id, 'icon', text)
                  }
                  style={styles.input}
                />
                <TextInput
                  value={item.link}
                  onChangeText={(text) =>
                    onUpdateContact(item.id, 'link', text)
                  }
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => onRemoveContact(item.id)}>
                  <Icon name="trash" size={18} color="#FF7A00" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Icon name={item.icon} size={18} style={{ width: 30 }} />
                <Text style={{ marginLeft: 5 }}>{item.link}</Text>
              </>
            )}
          </View>
        ))}
        {isEditing && (
          <TouchableOpacity onPress={onAddContact} style={styles.addButton}>
            <Icon name="plus" size={18} color="#FF7A00" />
            <Text style={styles.addText}>Thêm mới</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>🎓 Trình độ học vấn & Bằng cấp</Text>
        {isEditing ? (
          <>
            {profile.skills.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 2,
                }}
              >
                <TextInput
                  value={item}
                  onChangeText={(text) => onUpdateSkills(index, text)}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => onRemoveSkill(index)}>
                  <Icon name="trash" size={18} color="#FF7A00" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View>
            {profile.skills.map((item, index) => (
              <Text key={index} style={{ marginBottom: 8, lineHeight: 20 }}>
                • {item}
              </Text>
            ))}
          </View>
        )}
        {isEditing && (
          <TouchableOpacity onPress={onAddSkill} style={styles.addButton}>
            <Icon name="plus" size={18} color="#FF7A00" />
            <Text style={styles.addText}>Thêm mới</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>💼 Kinh nghiệm & Nghiên cứu</Text>
        {isEditing ? (
          <>
            {profile.interested.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 2,
                }}
              >
                <TextInput
                  value={item}
                  onChangeText={(text) => onUpdateInterests(index, text)}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => onRemoveInterest(index)}>
                  <Icon name="trash" size={18} color="#FF7A00" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View>
            {profile.interested.map((item, index) => (
              <Text key={index} style={{ marginBottom: 8, lineHeight: 20 }}>
                ✓ {item}
              </Text>
            ))}
          </View>
        )}
        {isEditing && (
          <TouchableOpacity onPress={onAddInterest} style={styles.addButton}>
            <Icon name="plus" size={18} color="#FF7A00" />
            <Text style={styles.addText}>Thêm mới</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.logoutBtn}>
        <Icon name="sign-out" size={20} color="#FF7A00" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  label: { fontWeight: 'bold', marginBottom: 6, color: '#333' },
  input: {
    borderBottomWidth: 1,
    borderColor: '#333',
    flex: 1,
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 12,
  },
  logoutText: { color: '#FF7A00', marginLeft: 6, fontWeight: 'bold' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FF7A00',
    borderRadius: 8,
  },
  addText: { color: '#FF7A00', marginLeft: 6 },
});

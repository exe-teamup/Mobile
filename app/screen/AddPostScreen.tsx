import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import EXEButton from '@/components/ui/EXEButton';
import { savePost } from '@/lib/data/postStore';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const TAGS = [
  'Kỹ thuật phần mềm',
  'Ngôn ngữ',
  'Marketing',
  'Đồ hoạ',
  'Trí tuệ nhân tạo',
];
const HASHTAGS = [
  { id: 'design', label: 'Design' },
  { id: 'finance', label: 'Finance' },
  { id: 'education', label: 'Education' },
];

export default function AddPostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [showRequirements, setShowRequirements] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const slide = useRef(new Animated.Value(0)).current;
  const { height } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(slide, {
      toValue: showConfirm ? 1 : 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [showConfirm, slide]);

  const onCreate = () => {
    // show bottom-sheet confirm instead of Alert
    setShowConfirm(true);
  };

  const onSubmitConfirm = () => {
    // perform save and navigate back to confirm screen
    savePost({
      id: Date.now().toString(),
      title: title || 'Untitled',
      description,
      tags: selectedTags,
      hashtags: selectedHashtags,
    });
    setShowConfirm(false);
    router.replace('/screen/AddPostConfirmScreen' as any);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleHashtag = (id: string) => {
    setSelectedHashtags((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ padding: 8 }}
          >
            <ThemedText style={{ fontSize: 20 }}>{'<'} </ThemedText>
          </TouchableOpacity>
          <ThemedText type="title" style={{ marginLeft: 8 }}>
            Add Post
          </ThemedText>
        </View>

        <View style={styles.profileRow}>
          <Image
            source={require('@/assets/images/dembele.jpg')}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 12 }}>
            <ThemedText type="defaultSemiBold">Nguyễn Văn An</ThemedText>
            <ThemedText style={{ color: '#7A8190' }}>
              Kỹ thuật phần mềm
            </ThemedText>
          </View>
        </View>

        <ThemedText type="defaultSemiBold" style={{ marginTop: 18 }}>
          Tên nhóm
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên nhóm"
          value={title}
          onChangeText={setTitle}
        />

        <ThemedText type="defaultSemiBold" style={{ marginTop: 12 }}>
          Mô tả nhóm
        </ThemedText>
        <TextInput
          style={[styles.input, { height: 120 }]}
          placeholder="Mô tả về dự án của bạn có thực tiếp cận nhóm..."
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
        />

        {/* Ngành yêu cầu Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setShowRequirements(!showRequirements)}
          activeOpacity={0.7}
        >
          <ThemedText type="defaultSemiBold">Ngành yêu cầu</ThemedText>
          <ThemedText style={{ fontSize: 12 }}>
            {showRequirements ? '▲' : '▼'}
          </ThemedText>
        </TouchableOpacity>

        {showRequirements && (
          <>
            {/* Tags */}
            <View style={styles.tagsContainer}>
              {TAGS.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tag,
                    selectedTags.includes(tag) && styles.tagActive,
                  ]}
                  onPress={() => toggleTag(tag)}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.tagText,
                      selectedTags.includes(tag) && styles.tagTextActive,
                    ]}
                  >
                    {tag}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hashtags */}
            <View style={{ marginTop: 16 }}>
              <ThemedText type="defaultSemiBold" style={{ marginBottom: 8 }}>
                Hashtag (tối đa 5)
              </ThemedText>
              {HASHTAGS.map((hashtag) => (
                <TouchableOpacity
                  key={hashtag.id}
                  style={styles.checkboxRow}
                  onPress={() => toggleHashtag(hashtag.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedHashtags.includes(hashtag.id) &&
                        styles.checkboxActive,
                    ]}
                  >
                    {selectedHashtags.includes(hashtag.id) && (
                      <ThemedText style={styles.checkmark}>✓</ThemedText>
                    )}
                  </View>
                  <ThemedText>{hashtag.label}</ThemedText>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={{ marginTop: 8 }}>
                <ThemedText style={{ color: '#18A54A', fontWeight: '600' }}>
                  + Thêm tag
                </ThemedText>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Contact Section */}
        <View style={{ marginTop: 16 }}>
          <ThemedText style={{ fontSize: 13, marginBottom: 8 }}>
            🔍 Nhập tên, email để tìm ở mất 2 thành viên
          </ThemedText>
          <ThemedText style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            Đã chọn 1/2
          </ThemedText>
          <View style={styles.contactChip}>
            <ThemedText style={{ color: '#FF7A00', fontSize: 13 }}>
              annvhe181123@fpt.edu.vn
            </ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: '#999' }}>✕</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <EXEButton title="ĐĂNG BÀI" onPress={onCreate} />
        </View>
      </ScrollView>

      {/* bottom-sheet confirm */}
      <Animated.View
        pointerEvents={showConfirm ? 'auto' : 'none'}
        style={[
          styles.sheetWrap,
          {
            opacity: slide,
            transform: [
              {
                translateY: slide.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height * 0.4, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.sheetHandle} />
        <ThemedText
          type="defaultSemiBold"
          style={{ textAlign: 'center', marginBottom: 8 }}
        >
          Sẵn sàng đăng bài?
        </ThemedText>
        <ThemedText
          style={{ textAlign: 'center', color: '#666', marginBottom: 16 }}
        >
          Hãy kiểm tra lại các thông tin để chắc chắn bài đăng tốt nhất.
        </ThemedText>
        <View style={{ paddingHorizontal: 16 }}>
          <EXEButton title="ĐĂNG BÀI" onPress={onSubmitConfirm} />
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowConfirm(false)}
          >
            <ThemedText style={{ color: '#fff', fontWeight: '700' }}>
              QUAY LẠI
            </ThemedText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 6 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  sheetWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#2B2540',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 12,
  },
  cancelBtn: {
    marginTop: 12,
    backgroundColor: '#18A54A',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tagActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  tagText: {
    fontSize: 13,
    color: '#666',
  },
  tagTextActive: {
    color: '#FFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});

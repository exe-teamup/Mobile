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
export default function AddPostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      tags: [],
    });
    setShowConfirm(false);
    router.replace('/screen/AddPostConfirmScreen' as any);
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
          placeholder="Mô tả"
          value={description}
          onChangeText={setDescription}
          multiline
        />

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
});

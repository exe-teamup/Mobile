import React, { useState, useRef, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import EXEButton from '@/components/ui/EXEButton';
import { getPost } from '@/lib/data/postStore';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function AddPostConfirmScreen() {
  const router = useRouter();
  const post = getPost();
  const [showConfirm, setShowConfirm] = useState(false);
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: showConfirm ? 1 : 0,
      duration: 320,
      useNativeDriver: true,
    }).start();
  }, [showConfirm, slide]);

  const openCreate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowConfirm(true);
  };

  const onCreateConfirm = () => {
    setShowConfirm(false);
    router.push('/screen/AddPostScreen' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <ThemedText type="title">Tạo bài viết</ThemedText>
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

        {!post ? (
          <View style={{ marginTop: 28 }}>
            <EXEButton title="TẠO POST TUYỂN THÀNH VIÊN" onPress={openCreate} />
          </View>
        ) : (
          <View style={{ marginTop: 18 }}>
            <ThemedText type="defaultSemiBold" style={{ marginBottom: 12 }}>
              Bài đăng của bạn
            </ThemedText>
            <View style={styles.postCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ThemedText style={{ fontWeight: '700', fontSize: 16 }}>
                  {post.title}
                </ThemedText>
                <TouchableOpacity
                  onPress={() =>
                    router.push('/screen/PostPreviewScreen' as any)
                  }
                >
                  <ThemedText style={{ color: '#FF7A00', fontWeight: '700' }}>
                    Detail
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <ThemedText style={{ color: '#666', marginTop: 8 }}>
                {post.description}
              </ThemedText>
              <View style={{ marginTop: 12 }}>
                <EXEButton
                  title="XEM CHI TIẾT"
                  onPress={() =>
                    router.push('/screen/PostPreviewScreen' as any)
                  }
                />
              </View>
            </View>
          </View>
        )}
      </View>

      {/* confirm bottom sheet */}
      {/** Animated overlay **/}
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
                  outputRange: [200, 0],
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
          Bạn có chắc muốn tạo bài đăng?
        </ThemedText>
        <ThemedText
          style={{ textAlign: 'center', color: '#666', marginBottom: 16 }}
        >
          Bạn sẽ trở thành leader và không có khả năng ứng tuyển vào các nhóm
          khác.
        </ThemedText>
        <View style={{ paddingHorizontal: 16 }}>
          <EXEButton title="TẠO BÀI ĐĂNG" onPress={onCreateConfirm} />
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
  headerRow: { paddingTop: 6 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },
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

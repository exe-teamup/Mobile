import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import EXEButton from '@/components/ui/EXEButton';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProjectDetailScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const headerScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(headerScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, headerScale]);

  const onCTAPressIn = () =>
    Animated.spring(headerScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  const onCTAPressOut = () =>
    Animated.spring(headerScale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          style={[
            styles.header,
            { opacity: fade, transform: [{ scale: headerScale }] },
          ]}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <ThemedText type="title" style={styles.title}>
            Phát triển hệ thống với Google Cloud
          </ThemedText>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            {
              opacity: fade,
              transform: [
                {
                  translateY: fade.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ThemedText type="defaultSemiBold">Tên dự án</ThemedText>
          <ThemedText style={styles.fieldValue}>
            Phát triển hệ thống với Google Cloud
          </ThemedText>

          <ThemedText type="defaultSemiBold" style={{ marginTop: 12 }}>
            Mô tả dự án
          </ThemedText>
          <ThemedText style={styles.fieldValue}>
            [CAMPUS HCM] Xin chào mọi người, hiện tại nhóm mình đang cần tìm
            teammate cho môn EXE201. Nhóm muốn phát triển hệ thống triển khai
            trên Google Cloud...
          </ThemedText>

          <ThemedText type="defaultSemiBold" style={{ marginTop: 12 }}>
            Chuyên ngành đang tìm
          </ThemedText>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <ThemedText style={{ color: '#FF7A00' }}>Trí tuệ nhân</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={{ color: '#FF7A00' }}>Marketing</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={{ color: '#FF7A00' }}>
                Kỹ thuật phần mềm
              </ThemedText>
            </View>
          </View>

          <ThemedText type="defaultSemiBold" style={{ marginTop: 12 }}>
            Hashtag
          </ThemedText>
          <View style={styles.tagsRow}>
            <View style={styles.hash}>
              <ThemedText>Google</ThemedText>
            </View>
            <View style={styles.hash}>
              <ThemedText>Công nghệ đám mây</ThemedText>
            </View>
          </View>

          <ThemedText type="defaultSemiBold" style={{ marginTop: 12 }}>
            Thông tin về nhóm
          </ThemedText>
          <ThemedText style={styles.fieldValue}>
            Trưởng nhóm: Nguyễn Văn An
          </ThemedText>
          <ThemedText style={styles.fieldValue}>
            Chuyên ngành: Kỹ thuật phần mềm
          </ThemedText>
          <ThemedText style={styles.fieldValue}>Số thành viên: 3/6</ThemedText>

          <ThemedText type="defaultSemiBold" style={{ marginTop: 12 }}>
            Thông tin liên hệ
          </ThemedText>
          <ThemedText style={styles.fieldValue}>
            Facebook · Zalo · Discord
          </ThemedText>

          <View style={{ marginTop: 18 }}>
            <TouchableOpacity
              onPressIn={onCTAPressIn}
              onPressOut={onCTAPressOut}
              activeOpacity={0.95}
            >
              <EXEButton title="XIN VÀO NHÓM" onPress={() => {}} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  header: { alignItems: 'center', marginBottom: 12 },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 8,
    elevation: 6,
  },
  title: { fontSize: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 6,
  },
  fieldValue: { marginTop: 6, color: '#444', lineHeight: 20 },
  tagsRow: { flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#FFF3EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  hash: {
    backgroundColor: '#F6F8FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
});

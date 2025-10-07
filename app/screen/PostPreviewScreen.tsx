import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getPost } from '@/lib/data/postStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function PostPreviewScreen() {
  const router = useRouter();
  const post = getPost();

  if (!post) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Không có bài đăng</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="defaultSemiBold">{post.title}</ThemedText>
        <ThemedText style={{ marginTop: 8 }}>{post.description}</ThemedText>

        <View style={{ marginTop: 16 }}>
          <TouchableOpacity
            onPress={() =>
              router.replace('/screen/AddPostConfirmScreen' as any)
            }
            style={styles.btn}
          >
            <ThemedText style={{ color: '#fff', fontWeight: '700' }}>
              Quay về
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  btn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
});

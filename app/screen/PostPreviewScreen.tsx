import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import EXEButton from '@/components/ui/EXEButton';
import { getPost } from '@/lib/data/postStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';

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
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.card}>
          <ThemedText type="title" style={{ marginBottom: 4 }}>
            {post.title}
          </ThemedText>
          <ThemedText style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
            28 minutes ago
          </ThemedText>

          <ThemedText type="defaultSemiBold" style={{ marginBottom: 8 }}>
            Mô tả
          </ThemedText>
          <ThemedText style={{ marginBottom: 16, lineHeight: 20 }}>
            {post.description}
          </ThemedText>

          {post.tags && post.tags.length > 0 && (
            <>
              <ThemedText type="defaultSemiBold" style={{ marginBottom: 8 }}>
                Ngành yêu cầu
              </ThemedText>
              <View style={styles.tagsContainer}>
                {post.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <ThemedText style={styles.tagText}>{tag}</ThemedText>
                  </View>
                ))}
              </View>
            </>
          )}

          {post.hashtags && post.hashtags.length > 0 && (
            <>
              <ThemedText
                type="defaultSemiBold"
                style={{ marginTop: 12, marginBottom: 8 }}
              >
                Hashtags
              </ThemedText>
              <View style={styles.tagsContainer}>
                {post.hashtags.map((tag, index) => (
                  <View
                    key={index}
                    style={[styles.tag, { backgroundColor: '#E8F5E9' }]}
                  >
                    <ThemedText style={[styles.tagText, { color: '#18A54A' }]}>
                      #{tag}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={{ marginTop: 20 }}>
            <EXEButton
              title="QUAY VỀ"
              onPress={() =>
                router.replace('/screen/AddPostConfirmScreen' as any)
              }
            />
          </View>
        </View>
      </ScrollView>
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
  },
  tagText: {
    fontSize: 12,
    color: '#FF7A00',
    fontWeight: '500',
  },
});

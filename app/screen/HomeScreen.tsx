import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import EXEButton from '@/components/ui/EXEButton';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#0A7EA4', '#2E86AB']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.headerCard}
        >
          <View style={styles.headerTop}>
            <View>
              <ThemedText type="defaultSemiBold" style={styles.greeting}>
                Hi, Minh An!
              </ThemedText>
              <ThemedText type="subtitle" style={styles.headerSubtitle}>
                Find your dream team here
              </ThemedText>
            </View>

            <Image
              source={require('@/assets/images/dembele.jpg')}
              style={styles.avatar}
            />
          </View>

          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Ionicons
                name="search"
                size={18}
                color="#9AA4B2"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Search teams, skills, tags..."
                placeholderTextColor="#9AA4B2"
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.sectionRow}>
          <ThemedText type="defaultSemiBold">Các chuyên ngành</ThemedText>
          <ThemedText type="link">Xem tất cả</ThemedText>
        </View>

        <Animated.View
          style={[
            styles.grid,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {[
            {
              label: 'Design',
              icon: require('@/assets/images/partial-react-logo.png'),
              count: 2,
            },
            {
              label: 'Finance',
              icon: require('@/assets/images/react-logo.png'),
              count: 3,
            },
            {
              label: 'Kỹ thuật',
              icon: require('@/assets/images/react-logo@2x.png'),
              count: 4,
            },
            {
              label: 'Ngôn ngữ Nhật',
              icon: require('@/assets/images/logo.png'),
              count: 0,
            },
            {
              label: 'Marketing',
              icon: require('@/assets/images/exeteamup.png'),
              count: 10,
            },
            {
              label: 'Trí tuệ nhân',
              icon: require('@/assets/images/Group 67.png'),
              count: 2,
            },
          ].map((c, i) => (
            <Animated.View
              key={i}
              style={{ transform: [{ scale: scaleAnim }], marginBottom: 8 }}
            >
              <TouchableOpacity
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={0.85}
                style={styles.cardItem}
              >
                <View style={styles.cardIconWrap}>
                  <Image
                    source={c.icon}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <ThemedText type="defaultSemiBold" style={styles.cardLabel}>
                  {c.label}
                </ThemedText>
                <ThemedText
                  style={styles.cardCount}
                >{`${c.count} posts`}</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        <View style={styles.recommendCard}>
          <View style={styles.recommendRow}>
            <Image
              source={require('@/assets/images/Group 74.png')}
              style={styles.recommendLogo}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <ThemedText type="defaultSemiBold">
                Phát triển hệ thống với Google Cloud
              </ThemedText>
              <ThemedText style={{ marginTop: 6, color: '#666' }}>
                Nhóm đang làm một hệ thống với công nghệ đưa lên Cloud của
                Google...
              </ThemedText>
            </View>
            <View style={styles.badge}>
              <ThemedText style={{ color: '#0A2444' }}>3/6</ThemedText>
            </View>
          </View>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <ThemedText style={{ color: '#FF7A00' }}>Trí tuệ nhân</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={{ color: '#FF7A00' }}>Marketing</ThemedText>
            </View>
          </View>

          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => {
                Haptics.selectionAsync();
              }}
            >
              <EXEButton title="XEM CHI TIẾT" onPress={() => {}} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  headerCard: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#0A7EA4',
    marginBottom: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { color: '#fff' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  headerSubtitle: { color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  title: { color: '#fff', marginTop: 8 },
  searchRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
  searchBox: {
    flex: 1,
    backgroundColor: '#ffffffee',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 46,
  },
  searchInput: { flex: 1, padding: 0, color: '#0A2444' },
  filterButton: {
    marginLeft: 12,
    width: 46,
    height: 46,
    backgroundColor: '#FF7A00',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: { width: 20, height: 20, tintColor: '#fff' },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  cardIconWrap: {
    backgroundColor: '#F6FBFF',
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardIcon: { width: 36, height: 36 },
  cardLabel: { fontSize: 13, textAlign: 'center' },
  cardCount: { fontSize: 12, color: '#9AA4B2' },
  recommendCard: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
  },
  recommendRow: { flexDirection: 'row', alignItems: 'center' },
  recommendLogo: { width: 56, height: 56, borderRadius: 12 },
  badge: {
    backgroundColor: '#E6F7FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagsRow: { flexDirection: 'row', marginTop: 12 },
  tag: {
    backgroundColor: '#FFF3EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  blobOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    backgroundColor: 'rgba(255,160,80,0.12)',
    borderRadius: 220,
    top: -40,
    left: -40,
    transform: [{ rotate: '20deg' }],
  },
  blobTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    backgroundColor: 'rgba(10,126,164,0.12)',
    borderRadius: 180,
    top: -20,
    right: -50,
    transform: [{ rotate: '-10deg' }],
  },
  // small platform specific tweak
  androidShadow: Platform.OS === 'android' ? { elevation: 4 } : {},
});

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProjectSuccessScreen() {
  const router = useRouter();
  const anim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [anim, logoScale]);

  const onPrimaryPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/');
  };

  const onSecondaryPress = () => {
    Haptics.selectionAsync();
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            style={styles.iconBtn}
          >
            <Ionicons name="arrow-back" size={20} color="#0A2444" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => Haptics.selectionAsync()}
          >
            <Ionicons name="ellipsis-vertical" size={20} color="#0A2444" />
          </TouchableOpacity>
        </View>

        {/* confetti dots */}
        <View style={styles.confettiWrap} pointerEvents="none">
          <Animated.View
            style={[
              styles.confetti,
              { backgroundColor: '#FFB199', opacity: anim },
            ]}
          />
          <Animated.View
            style={[
              styles.confetti,
              { backgroundColor: '#8CE6FF', opacity: anim, left: 40, top: 10 },
            ]}
          />
          <Animated.View
            style={[
              styles.confetti,
              { backgroundColor: '#D6F6C7', opacity: anim, left: -28, top: 28 },
            ]}
          />
        </View>

        <Animated.Image
          source={require('@/assets/images/Group 74.png')}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />

        <ThemedText type="defaultSemiBold" style={styles.successTitle}>
          Gửi yêu cầu thành công
        </ThemedText>
        <ThemedText style={styles.successSubtitle}>
          Chúc mừng, yêu cầu của bạn đã được gửi đi
        </ThemedText>

        <View style={{ marginTop: 20, width: '100%' }}>
          <TouchableOpacity activeOpacity={0.9} onPress={onPrimaryPress}>
            <LinearGradient
              colors={['#FF7A00', '#FF8E2B']}
              start={[0, 0]}
              end={[1, 1]}
              style={styles.primaryBtn}
            >
              <ThemedText style={styles.primaryText}>TÌM THÊM NHÓM</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.secondary}
          onPress={onSecondaryPress}
          activeOpacity={0.9}
        >
          <ThemedText style={{ color: '#fff', fontWeight: '700' }}>
            VỀ MÀN HÌNH CHÍNH
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 8,
  },
  headerRow: { width: '100%', flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 8 },
  logoWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F6FBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  logo: { width: 88, height: 88 },
  successTitle: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  successSubtitle: { marginTop: 8, color: '#666', textAlign: 'center' },
  primaryBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondary: {
    marginTop: 12,
    backgroundColor: '#18A54A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  confettiWrap: {
    position: 'absolute',
    top: 18,
    right: 40,
    width: 80,
    height: 80,
  },
  confetti: { width: 10, height: 10, borderRadius: 6, position: 'absolute' },
});

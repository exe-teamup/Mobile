import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type WaitScreenProps = {
  duration?: number; // milliseconds until navigation
  logoSize?: number; // width & height
  showText?: boolean; // show text under logo
  text?: string; // text to show
};

export default function WaitScreen({
  duration = 2500,
  logoSize = 200,
  showText = false,
  text = '',
}: WaitScreenProps) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const router = useRouter();

  useEffect(() => {
    // Parallel fade + scale animation
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      try {
        router.replace('/');
      } catch (e) {
        router.push('/');
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [fade, scale, router, duration]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.center}>
        <Animated.Image
          source={require('../../assets/images/exeteamup.png')}
          style={[
            styles.logo,
            {
              width: logoSize,
              height: logoSize,
              opacity: fade,
              transform: [{ scale }],
            },
          ]}
          resizeMode="contain"
        />
        {showText ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

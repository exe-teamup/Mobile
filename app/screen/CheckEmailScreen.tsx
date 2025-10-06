import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function CheckEmailScreen() {
  const router = useRouter();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    let remaining = 5;
    setCount(remaining);
    const interval = setInterval(() => {
      remaining -= 1;
      setCount(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        router.replace('/');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [anim, router]);

  const [count, setCount] = useState(5);

  const onBack = () => {
    router.replace('/');
  };

  const onResend = () => {
    Alert.alert('Resend', 'Gửi lại email (demo)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          Chúng tôi đã gửi mail reset password cho bạn{`\n`}Vui lòng kiểm tra
          trong hộp thư!
        </Text>

        <Animated.Image
          source={require('../../assets/images/email.png')}
          style={[
            styles.image,
            {
              opacity: anim,
              transform: [
                {
                  translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />

        <Text style={styles.countdown}>Quay lại sau {count}s</Text>

        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
            styles.fullWidth,
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            accessibilityRole="button"
          >
            <Text style={styles.backText}>QUAY LẠI ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={onResend} accessibilityRole="button">
          <Text style={styles.resend}>
            Chưa nhận được email? <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 24, alignItems: 'center' },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginTop: 8,
    marginBottom: 18,
  },
  image: { width: 220, height: 200, marginVertical: 8 },
  countdown: { marginTop: 8, color: '#666' },
  fullWidth: { width: '100%' },
  backButton: {
    marginTop: 12,
    backgroundColor: '#18A54A',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  backText: { color: '#fff', fontWeight: '700' },
  resend: { marginTop: 12, color: '#666' },
  resendLink: { color: '#FF7A00' },
});

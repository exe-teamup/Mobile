import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const onRecover = () => {
    setError('');
    Keyboard.dismiss();

    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }

    // Check if email is correct
    const CORRECT_EMAIL = 'giangvienexe@fpt.com';
    if (email !== CORRECT_EMAIL) {
      setError('Email không tồn tại trong hệ thống');
      return;
    }

    setLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      // Navigate to CheckEmailScreen
      router.push('/screen/CheckEmailScreen');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Loss Password?</Text>
        <Text style={styles.subtitle}>
          Vui lòng điền mail để khôi phục mật khẩu!
        </Text>
      </View>

      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 0],
                }),
              },
            ],
          }}
        >
          <Image
            source={require('../../assets/images/Group 74.png')}
            style={styles.illustration}
            resizeMode="contain"
            accessibilityLabel="illustration"
          />
        </Animated.View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="giangvienexe@fpt.com"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.recoverButton, loading ? styles.disabled : null]}
          onPress={onRecover}
          accessibilityRole="button"
          accessibilityLabel="Khôi phục mật khẩu"
          disabled={loading}
        >
          <Text style={styles.recoverText}>
            {loading ? 'Đang gửi...' : 'KHÔI PHỤ MẬT KHẨU'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <Text style={styles.backText}>QUAY LẠI ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const ORANGE = '#FF7A00';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { paddingTop: 10, paddingHorizontal: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 6 },
  subtitle: { textAlign: 'center', color: '#777', marginTop: 6 },
  center: { alignItems: 'center', marginTop: 14 },
  illustration: { width: 180, height: 120 },
  form: { paddingHorizontal: 24, marginTop: 18 },
  label: { marginBottom: 6, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#f0a97b',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  recoverButton: {
    marginTop: 14,
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  recoverText: { color: '#fff', fontWeight: '700' },
  backButton: {
    marginTop: 12,
    backgroundColor: '#18A54A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.7 },
  error: { color: '#d9534f', marginTop: 8 },
});

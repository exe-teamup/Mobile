import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';
import { MMKV } from 'react-native-mmkv';
import { FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const storage = new MMKV();

  const onLogin = () => {
    // reset errors
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let ok = true;
    if (!email) {
      setEmailError('Vui lòng nhập email');
      ok = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Email không hợp lệ');
      ok = false;
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu');
      ok = false;
    } else if (password.length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      ok = false;
    }

    if (!ok) return;

    // mock login flow
    setLoading(true);
    setTimeout(() => {
      // mock token
      const mockToken = 'mock-token-123456';
      try {
        storage.set('token', mockToken);
      } catch (e) {
        // ignore storage errors in demo
        console.warn('MMKV set error', e);
      }
      setLoading(false);
      router.replace('/');
    }, 1200);
  };

  const onGoogle = () => {
    // mock Google Sign-In
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      storage.set('token', 'google-mock-token');
      router.replace('/');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Vui lòng đăng nhập bằng tài khoản được cấp để dùng ứng dụng
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="you@example.com"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email"
          importantForAutofill="yes"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry={!showPassword}
            style={[styles.input, { flex: 1 }]}
            accessibilityLabel="Mật khẩu"
          />
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            style={styles.eyeButton}
            accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            <Text>{showPassword ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.forgotWrap}
          onPress={() => Alert.alert('Loss Password?', 'Demo')}
        >
          <Text style={styles.forgot}>Loss Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
            loading ? styles.loginButtonDisabled : null,
          ]}
          onPress={onLogin}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Đăng nhập"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogle}
          accessibilityRole="button"
          accessibilityLabel="Đăng nhập với Google"
        >
          <View style={styles.googleInner}>
            <FontAwesome name="google" size={18} color="#DB4437" />
            <Text style={styles.googleText}> ĐĂNG NHẬP VỚI GOOGLE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
    color: '#2a1654',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginTop: 8,
    marginBottom: 18,
  },
  label: { color: '#333', marginTop: 8, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#f0a97b',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  eyeButton: { padding: 8, marginLeft: 8 },
  forgotWrap: { alignItems: 'flex-end', marginTop: 8 },
  forgot: { color: '#3b4a6b' },
  loginButton: {
    marginTop: 18,
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginText: { color: '#fff', fontWeight: '700' },
  googleButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  googleText: { color: '#333', fontWeight: '600' },
  googleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: '#d9534f', marginTop: 6, fontSize: 12 },
  loginButtonDisabled: { opacity: 0.7 },
});

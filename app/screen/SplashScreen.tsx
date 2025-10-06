import React, { useRef } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  const anim = useRef(new Animated.Value(0)).current; // for illustration
  const btnScale = useRef(new Animated.Value(1)).current;

  // start illustration animation on mount
  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  const onPressIn = () => {
    Animated.spring(btnScale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(btnScale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => {
    // replace so user can't go back
    try {
      router.replace('/');
    } catch (e) {
      router.push('/');
    }
  };

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });
  const opacity = anim;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.light.background}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>Team Up</Text>
      </View>

      <View style={styles.content}>
        <Animated.View style={{ transform: [{ translateY }], opacity }}>
          <Image
            source={require('../../assets/images/Group 74.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.headlineWrap}>
          <Text style={styles.headline}>
            Find Your{`\n`}
            <Text style={styles.headlineAccent}>Dream Team{`\n`}</Text>
            Here!
          </Text>
        </View>

        <Text style={styles.subtext}>
          Tìm kiếm nhóm phù hợp dựa trên mục tiêu và năng lực của bạn.
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      >
        <Animated.View
          style={[styles.nextButton, { transform: [{ scale: btnScale }] }]}
          accessibilityRole="button"
          accessibilityLabel="Tiếp theo"
        >
          <Text style={styles.nextIcon}>→</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const ORANGE = '#FF7A00';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  headerText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
    marginBottom: 24,
  },
  headlineWrap: {
    marginBottom: 12,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    lineHeight: 36,
  },
  headlineAccent: {
    color: ORANGE,
  },
  subtext: {
    color: '#666',
    fontSize: 13,
    marginTop: 6,
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: 34,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  nextIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});

import { useEffect, useRef } from 'react';

import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

  }, []);

  return (

    <LinearGradient
      colors={['#050816', '#0B1023', '#111827']}
      style={styles.container}
    >

      <StatusBar style="light" />

      {/* GLOW */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >

        {/* LOGO */}
        <View style={styles.logoWrapper}>

          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            style={styles.logoCircle}
          >
            <MaterialCommunityIcons
              name="fish"
              size={75}
              color="#FFFFFF"
            />
          </LinearGradient>

        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          SaltFish
        </Text>

        <Text style={styles.highlight}>
          Detector
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Deteksi kadar garam ikan menggunakan
          teknologi pengolahan citra digital.
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/menu')}
        >
          <LinearGradient
            colors={['#2563EB', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >

            <Text style={styles.buttonText}>
              Mulai Sekarang
            </Text>

            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#FFFFFF"
            />

          </LinearGradient>

        </TouchableOpacity>

      </Animated.View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  content: {
    alignItems: 'flex-start',
  },

  glowTop: {
    position: 'absolute',
    top: -120,
    right: -100,

    width: 300,
    height: 300,

    backgroundColor: '#3B82F6',
    borderRadius: 200,

    opacity: 0.25,
  },

  glowBottom: {
    position: 'absolute',
    bottom: -120,
    left: -100,

    width: 280,
    height: 280,

    backgroundColor: '#7C3AED',
    borderRadius: 200,

    opacity: 0.25,
  },

  logoWrapper: {
    marginBottom: 45,
  },

  logoCircle: {
    width: 140,
    height: 140,

    borderRadius: 80,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  highlight: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#60A5FA',
    marginBottom: 25,
  },

  description: {
    fontSize: 18,
    color: '#CFCFCF',
    lineHeight: 30,
    marginBottom: 50,
  },

  button: {
    width: width - 60,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 18,

    borderRadius: 22,

    gap: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
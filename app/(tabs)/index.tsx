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
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* BACKGROUND GLOW */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.smallCircleOne} />
      <View style={styles.smallCircleTwo} />

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
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#2563EB', '#7C3AED']}
            style={styles.logoCircle}
          >
            <MaterialCommunityIcons
              name="fish"
              size={72}
              color="#FFFFFF"
            />
          </LinearGradient>

          <View style={styles.logoBadge}>
            <MaterialCommunityIcons
              name="check-decagram"
              size={18}
              color="#10B981"
            />
          </View>
        </Animated.View>

        {/* TITLE */}
        <Text style={styles.title}>SaltFish</Text>

        <Text style={styles.highlight}>Detector</Text>

        {/* SUBTITLE */}
        <Text style={styles.tagline}>
          Deteksi Kandungan Garam Ikan Benggol
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          Aplikasi mobile berbasis pengolahan citra digital untuk
          mengidentifikasi kadar garam ikan Benggol pasca perebusan.
        </Text>

        {/* METHOD BADGES */}
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Canny Edge Detection</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>GLCM</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>SVM</Text>
          </View>
        </View>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="fish"
              size={20}
              color="#60A5FA"
            />
            <Text style={styles.infoText}>
              Objek penelitian: Ikan Benggol
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="camera-image"
              size={20}
              color="#8B5CF6"
            />
            <Text style={styles.infoText}>
              Input citra: Kamera dan Galeri
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="chart-bell-curve"
              size={20}
              color="#10B981"
            />
            <Text style={styles.infoText}>
              Output: Garam Rendah, Sedang, Tinggi
            </Text>
          </View>
        </View>

        {/* MAIN BUTTON */}
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
            <Text style={styles.buttonText}>Mulai Sekarang</Text>

            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="#FFFFFF"
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* SECONDARY BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.secondaryButton}
          onPress={() => router.push('/tentang')}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color="#CBD5E1"
          />

          <Text style={styles.secondaryButtonText}>
            Tentang Penelitian
          </Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Version 1.0.0 • Teknik Informatika
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    paddingHorizontal: 26,
  },

  content: {
    alignItems: 'flex-start',
  },

  glowTop: {
    position: 'absolute',
    top: -130,
    right: -110,
    width: 310,
    height: 310,
    backgroundColor: '#2563EB',
    borderRadius: 200,
    opacity: 0.22,
  },

  glowBottom: {
    position: 'absolute',
    bottom: -130,
    left: -110,
    width: 300,
    height: 300,
    backgroundColor: '#7C3AED',
    borderRadius: 200,
    opacity: 0.22,
  },

  smallCircleOne: {
    position: 'absolute',
    top: 120,
    left: 30,
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: '#60A5FA',
    opacity: 0.5,
  },

  smallCircleTwo: {
    position: 'absolute',
    bottom: 170,
    right: 35,
    width: 18,
    height: 18,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    opacity: 0.45,
  },

  logoWrapper: {
    marginBottom: 34,
    position: 'relative',
  },

  logoCircle: {
    width: 132,
    height: 132,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },

  logoBadge: {
    position: 'absolute',
    right: 4,
    bottom: 8,
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  highlight: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#60A5FA',
    marginBottom: 12,
  },

  tagline: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  description: {
    fontSize: 15.5,
    color: '#CBD5E1',
    lineHeight: 26,
    marginBottom: 22,
  },

  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 22,
  },

  badge: {
    backgroundColor: 'rgba(96, 165, 250, 0.12)',
    borderColor: 'rgba(96, 165, 250, 0.25)',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },

  badgeText: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: '700',
  },

  infoCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  infoText: {
    color: '#E5E7EB',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },

  button: {
    width: width - 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    borderRadius: 22,
    gap: 10,
    shadowColor: '#2563EB',
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  secondaryButton: {
    width: width - 52,
    marginTop: 14,
    paddingVertical: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },

  secondaryButtonText: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    width: width - 52,
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    marginTop: 24,
  },
});
import { useEffect, useRef } from 'react';

import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { router } from 'expo-router';

type MenuItem = {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  route: string;
};

const menuItems: MenuItem[] = [
  {
    title: 'Ambil Kamera',
    description: 'Ambil citra ikan Benggol secara langsung melalui kamera.',
    icon: 'camera',
    color: '#60A5FA',
    route: '/kamera',
  },
  {
    title: 'Pilih Galeri',
    description: 'Gunakan citra ikan dari penyimpanan perangkat.',
    icon: 'image',
    color: '#8B5CF6',
    route: '/galeri',
  },
  {
    title: 'Riwayat Deteksi',
    description: 'Lihat daftar hasil deteksi kadar garam sebelumnya.',
    icon: 'history',
    color: '#00D4AA',
    route: '/riwayat',
  },
  {
    title: 'Panduan',
    description: 'Petunjuk penggunaan aplikasi dan cara membaca hasil deteksi.',
    icon: 'book-open-page-variant',
    color: '#38BDF8',
    route: '/panduan',
  },
  {
    title: 'Tentang Aplikasi',
    description: 'Informasi metode, aplikasi, dan pengembang.',
    icon: 'information',
    color: '#F59E0B',
    route: '/tentang',
  },
];

export default function MenuScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(35)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={styles.container}
    >
      {/* BACKGROUND GLOW */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Menu Utama</Text>

              <Text style={styles.subtitle}>
                Pilih fitur untuk memulai proses deteksi kadar garam ikan.
              </Text>
            </View>

            <View style={styles.headerIcon}>
              <MaterialCommunityIcons
                name="fish"
                size={34}
                color="#FFFFFF"
              />
            </View>
          </View>

          {/* STATUS CARD */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIconBox}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color="#10B981"
                />
              </View>

              <View>
                <Text style={styles.statusTitle}>Status Sistem</Text>

                <Text style={styles.statusSubtitle}>
                  Prototype deteksi siap digunakan
                </Text>
              </View>
            </View>

            <View style={styles.methodBox}>
              <Text style={styles.methodText}>
                Canny Edge Detection
              </Text>

              <MaterialCommunityIcons
                name="arrow-right"
                size={15}
                color="#94A3B8"
              />

              <Text style={styles.methodText}>GLCM</Text>

              <MaterialCommunityIcons
                name="arrow-right"
                size={15}
                color="#94A3B8"
              />

              <Text style={styles.methodText}>SVM</Text>
            </View>
          </View>

          {/* QUICK INFO */}
          <View style={styles.quickInfoContainer}>
            <View style={styles.quickInfoCard}>
              <MaterialCommunityIcons
                name="camera-image"
                size={24}
                color="#60A5FA"
              />

              <Text style={styles.quickNumber}>2</Text>

              <Text style={styles.quickLabel}>Input Citra</Text>
            </View>

            <View style={styles.quickInfoCard}>
              <MaterialCommunityIcons
                name="chart-box"
                size={24}
                color="#10B981"
              />

              <Text style={styles.quickNumber}>3</Text>

              <Text style={styles.quickLabel}>Kategori Hasil</Text>
            </View>

            <View style={styles.quickInfoCard}>
              <MaterialCommunityIcons
                name="apps"
                size={24}
                color="#F59E0B"
              />

              <Text style={styles.quickNumber}>5</Text>

              <Text style={styles.quickLabel}>Fitur Menu</Text>
            </View>
          </View>

          {/* SECTION TITLE */}
          <Text style={styles.sectionTitle}>Fitur Aplikasi</Text>

          {/* MENU ITEMS */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.82}
              style={styles.card}
              onPress={() => router.push(item.route as any)}
            >
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: `${item.color}22` },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={31}
                  color={item.color}
                />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardText}>{item.title}</Text>

                <Text style={styles.cardDescription}>
                  {item.description}
                </Text>
              </View>

              <MaterialCommunityIcons
                name="chevron-right"
                size={28}
                color="#94A3B8"
              />
            </TouchableOpacity>
          ))}

          {/* FOOTER */}
          <Text style={styles.footer}>
            SaltFish Detector • Version 1.0.0
          </Text>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 22,
    backgroundColor: '#020617',
  },

  content: {
    paddingBottom: 45,
  },

  glowTop: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 280,
    height: 280,
    backgroundColor: '#2563EB',
    borderRadius: 180,
    opacity: 0.18,
  },

  glowBottom: {
    position: 'absolute',
    bottom: -140,
    left: -120,
    width: 300,
    height: 300,
    backgroundColor: '#7C3AED',
    borderRadius: 200,
    opacity: 0.18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    width: 250,
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
    marginTop: 8,
  },

  headerIcon: {
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: 'rgba(37, 99, 235, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  statusIconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  statusTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  statusSubtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 4,
  },

  methodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  methodText: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '700',
  },

  quickInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },

  quickInfoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  quickNumber: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 10,
  },

  quickLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  card: {
    width: '100%',
    minHeight: 96,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  cardInfo: {
    flex: 1,
  },

  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  cardDescription: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },

  footer: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    marginTop: 16,
  },
});
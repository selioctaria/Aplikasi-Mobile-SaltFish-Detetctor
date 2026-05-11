import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { router } from 'expo-router';

export default function TentangScreen() {
  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={styles.container}
    >
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.pageTitle}>
              Tentang Aplikasi
            </Text>

            <Text style={styles.pageSubtitle}>
              Informasi penelitian dan sistem deteksi.
            </Text>
          </View>
        </View>

        {/* APP HEADER */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#2563EB', '#7C3AED']}
            style={styles.logoContainer}
          >
            <MaterialCommunityIcons
              name="fish"
              size={70}
              color="#FFFFFF"
            />
          </LinearGradient>

          <Text style={styles.title}>
            SaltFish Detector
          </Text>

          <Text style={styles.subtitle}>
            Mobile Application for Salt Content Detection
          </Text>

          <View style={styles.versionBadge}>
            <MaterialCommunityIcons
              name="cellphone"
              size={15}
              color="#BFDBFE"
            />

            <Text style={styles.versionBadgeText}>
              Version 1.0.0
            </Text>
          </View>
        </View>

        {/* JUDUL PENELITIAN */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={24}
              color="#60A5FA"
            />

            <Text style={styles.cardTitle}>
              Judul Penelitian
            </Text>
          </View>

          <Text style={styles.researchTitle}>
            Deteksi Kandungan Garam Pada Ikan Benggol Pasca Perebusan Menggunakan Canny Edge Detection Dengan Ekstraksi Fitur GLCM Dan SVM
          </Text>
        </View>

        {/* DESKRIPSI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="#8B5CF6"
            />

            <Text style={styles.cardTitle}>
              Deskripsi Aplikasi
            </Text>
          </View>

          <Text style={styles.description}>
            SaltFish Detector merupakan aplikasi berbasis mobile yang dirancang untuk membantu proses identifikasi kandungan garam pada ikan Benggol pasca perebusan menggunakan teknologi pengolahan citra digital dan machine learning.
          </Text>

          <Text style={styles.description}>
            Sistem dirancang dengan memanfaatkan citra ikan sebagai input, kemudian citra tersebut diproses melalui tahapan deteksi tepi, ekstraksi fitur tekstur, dan klasifikasi untuk menghasilkan kategori kadar garam.
          </Text>
        </View>

        {/* ALUR SISTEM */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={24}
              color="#10B981"
            />

            <Text style={styles.cardTitle}>
              Alur Sistem
            </Text>
          </View>

          <View style={styles.flowContainer}>
            <View style={styles.flowItem}>
              <MaterialCommunityIcons
                name="image"
                size={24}
                color="#60A5FA"
              />
              <Text style={styles.flowText}>Input Citra</Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-down"
              size={20}
              color="#94A3B8"
            />

            <View style={styles.flowItem}>
              <MaterialCommunityIcons
                name="tune-variant"
                size={24}
                color="#8B5CF6"
              />
              <Text style={styles.flowText}>Preprocessing</Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-down"
              size={20}
              color="#94A3B8"
            />

            <View style={styles.flowItem}>
              <MaterialCommunityIcons
                name="vector-polyline"
                size={24}
                color="#F59E0B"
              />
              <Text style={styles.flowText}>Canny Edge Detection</Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-down"
              size={20}
              color="#94A3B8"
            />

            <View style={styles.flowItem}>
              <MaterialCommunityIcons
                name="checkerboard"
                size={24}
                color="#38BDF8"
              />
              <Text style={styles.flowText}>Ekstraksi Fitur GLCM</Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-down"
              size={20}
              color="#94A3B8"
            />

            <View style={styles.flowItem}>
              <MaterialCommunityIcons
                name="chart-bell-curve"
                size={24}
                color="#10B981"
              />
              <Text style={styles.flowText}>Klasifikasi SVM</Text>
            </View>

            <MaterialCommunityIcons
              name="arrow-down"
              size={20}
              color="#94A3B8"
            />

            <View style={styles.flowItem}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={24}
                color="#22C55E"
              />
              <Text style={styles.flowText}>Hasil Deteksi</Text>
            </View>
          </View>
        </View>

        {/* METODE */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="flask-outline"
              size={24}
              color="#F59E0B"
            />

            <Text style={styles.cardTitle}>
              Metode yang Digunakan
            </Text>
          </View>

          <View style={styles.methodItem}>
            <View style={styles.methodIconBlue}>
              <MaterialCommunityIcons
                name="vector-polyline"
                size={22}
                color="#60A5FA"
              />
            </View>

            <View style={styles.methodTextBox}>
              <Text style={styles.methodText}>
                Canny Edge Detection
              </Text>

              <Text style={styles.methodDescription}>
                Digunakan untuk mendeteksi tepi objek pada citra ikan.
              </Text>
            </View>
          </View>

          <View style={styles.methodItem}>
            <View style={styles.methodIconPurple}>
              <MaterialCommunityIcons
                name="checkerboard"
                size={22}
                color="#A78BFA"
              />
            </View>

            <View style={styles.methodTextBox}>
              <Text style={styles.methodText}>
                Gray Level Co-occurrence Matrix
              </Text>

              <Text style={styles.methodDescription}>
                Digunakan untuk memperoleh fitur tekstur seperti contrast, correlation, energy, dan homogeneity.
              </Text>
            </View>
          </View>

          <View style={styles.methodItem}>
            <View style={styles.methodIconGreen}>
              <MaterialCommunityIcons
                name="chart-bell-curve"
                size={22}
                color="#10B981"
              />
            </View>

            <View style={styles.methodTextBox}>
              <Text style={styles.methodText}>
                Support Vector Machine
              </Text>

              <Text style={styles.methodDescription}>
                Digunakan untuk melakukan klasifikasi kategori kandungan garam.
              </Text>
            </View>
          </View>
        </View>

        {/* KATEGORI OUTPUT */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="format-list-bulleted-type"
              size={24}
              color="#22C55E"
            />

            <Text style={styles.cardTitle}>
              Kategori Output
            </Text>
          </View>

          <View style={styles.outputContainer}>
            <View style={styles.outputCard}>
              <MaterialCommunityIcons
                name="check-circle"
                size={26}
                color="#10B981"
              />

              <Text style={styles.outputTitle}>
                Rendah
              </Text>

              <Text style={styles.outputSub}>
                Garam rendah
              </Text>
            </View>

            <View style={styles.outputCard}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={26}
                color="#F59E0B"
              />

              <Text style={styles.outputTitle}>
                Sedang
              </Text>

              <Text style={styles.outputSub}>
                Garam sedang
              </Text>
            </View>

            <View style={styles.outputCard}>
              <MaterialCommunityIcons
                name="alert"
                size={26}
                color="#EF4444"
              />

              <Text style={styles.outputTitle}>
                Tinggi
              </Text>

              <Text style={styles.outputSub}>
                Garam tinggi
              </Text>
            </View>
          </View>
        </View>

        {/* FITUR APLIKASI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="apps"
              size={24}
              color="#38BDF8"
            />

            <Text style={styles.cardTitle}>
              Fitur Aplikasi
            </Text>
          </View>

          <View style={styles.featureGrid}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color="#60A5FA"
              />

              <Text style={styles.featureText}>
                Kamera
              </Text>
            </View>

            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="image"
                size={24}
                color="#8B5CF6"
              />

              <Text style={styles.featureText}>
                Galeri
              </Text>
            </View>

            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="history"
                size={24}
                color="#10B981"
              />

              <Text style={styles.featureText}>
                Riwayat
              </Text>
            </View>

            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="information"
                size={24}
                color="#F59E0B"
              />

              <Text style={styles.featureText}>
                Tentang
              </Text>
            </View>
          </View>
        </View>

        {/* TEKNOLOGI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="code-tags"
              size={24}
              color="#A78BFA"
            />

            <Text style={styles.cardTitle}>
              Teknologi Pengembangan
            </Text>
          </View>

          <View style={styles.techContainer}>
            <Text style={styles.techBadge}>React Native</Text>
            <Text style={styles.techBadge}>Expo</Text>
            <Text style={styles.techBadge}>TypeScript</Text>
            <Text style={styles.techBadge}>Expo Router</Text>
            <Text style={styles.techBadge}>Expo Camera</Text>
            <Text style={styles.techBadge}>Image Picker</Text>
          </View>
        </View>

        {/* INFORMASI PENGEMBANG */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="#60A5FA"
            />

            <Text style={styles.cardTitle}>
              Informasi Pengembang
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Nama</Text>
            <Text style={styles.infoValue}>Seli Octaria Simatupang</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>NIM</Text>
            <Text style={styles.infoValue}>2201020024</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Program Studi</Text>
            <Text style={styles.infoValue}>Teknik Informatika</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Angkatan</Text>
            <Text style={styles.infoValue}>2022</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Universitas</Text>
            <Text style={styles.infoValue}>
              Universitas Maritim Raja Ali Haji
            </Text>
          </View>
        </View>

        {/* CATATAN PROTOTYPE */}
        <View style={styles.noteCard}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={24}
            color="#FBBF24"
          />

          <Text style={styles.noteText}>
            Aplikasi ini dikembangkan sebagai prototype antarmuka mobile untuk mendukung penelitian deteksi kandungan garam berbasis pengolahan citra digital.
          </Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          SaltFish Detector • Skripsi Teknik Informatika
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingTop: 62,
    paddingHorizontal: 22,
  },

  scrollContent: {
    paddingBottom: 42,
  },

  glowTop: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: '#2563EB',
    borderRadius: 200,
    opacity: 0.18,
  },

  glowBottom: {
    position: 'absolute',
    bottom: -130,
    left: -100,
    width: 300,
    height: 300,
    backgroundColor: '#7C3AED',
    borderRadius: 200,
    opacity: 0.18,
  },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  pageTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  pageSubtitle: {
    color: '#CBD5E1',
    fontSize: 13.5,
    marginTop: 5,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    shadowColor: '#2563EB',
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#CBD5E1',
    marginTop: 8,
    textAlign: 'center',
  },

  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: 'rgba(96, 165, 250, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
  },

  versionBadgeText: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },

  researchTitle: {
    color: '#E5E7EB',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '600',
  },

  description: {
    fontSize: 15,
    color: '#D6D6D6',
    lineHeight: 27,
    marginBottom: 14,
  },

  flowContainer: {
    alignItems: 'center',
  },

  flowItem: {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  flowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 12,
  },

  methodItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  methodIconBlue: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(96, 165, 250, 0.13)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  methodIconPurple: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(167, 139, 250, 0.13)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  methodIconGreen: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(16, 185, 129, 0.13)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  methodTextBox: {
    flex: 1,
  },

  methodText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  methodDescription: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5,
  },

  outputContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  outputCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  outputTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },

  outputSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
    textAlign: 'center',
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  featureItem: {
    width: '47%',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },

  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  techBadge: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: 'rgba(96, 165, 250, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.22)',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 50,
  },

  infoContainer: {
    marginBottom: 16,
  },

  infoLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 23,
  },

  noteCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  noteText: {
    flex: 1,
    color: '#FDE68A',
    fontSize: 13,
    lineHeight: 21,
    marginLeft: 12,
  },

  footer: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8,
  },
});
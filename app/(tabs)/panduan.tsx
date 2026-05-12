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

type GuideStep = {
  number: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

type TipItem = {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

const guideSteps: GuideStep[] = [
  {
    number: '01',
    title: 'Pilih Sumber Citra',
    description:
      'Pengguna dapat mengambil gambar ikan Benggol secara langsung melalui kamera atau memilih gambar dari galeri perangkat.',
    icon: 'camera-image',
    color: '#60A5FA',
  },
  {
    number: '02',
    title: 'Pastikan Citra Jelas',
    description:
      'Pastikan objek ikan terlihat jelas, tidak blur, pencahayaan cukup, dan posisi ikan berada di dalam area gambar.',
    icon: 'image-check',
    color: '#10B981',
  },
  {
    number: '03',
    title: 'Lakukan Deteksi',
    description:
      'Tekan tombol deteksi untuk menjalankan proses analisis citra menggunakan tahapan Canny Edge Detection, GLCM, dan SVM.',
    icon: 'radar',
    color: '#8B5CF6',
  },
  {
    number: '04',
    title: 'Lihat Hasil Deteksi',
    description:
      'Aplikasi akan menampilkan kategori kandungan garam, seperti rendah, sedang, atau tinggi beserta informasi hasil analisis.',
    icon: 'check-decagram',
    color: '#F59E0B',
  },
];

const tips: TipItem[] = [
  {
    title: 'Gunakan Pencahayaan Cukup',
    description:
      'Hindari area yang terlalu gelap karena dapat memengaruhi kualitas citra.',
    icon: 'white-balance-sunny',
    color: '#FBBF24',
  },
  {
    title: 'Hindari Gambar Blur',
    description:
      'Pastikan kamera stabil saat mengambil gambar agar objek ikan terlihat jelas.',
    icon: 'image-filter-center-focus',
    color: '#60A5FA',
  },
  {
    title: 'Gunakan Latar Sederhana',
    description:
      'Untuk hasil deteksi yang optimal, gunakan latar belakang polos, sebaiknya hitam, agar objek ikan Benggol terlihat jelas dan proses analisis citra menjadi lebih akurat.',
    icon: 'crop-free',
    color: '#10B981',
  },
  {
    title: 'Posisikan Ikan di Tengah',
    description:
      'Usahakan objek ikan memenuhi area frame agar bagian tekstur ikan dapat terlihat dengan jelas.',
    icon: 'crosshairs-gps',
    color: '#8B5CF6',
  },
];

export default function PanduanScreen() {
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerTextBox}>
            <Text style={styles.title}>Panduan Penggunaan</Text>

            <Text style={styles.subtitle}>
              Petunjuk penggunaan aplikasi SaltFish Detector.
            </Text>
          </View>
        </View>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#2563EB', '#7C3AED']}
            style={styles.heroIconBox}
          >
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={46}
              color="#FFFFFF"
            />
          </LinearGradient>

          <View style={styles.heroTextBox}>
            <Text style={styles.heroTitle}>
              Cara Menggunakan Aplikasi
            </Text>

            <Text style={styles.heroDescription}>
              Panduan ini membantu pengguna mengambil citra ikan Benggol dengan
              benar agar proses deteksi kandungan garam dapat dilakukan secara
              lebih optimal.
            </Text>
          </View>
        </View>

        {/* ALUR PENGGUNAAN */}
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="format-list-numbered"
            size={23}
            color="#60A5FA"
          />

          <Text style={styles.sectionTitle}>
            Alur Penggunaan
          </Text>
        </View>

        {guideSteps.map((step, index) => (
          <View
            key={index}
            style={styles.stepCard}
          >
            <View
              style={[
                styles.stepIconBox,
                { backgroundColor: `${step.color}22` },
              ]}
            >
              <MaterialCommunityIcons
                name={step.icon}
                size={28}
                color={step.color}
              />
            </View>

            <View style={styles.stepContent}>
              <Text style={styles.stepNumber}>
                Langkah {step.number}
              </Text>

              <Text style={styles.stepTitle}>
                {step.title}
              </Text>

              <Text style={styles.stepDescription}>
                {step.description}
              </Text>
            </View>
          </View>
        ))}

        {/* TIPS CITRA */}
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={23}
            color="#FBBF24"
          />

          <Text style={styles.sectionTitle}>
            Tips Pengambilan Citra
          </Text>
        </View>

        <View style={styles.tipsGrid}>
          {tips.map((tip, index) => (
            <View
              key={index}
              style={styles.tipCard}
            >
              <View
                style={[
                  styles.tipIconBox,
                  { backgroundColor: `${tip.color}22` },
                ]}
              >
                <MaterialCommunityIcons
                  name={tip.icon}
                  size={26}
                  color={tip.color}
                />
              </View>

              <Text style={styles.tipTitle}>
                {tip.title}
              </Text>

              <Text style={styles.tipDescription}>
                {tip.description}
              </Text>
            </View>
          ))}
        </View>

        {/* ALUR METODE */}
        <View style={styles.methodCard}>
          <View style={styles.methodHeader}>
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              size={24}
              color="#10B981"
            />

            <Text style={styles.methodTitle}>
              Alur Proses Deteksi
            </Text>
          </View>

          <View style={styles.methodFlow}>
            <Text style={styles.methodBadge}>Input Citra</Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color="#94A3B8"
            />

            <Text style={styles.methodBadge}>Canny Edge Detection</Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color="#94A3B8"
            />

            <Text style={styles.methodBadge}>GLCM</Text>

            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color="#94A3B8"
            />

            <Text style={styles.methodBadge}>SVM</Text>
          </View>

          <Text style={styles.methodDescription}>
            Citra ikan diproses untuk memperoleh karakteristik tepi dan tekstur,
            kemudian diklasifikasikan menggunakan model Support Vector Machine.
          </Text>
        </View>

        {/* CARA MEMBACA HASIL */}
        <View style={styles.resultGuideCard}>
          <View style={styles.resultHeader}>
            <MaterialCommunityIcons
              name="chart-box-outline"
              size={24}
              color="#38BDF8"
            />

            <Text style={styles.resultTitle}>
              Cara Membaca Hasil
            </Text>
          </View>

          <View style={styles.resultItem}>
            <MaterialCommunityIcons
              name="alert-circle"
                size={26}
                color="#F59E0B"
            />

            <View style={styles.resultTextBox}>
              <Text style={styles.resultLabel}>
                Garam Rendah
              </Text>

              <Text style={styles.resultDescription}>
                Menunjukkan citra ikan diklasifikasikan ke dalam kategori kadar
                garam rendah.
              </Text>
            </View>
          </View>

          <View style={styles.resultItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color="#10B981"
            />

            <View style={styles.resultTextBox}>
              <Text style={styles.resultLabel}>
                Garam Sedang
              </Text>

              <Text style={styles.resultDescription}>
                Menunjukkan citra ikan diklasifikasikan ke dalam kategori kadar
                garam sedang.
              </Text>
            </View>
          </View>

          <View style={styles.resultItem}>
            <MaterialCommunityIcons
              name="alert"
              size={22}
              color="#EF4444"
            />

            <View style={styles.resultTextBox}>
              <Text style={styles.resultLabel}>
                Garam Tinggi
              </Text>

              <Text style={styles.resultDescription}>
                Menunjukkan citra ikan diklasifikasikan ke dalam kategori kadar
                garam tinggi.
              </Text>
            </View>
          </View>
        </View>

        {/* CATATAN */}
        <View style={styles.noteCard}>
          <MaterialCommunityIcons
            name="information-outline"
            size={24}
            color="#FBBF24"
          />

          <Text style={styles.noteText}>
            Untuk hasil yang lebih konsisten, gunakan gambar dengan pencahayaan
            baik, objek ikan tidak tertutup bayangan, dan latar belakang tidak
            terlalu ramai.
          </Text>
        </View>

        <Text style={styles.footer}>
          SaltFish Detector • Panduan Penggunaan
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
    paddingBottom: 44,
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
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

  headerTextBox: {
    flex: 1,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 13.5,
    color: '#CBD5E1',
    lineHeight: 20,
    marginTop: 5,
  },

  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 28,
    padding: 20,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  heroIconBox: {
    width: 82,
    height: 82,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  heroTextBox: {
    flex: 1,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  heroDescription: {
    color: '#CBD5E1',
    fontSize: 14.5,
    lineHeight: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  stepCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  stepIconBox: {
    width: 56,
    height: 56,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  stepContent: {
    flex: 1,
  },

  stepNumber: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },

  stepTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  stepDescription: {
    color: '#CBD5E1',
    fontSize: 13.5,
    lineHeight: 21,
  },

  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },

  tipCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  tipIconBox: {
    width: 48,
    height: 48,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },

  tipTitle: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  tipDescription: {
    color: '#CBD5E1',
    fontSize: 12.5,
    lineHeight: 19,
  },

  methodCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 26,
    padding: 19,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.22)',
  },

  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  methodTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  methodFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  methodBadge: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: 'rgba(96, 165, 250, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.22)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 50,
  },

  methodDescription: {
    color: '#CBD5E1',
    fontSize: 13.5,
    lineHeight: 22,
  },

  resultGuideCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 26,
    padding: 19,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  resultTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  resultTextBox: {
    flex: 1,
    marginLeft: 12,
  },

  resultLabel: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  resultDescription: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 20,
  },

  noteCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 22,
    padding: 17,
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
  },
});
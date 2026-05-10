import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TentangScreen() {

  return (

    <LinearGradient
      colors={['#050816', '#0B1023', '#111827']}
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="fish"
              size={70}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.title}>
            SaltFish Detector
          </Text>

          <Text style={styles.subtitle}>
            Mobile Application for Salt Content Detection
          </Text>

        </View>

        {/* DESKRIPSI */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Deskripsi Aplikasi
          </Text>

          <Text style={styles.description}>
            SaltFish Detector merupakan aplikasi
            berbasis mobile yang dirancang untuk
            membantu proses identifikasi kadar garam
            pada ikan Benggol menggunakan teknologi
            pengolahan citra digital dan machine learning.
          </Text>

          <Text style={styles.description}>
            Sistem bekerja dengan menganalisis citra
            ikan untuk memperoleh karakteristik tepi objek
            dan tekstur, kemudian melakukan proses
            klasifikasi kadar garam secara otomatis.
          </Text>

          <Text style={styles.description}>
            Aplikasi ini dikembangkan sebagai bagian
            dari penelitian skripsi pada Program Studi
            Teknik Informatika Universitas Maritim
            Raja Ali Haji dalam bidang pengolahan
            citra digital dan machine learning.
          </Text>

        </View>

        {/* METODE */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Metode yang Digunakan
          </Text>

          <View style={styles.methodItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color="#60A5FA"
            />

            <Text style={styles.methodText}>
              Canny Edge Detection
            </Text>
          </View>

          <View style={styles.methodItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color="#8B5CF6"
            />

            <Text style={styles.methodText}>
              Gray Level Co-occurrence Matrix (GLCM)
            </Text>
          </View>

          <View style={styles.methodItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color="#00D4AA"
            />

            <Text style={styles.methodText}>
              Support Vector Machine (SVM)
            </Text>
          </View>

        </View>

        {/* PENGEMBANG */}
        <View style={styles.card}>

          <Text style={styles.cardTitle}>
            Informasi Pengembang
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>
              Nama
            </Text>

            <Text style={styles.infoValue}>
              Seli Octaria Simatupang
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>
              NIM
            </Text>

            <Text style={styles.infoValue}>
              2201020024
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>
              Program Studi
            </Text>

            <Text style={styles.infoValue}>
              Teknik Informatika
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>
              Angkatan
            </Text>

            <Text style={styles.infoValue}>
              2022
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>
              Universitas
            </Text>

            <Text style={styles.infoValue}>
              Universitas Maritim Raja Ali Haji
            </Text>
          </View>

        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Version 1.0.0
        </Text>

      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoContainer: {
    width: 130,
    height: 130,

    borderRadius: 70,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#2563EB',

    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 16,
    color: '#AFAFAF',
    marginTop: 10,
    textAlign: 'center',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.07)',

    borderRadius: 28,

    padding: 24,

    marginBottom: 22,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',

    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    color: '#D6D6D6',

    lineHeight: 30,
    marginBottom: 18,
  },

  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 18,
  },

  methodText: {
    color: '#FFFFFF',
    fontSize: 17,

    marginLeft: 15,
  },

  infoContainer: {
    marginBottom: 18,
  },

  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',

    marginBottom: 5,
  },

  infoValue: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
    marginBottom: 40,
  },

});
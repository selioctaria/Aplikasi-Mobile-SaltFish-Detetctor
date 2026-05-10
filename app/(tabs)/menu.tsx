import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { router } from 'expo-router';

export default function MenuScreen() {

  return (

    <LinearGradient
      colors={['#050816', '#0B1023', '#111827']}
      style={styles.container}
    >

      <Text style={styles.title}>
        Menu Utama
      </Text>

      {/* BUTTON MENU */}

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/kamera')}
        >
        <MaterialCommunityIcons
          name="camera"
          size={35}
          color="#60A5FA"
        />

        <Text style={styles.cardText}>
          Ambil Kamera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/galeri')}
        >
        <MaterialCommunityIcons
          name="image"
          size={35}
          color="#8B5CF6"
        />

        <Text style={styles.cardText}>
          Pilih Galeri
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <MaterialCommunityIcons
          name="history"
          size={35}
          color="#00D4AA"
        />

        <Text style={styles.cardText}>
          Riwayat
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/tentang')}
        >
        <MaterialCommunityIcons
          name="information"
          size={35}
          color="#F59E0B"
        />

        <Text style={styles.cardText}>
          Tentang
        </Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 25,
    backgroundColor: '#050816',
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
  },

  card: {
    width: '100%',
    height: 90,

    backgroundColor: 'rgba(255,255,255,0.08)',

    borderRadius: 25,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 25,

    marginBottom: 20,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',

    marginLeft: 20,
  },

});
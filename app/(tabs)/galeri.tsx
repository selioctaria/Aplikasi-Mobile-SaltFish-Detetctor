import { useState } from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GaleriScreen() {

  const [image, setImage] = useState<string | null>(null);

  // PILIH GAMBAR
  const pickImage = async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (

    <LinearGradient
      colors={['#050816', '#0B1023', '#111827']}
      style={styles.container}
    >

      {/* TITLE */}
      <Text style={styles.title}>
        Pilih Gambar
      </Text>

      <Text style={styles.subtitle}>
        Upload gambar ikan dari galeri
      </Text>

      {/* IMAGE PREVIEW */}
      <View style={styles.previewContainer}>

        {image ? (

          <Image
            source={{ uri: image }}
            style={styles.image}
          />

        ) : (

          <View style={styles.placeholder}>

            <MaterialCommunityIcons
              name="image-outline"
              size={90}
              color="#6B7280"
            />

            <Text style={styles.placeholderText}>
              Belum ada gambar dipilih
            </Text>

          </View>

        )}

      </View>

      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={pickImage}
      >

        <LinearGradient
          colors={['#2563EB', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >

          <MaterialCommunityIcons
            name="image"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Pilih dari Galeri
          </Text>

        </LinearGradient>

      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingTop: 80,
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 10,
    marginBottom: 40,
  },

  previewContainer: {
    width: '100%',
    height: 400,

    backgroundColor: 'rgba(255,255,255,0.06)',

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    marginBottom: 40,
  },

  placeholder: {
    alignItems: 'center',
  },

  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 15,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  button: {
    height: 65,

    borderRadius: 22,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    gap: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
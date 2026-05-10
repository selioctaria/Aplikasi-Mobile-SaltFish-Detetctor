import { useEffect, useRef, useState } from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function KameraScreen() {

  const [permission, requestPermission] =
    useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1200);

  }, []);

  // Belum ada permission
  if (!permission) {
    return <View />;
  }

  // Permission ditolak
  if (!permission.granted) {

    return (

      <View style={styles.permissionContainer}>

        <MaterialCommunityIcons
          name="camera-off"
          size={90}
          color="#FFFFFF"
        />

        <Text style={styles.permissionText}>
          Izin kamera diperlukan
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Izinkan Kamera
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      {/* CAMERA */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >

        {/* OVERLAY */}
        <View style={styles.overlay}>

          <Text style={styles.title}>
            Deteksi Kadar Garam
          </Text>

          <Text style={styles.subtitle}>
            Arahkan kamera ke objek ikan
          </Text>

          {/* FRAME */}
          <View style={styles.frame} />

        </View>

        {/* BOTTOM */}
        <View style={styles.bottomContainer}>

          {loading ? (

            <ActivityIndicator
              size="large"
              color="#FFFFFF"
            />

          ) : (

            <TouchableOpacity style={styles.captureButton}>

              <View style={styles.innerCapture} />

            </TouchableOpacity>

          )}

        </View>

      </CameraView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#D1D5DB',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 50,
  },

  frame: {
    width: 280,
    height: 280,

    borderWidth: 3,
    borderColor: '#60A5FA',

    borderRadius: 30,

    backgroundColor: 'transparent',
  },

  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 45,
  },

  captureButton: {
    width: 90,
    height: 90,

    borderRadius: 50,

    borderWidth: 5,
    borderColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  innerCapture: {
    width: 65,
    height: 65,

    borderRadius: 40,

    backgroundColor: '#FFFFFF',
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: '#050816',

    justifyContent: 'center',
    alignItems: 'center',

    padding: 30,
  },

  permissionText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',

    marginTop: 25,
    marginBottom: 25,
  },

  permissionButton: {
    backgroundColor: '#2563EB',

    paddingHorizontal: 30,
    paddingVertical: 15,

    borderRadius: 18,
  },

  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'http://192.168.43.110:5000/predict';

type DetectionResult = {
  kelas: string;
  fitur: {
    edge_pixel: number;
    edge_ratio: number;
    contrast: number;
    correlation: number;
    energy: number;
    homogeneity: number;
  };
  gambar: {
    original?: string;
    remove_bg?: string;
    resized?: string;
    grayscale?: string;
    clahe?: string;
    canny?: string;
  };
};

export default function KameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState('Belum ada citra');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Menunggu citra');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [flash, setFlash] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 850,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const base64Image = (base64?: string) => {
    if (!base64) return '';
    return `data:image/jpeg;base64,${base64}`;
  };

  const getResultColor = (kelas?: string) => {
    if (!kelas) return '#60A5FA';

    const lower = kelas.toLowerCase();

    if (lower.includes('rendah')) return '#10B981';
    if (lower.includes('sedang')) return '#F59E0B';
    if (lower.includes('tinggi')) return '#EF4444';

    return '#60A5FA';
  };

  const getResultIcon = (kelas?: string) => {
    if (!kelas) return 'information';

    const lower = kelas.toLowerCase();

    if (lower.includes('rendah')) return 'alert-circle';
    if (lower.includes('sedang')) return 'check-circle';
    if (lower.includes('tinggi')) return 'alert';

    return 'information';
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      if (photo?.uri) {
        setImage(photo.uri);
        setImageName('Citra kamera berhasil diambil');
        setResult(null);
        setProgress(0);
        setStepText('Citra berhasil diambil');
      }
    } catch (error) {
      Alert.alert('Gagal Mengambil Foto', 'Terjadi kesalahan saat mengambil citra.');
    }
  };

  const resetImage = () => {
    setImage(null);
    setImageName('Belum ada citra');
    setResult(null);
    setProgress(0);
    setStepText('Menunggu citra');
  };

  const saveToHistory = async (data: DetectionResult, source: 'Kamera' | 'Galeri') => {
  try {
    const newItem = {
      id: Date.now().toString(),
      image: data.gambar.original
        ? `data:image/jpeg;base64,${data.gambar.original}`
        : image,
      result: `Garam ${data.kelas}`,
      source,
      date: new Date().toLocaleDateString('id-ID'),
      edge_pixel: String(data.fitur.edge_pixel),
      edge_ratio: String(data.fitur.edge_ratio),
      contrast: String(data.fitur.contrast),
      correlation: String(data.fitur.correlation),
      energy: String(data.fitur.energy),
      homogeneity: String(data.fitur.homogeneity),
    };

    const oldData = await AsyncStorage.getItem('history_data');
    const parsedData = oldData ? JSON.parse(oldData) : [];

    const updatedData = [newItem, ...parsedData];

    await AsyncStorage.setItem('history_data', JSON.stringify(updatedData));
  } catch (error) {
    console.log('Gagal menyimpan riwayat:', error);
  }
};

  const handleDetect = async () => {
    if (!image) {
      Alert.alert('Citra Belum Diambil', 'Silakan ambil gambar ikan terlebih dahulu.');
      return;
    }

    let progressInterval: ReturnType<typeof setInterval> | null = null;

    try {
      setLoading(true);
      setResult(null);
      setProgress(0);
      setStepText('Menganalisis Citra');

      let currentProgress = 0;

      progressInterval = setInterval(() => {
        currentProgress += 5;

        if (currentProgress <= 20) {
          setStepText('Remove Background...');
        } else if (currentProgress <= 35) {
          setStepText('Resize citra 256x256...');
        } else if (currentProgress <= 50) {
          setStepText('Konversi Grayscale...');
        } else if (currentProgress <= 65) {
          setStepText('Peningkatan kontras CLAHE...');
        } else if (currentProgress <= 80) {
          setStepText('Canny Edge Detection...');
        } else if (currentProgress <= 95) {
          setStepText('Ekstraksi GLCM dan klasifikasi SVM...');
        }

        if (currentProgress < 95) {
          setProgress(currentProgress);
        }
      }, 180);

      const formData = new FormData();

      formData.append('image', {
        uri: image,
        name: 'ikan_benggol_kamera.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Gagal melakukan deteksi citra.');
      }

      if (progressInterval) {
        clearInterval(progressInterval);
      }

      setProgress(100);
      setStepText('Deteksi selesai');

      setResult({
        kelas: data.kelas,
        fitur: {
          edge_pixel: data.fitur.edge_pixel,
          edge_ratio: data.fitur.edge_ratio,
          contrast: data.fitur.contrast,
          correlation: data.fitur.correlation,
          energy: data.fitur.energy,
          homogeneity: data.fitur.homogeneity,
        },
        gambar: {
          original: data.gambar.original,
          remove_bg: data.gambar.remove_bg,
          resized: data.gambar.resized,
          grayscale: data.gambar.grayscale,
          clahe: data.gambar.clahe,
          canny: data.gambar.canny,
        },
      });

      await saveToHistory(data, 'Kamera');
      
    } catch (error: any) {
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      console.log('ERROR DETEKSI:', error);

      Alert.alert(
        'Gagal Deteksi',
        error?.message ||
          'Terjadi kesalahan saat menghubungkan aplikasi ke backend.'
      );

      setStepText('Deteksi gagal');
      setProgress(0);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <LinearGradient
        colors={['#020617', '#0F172A', '#111827']}
        style={styles.permissionContainer}
      >
        <View style={styles.permissionIconBox}>
          <MaterialCommunityIcons name="camera-off" size={82} color="#FFFFFF" />
        </View>

        <Text style={styles.permissionText}>Izin Kamera Diperlukan</Text>

        <Text style={styles.permissionSubText}>
          Aplikasi membutuhkan akses kamera untuk mengambil citra ikan Benggol.
        </Text>

        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Izinkan Kamera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButtonPermission} onPress={() => router.back()}>
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

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
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTextBox}>
              <Text style={styles.title}>Analisis Kamera</Text>
              <Text style={styles.subtitle}>
                Ambil citra ikan Benggol secara langsung untuk dianalisis menggunakan backend Flask.
              </Text>
            </View>

            <TouchableOpacity style={styles.flashButton} onPress={() => setFlash(!flash)}>
              <MaterialCommunityIcons
                name={flash ? 'flash' : 'flash-off'}
                size={24}
                color={flash ? '#FBBF24' : '#FFFFFF'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.methodCard}>
            <View style={styles.methodHeader}>
              <MaterialCommunityIcons
                name="chart-timeline-variant"
                size={21}
                color="#60A5FA"
              />

              <Text style={styles.methodTitle}>Alur Metode</Text>
            </View>

            <View style={styles.methodFlow}>
              <Text style={styles.methodBadge}>Canny Edge</Text>

              <MaterialCommunityIcons name="chevron-right" size={18} color="#94A3B8" />

              <Text style={styles.methodBadge}>GLCM</Text>

              <MaterialCommunityIcons name="chevron-right" size={18} color="#94A3B8" />

              <Text style={styles.methodBadge}>SVM</Text>
            </View>
          </View>

          <View style={styles.previewContainer}>
            {image ? (
              <>
                <Image source={{ uri: image }} style={styles.image} />

                <View style={styles.imageOverlay}>
                  <MaterialCommunityIcons name="check-circle" size={18} color="#10B981" />

                  <Text style={styles.imageOverlayText}>Citra siap dianalisis</Text>
                </View>
              </>
            ) : (
              <CameraView
                ref={cameraRef}
                style={styles.cameraPreview}
                facing="back"
                flash={flash ? 'on' : 'off'}
              >
                <View style={styles.cameraOverlay}>
                  <View style={styles.scanFrame}>
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />

                    <Text style={styles.scanText}>Arahkan kamera ke ikan</Text>
                  </View>
                </View>
              </CameraView>
            )}
          </View>

          <View style={styles.fileInfoCard}>
            <MaterialCommunityIcons
              name={image ? 'camera-check' : 'camera-outline'}
              size={22}
              color={image ? '#10B981' : '#94A3B8'}
            />

            <View style={styles.fileInfoTextBox}>
              <Text style={styles.fileInfoLabel}>Status Citra</Text>

              <Text style={styles.fileInfoValue} numberOfLines={1}>
                {imageName}
              </Text>
            </View>
          </View>

          {loading && (
            <View style={styles.progressWrapper}>
              <View style={styles.progressHeader}>
                <ActivityIndicator size="small" color="#60A5FA" />

                <Text style={styles.progressTitle}>Menganalisis Citra</Text>
              </View>

              <Text style={styles.stepText}>{stepText}</Text>

              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
              </View>

              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
          )}

          {result && !loading && (
            <>
              <View
                style={[
                  styles.resultCard,
                  { borderColor: `${getResultColor(result.kelas)}55` },
                ]}
              >
                <View style={styles.resultHeader}>
                  <MaterialCommunityIcons
                    name={getResultIcon(result.kelas) as any}
                    size={28}
                    color={getResultColor(result.kelas)}
                  />

                  <Text style={styles.resultTitle}>Hasil Deteksi Kandungan Garam</Text>
                </View>

                <View
                  style={[
                    styles.resultMainBox,
                    { backgroundColor: `${getResultColor(result.kelas)}22` },
                  ]}
                >
                  <Text style={styles.resultCategory}>Garam {result.kelas}</Text>
                </View>

                <Text style={styles.featureTitle}>Nilai Fitur Hasil Ekstraksi</Text>

                <View style={styles.featureGrid}>
                  <View style={styles.featureItem}>
                    <Text style={styles.featureLabel}>Edge Pixel</Text>
                    <Text style={styles.featureValue}>{result.fitur.edge_pixel}</Text>
                  </View>

                  <View style={styles.featureItem}>
                    <Text style={styles.featureLabel}>Edge Ratio</Text>
                    <Text style={styles.featureValue}>{result.fitur.edge_ratio}</Text>
                  </View>

                  <View style={styles.featureItem}>
                    <Text style={styles.featureLabel}>Contrast</Text>
                    <Text style={styles.featureValue}>{result.fitur.contrast}</Text>
                  </View>

                  <View style={styles.featureItem}>
                    <Text style={styles.featureLabel}>Correlation</Text>
                    <Text style={styles.featureValue}>{result.fitur.correlation}</Text>
                  </View>

                  <View style={styles.featureItem}>
                    <Text style={styles.featureLabel}>Energy</Text>
                    <Text style={styles.featureValue}>{result.fitur.energy}</Text>
                  </View>

                  <View style={styles.featureItem}>
                    <Text style={styles.featureLabel}>Homogeneity</Text>
                    <Text style={styles.featureValue}>{result.fitur.homogeneity}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.processImageCard}>
                <View style={styles.processImageHeader}>
                  <MaterialCommunityIcons
                    name="image-filter-center-focus"
                    size={24}
                    color="#38BDF8"
                  />

                  <Text style={styles.processImageTitle}>Hasil Praproses Citra</Text>
                </View>

                <Text style={styles.processImageNote}>
                  Berikut hasil tahapan pengolahan citra dari backend Flask.
                </Text>

                <View style={styles.processImageGrid}>
                  {result.gambar.original && (
                    <View style={styles.processImageItem}>
                      <Image
                        source={{ uri: base64Image(result.gambar.original) }}
                        style={styles.processImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.processImageLabel}>Original</Text>
                    </View>
                  )}

                  {result.gambar.remove_bg && (
                    <View style={styles.processImageItem}>
                      <Image
                        source={{ uri: base64Image(result.gambar.remove_bg) }}
                        style={styles.processImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.processImageLabel}>Remove BG</Text>
                    </View>
                  )}

                  {result.gambar.resized && (
                    <View style={styles.processImageItem}>
                      <Image
                        source={{ uri: base64Image(result.gambar.resized) }}
                        style={styles.processImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.processImageLabel}>Resize 256x256</Text>
                    </View>
                  )}

                  {result.gambar.grayscale && (
                    <View style={styles.processImageItem}>
                      <Image
                        source={{ uri: base64Image(result.gambar.grayscale) }}
                        style={styles.processImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.processImageLabel}>Grayscale</Text>
                    </View>
                  )}

                  {result.gambar.clahe && (
                    <View style={styles.processImageItem}>
                      <Image
                        source={{ uri: base64Image(result.gambar.clahe) }}
                        style={styles.processImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.processImageLabel}>CLAHE</Text>
                    </View>
                  )}

                  {result.gambar.canny && (
                    <View style={styles.processImageItem}>
                      <Image
                        source={{ uri: base64Image(result.gambar.canny) }}
                        style={styles.processImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.processImageLabel}>Canny</Text>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}

          <View style={styles.buttonArea}>
            {!image && !loading && (
              <TouchableOpacity activeOpacity={0.85} onPress={takePicture}>
                <LinearGradient
                  colors={['#2563EB', '#7C3AED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.mainButton}
                >
                  <MaterialCommunityIcons name="camera" size={24} color="#FFFFFF" />

                  <Text style={styles.buttonText}>Ambil Foto</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {image && !loading && !result && (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.secondaryButton}
                  onPress={resetImage}
                >
                  <MaterialCommunityIcons name="camera-retake" size={22} color="#FFFFFF" />

                  <Text style={styles.actionText}>Ulangi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.detectButton}
                  onPress={handleDetect}
                >
                  <MaterialCommunityIcons name="radar" size={22} color="#FFFFFF" />

                  <Text style={styles.actionText}>Deteksi</Text>
                </TouchableOpacity>
              </View>
            )}

            {result && !loading && (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.secondaryButton}
                  onPress={resetImage}
                >
                  <MaterialCommunityIcons name="refresh" size={22} color="#FFFFFF" />

                  <Text style={styles.actionText}>Foto Baru</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.detectButton}
                  onPress={handleDetect}
                >
                  <MaterialCommunityIcons name="reload" size={22} color="#FFFFFF" />

                  <Text style={styles.actionText}>Deteksi Lagi</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
    paddingHorizontal: 22,
    backgroundColor: '#020617',
  },

  scrollContent: {
    paddingBottom: 44,
  },

  content: {
    flexGrow: 1,
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
    marginBottom: 18,
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

  flashButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  headerTextBox: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 13.5,
    color: '#CBD5E1',
    lineHeight: 20,
    marginTop: 5,
  },

  methodCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  methodTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  methodFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
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

  previewContainer: {
    width: '100%',
    height: 310,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 14,
  },

  cameraPreview: {
    width: '100%',
    height: '100%',
  },

  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanFrame: {
    width: 235,
    height: 235,
    justifyContent: 'center',
    alignItems: 'center',
  },

  corner: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderColor: '#60A5FA',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 18,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 18,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 18,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 18,
  },

  scanText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageOverlayText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },

  fileInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  fileInfoTextBox: {
    marginLeft: 12,
    flex: 1,
  },

  fileInfoLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },

  fileInfoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },

  progressWrapper: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  progressTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  stepText: {
    color: '#CBD5E1',
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 20,
  },

  progressBarBg: {
    height: 12,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 20,
  },

  progressPercent: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },

  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  resultTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },

  resultMainBox: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 15,
  },

  resultCategory: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },

  featureTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  featureItem: {
    width: '47%',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 15,
    padding: 12,
  },

  featureLabel: {
    color: '#94A3B8',
    fontSize: 11,
  },

  featureValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },

  processImageCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },

  processImageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  processImageTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  processImageNote: {
    color: '#94A3B8',
    fontSize: 12.5,
    lineHeight: 19,
    marginBottom: 14,
  },

  processImageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  processImageItem: {
    width: '47%',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  processImage: {
    width: '100%',
    height: 125,
    borderRadius: 14,
    backgroundColor: '#000000',
  },

  processImageLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },

  buttonArea: {
    marginTop: 10,
    paddingBottom: 32,
  },

  mainButton: {
    height: 62,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 13,
  },

  secondaryButton: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.13)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  detectButton: {
    flex: 1,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  actionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  permissionIconBox: {
    width: 145,
    height: 145,
    borderRadius: 80,
    backgroundColor: 'rgba(37, 99, 235, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  permissionText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },

  permissionSubText: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 28,
  },

  permissionButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 18,
  },

  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButtonPermission: {
    marginTop: 18,
  },

  backText: {
    color: '#CBD5E1',
    fontSize: 15,
    fontWeight: '600',
  },
});
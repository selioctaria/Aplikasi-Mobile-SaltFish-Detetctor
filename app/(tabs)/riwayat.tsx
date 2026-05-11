import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type HistoryItem = {
  id: string;
  image: string;
  result: string;
  source: string;
  date: string;
  edge_pixel: string;
  edge_ratio: string;
  contrast: string;
  correlation: string;
  energy: string;
  homogeneity: string;
};

type FilterType = 'Semua' | 'Rendah' | 'Sedang' | 'Tinggi';

const STORAGE_KEY = 'history_data';

export default function RiwayatScreen() {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const filters: FilterType[] = ['Semua', 'Rendah', 'Sedang', 'Tinggi'];

  const loadHistory = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setHistory(parsedData);
    } catch (error) {
      console.log('Gagal memuat riwayat:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const saveHistory = async (newHistory: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.log('Gagal menyimpan riwayat:', error);
    }
  };

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchSearch =
        item.result.toLowerCase().includes(searchText.toLowerCase()) ||
        item.source.toLowerCase().includes(searchText.toLowerCase()) ||
        item.date.toLowerCase().includes(searchText.toLowerCase());

      const matchFilter =
        activeFilter === 'Semua' ||
        item.result.toLowerCase().includes(activeFilter.toLowerCase());

      return matchSearch && matchFilter;
    });
  }, [history, searchText, activeFilter]);

  const totalData = history.length;
  const totalRendah = history.filter(item => item.result.includes('Rendah')).length;
  const totalSedang = history.filter(item => item.result.includes('Sedang')).length;
  const totalTinggi = history.filter(item => item.result.includes('Tinggi')).length;

  const getResultColor = (result: string) => {
    if (result.includes('Sedang')) return '#10B981';
    if (result.includes('Rendah')) return '#F59E0B';
    if (result.includes('Tinggi')) return '#EF4444';
    return '#60A5FA';
  };

  const getResultIcon = (result: string) => {
    if (result.includes('Rendah')) return 'alert-circle';
    if (result.includes('Sedang')) return 'check-circle';
    if (result.includes('Tinggi')) return 'alert';
    return 'information';
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Hapus Riwayat',
      'Apakah Anda yakin ingin menghapus data riwayat ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const updatedHistory = history.filter(item => item.id !== id);
            await saveHistory(updatedHistory);
          },
        },
      ]
    );
  };

  const clearAllHistory = () => {
    if (history.length === 0) return;

    Alert.alert(
      'Hapus Semua Riwayat',
      'Apakah Anda yakin ingin menghapus seluruh riwayat deteksi?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus Semua',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setHistory([]);
            setSearchText('');
            setActiveFilter('Semua');
          },
        },
      ]
    );
  };

  const showDetail = (item: HistoryItem) => {
    Alert.alert(
      'Detail Hasil Deteksi',
      `Kategori: ${item.result}
Sumber: ${item.source}
Tanggal: ${item.date}

Metode:
Canny Edge Detection + GLCM + SVM

Nilai Fitur:
Edge Pixel: ${item.edge_pixel}
Edge Ratio: ${item.edge_ratio}
Contrast: ${item.contrast}
Correlation: ${item.correlation}
Energy: ${item.energy}
Homogeneity: ${item.homogeneity}`
    );
  };

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const resultColor = getResultColor(item.result);
    const resultIcon = getResultIcon(item.result);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.card}
        onPress={() => showDetail(item)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.info}>
          <View style={styles.resultRow}>
            <View style={[styles.badge, { backgroundColor: `${resultColor}22` }]}>
              <MaterialCommunityIcons
                name={resultIcon as any}
                size={15}
                color={resultColor}
              />

              <Text style={[styles.badgeText, { color: resultColor }]}>
                {item.result}
              </Text>
            </View>
          </View>

          <Text style={styles.meta}>
            {item.date} • {item.source}
          </Text>

          <Text style={styles.featureMini}>
            Edge: {item.edge_pixel} • Ratio: {item.edge_ratio}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => deleteItem(item.id)}
          style={styles.deleteBtn}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color="#F87171"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={styles.container}
    >
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTextBox}>
          <Text style={styles.title}>Riwayat Deteksi</Text>

          <Text style={styles.subtitle}>
            Arsip hasil analisis kadar garam ikan Benggol.
          </Text>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={clearAllHistory}>
          <MaterialCommunityIcons
            name="delete-sweep-outline"
            size={23}
            color="#F87171"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="database" size={22} color="#60A5FA" />
          <Text style={styles.statNumber}>{totalData}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialCommunityIcons name="alert-circle" size={22} color="#F59E0B" />
          <Text style={styles.statNumber}>{totalRendah}</Text>
          <Text style={styles.statLabel}>Rendah</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialCommunityIcons name="check-circle" size={22} color="#10B981" />
          <Text style={styles.statNumber}>{totalSedang}</Text>
          <Text style={styles.statLabel}>Sedang</Text>
        </View>


        <View style={styles.statCard}>
          <MaterialCommunityIcons name="alert" size={22} color="#EF4444" />
          <Text style={styles.statNumber}>{totalTinggi}</Text>
          <Text style={styles.statLabel}>Tinggi</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={22} color="#94A3B8" />

        <TextInput
          placeholder="Cari riwayat..."
          placeholderTextColor="#64748B"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <MaterialCommunityIcons name="close-circle" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
      >
        {filters.map(filter => {
          const isActive = activeFilter === filter;

          return (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.85}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {filteredHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <MaterialCommunityIcons
              name="database-off"
              size={82}
              color="#64748B"
            />
          </View>

          <Text style={styles.emptyText}>Belum ada riwayat</Text>

          <Text style={styles.emptySub}>
            Hasil deteksi dari kamera atau galeri akan muncul di halaman ini.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
    paddingHorizontal: 20,
    backgroundColor: '#020617',
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
    marginBottom: 20,
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
    marginTop: 5,
    lineHeight: 19,
  },

  clearButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.18)',
  },

  statContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 6,
  },

  statLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },

  searchBox: {
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 10,
  },

  filterScroll: {
    marginBottom: 18,
    maxHeight: 42,
  },

  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  filterButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  filterText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },

  filterTextActive: {
    color: '#FFFFFF',
  },

  listContent: {
    paddingBottom: 40,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
  },

  image: {
    width: 62,
    height: 62,
    borderRadius: 16,
    marginRight: 13,
    backgroundColor: '#111827',
  },

  info: {
    flex: 1,
  },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 50,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  meta: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 8,
  },

  featureMini: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 4,
  },

  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },

  emptyIconBox: {
    width: 135,
    height: 135,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  emptyText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  emptySub: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 28,
  },
});
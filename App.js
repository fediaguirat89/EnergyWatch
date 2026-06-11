import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, Dimensions, SafeAreaView
} from 'react-native';

const { width } = Dimensions.get('window');

// Données simulées capteurs IoT
const generateData = () => ({
  current: (Math.random() * 2 + 2).toFixed(1),
  today: (Math.random() * 0.5 + 1.5).toFixed(2),
  month: Math.floor(Math.random() * 20 + 180),
  savings: (Math.random() * 2 + 11).toFixed(2),
  weekly: [42, 58, 35, 72, 51, 88, 47],
  devices: [
    { id: 1, name: 'Chauffage', icon: '🌡️', watts: 1800, active: true },
    { id: 2, name: 'Réfrigérateur', icon: '❄️', watts: 900, active: true },
    { id: 3, name: 'Éclairage', icon: '💡', watts: 200, active: false },
    { id: 4, name: 'Chauffe-eau', icon: '🚿', watts: 2000, active: false },
  ]
});

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MAX_BAR = 88;

export default function App() {
  const [data, setData] = useState(generateData());
  const [devices, setDevices] = useState(generateData().devices);
  const [activeTab, setActiveTab] = useState('home');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulation mise à jour temps réel toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (id) => {
    setDevices(prev =>
      prev.map(d => d.id === id ? { ...d, active: !d.active } : d)
    );
  };

  const totalActive = devices
    .filter(d => d.active)
    .reduce((sum, d) => sum + d.watts, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>EnergyWatch</Text>
          <Text style={styles.headerSub}>Liège — Maison principale</Text>
        </View>
        <View style={styles.liveContainer}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>En direct</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* METRIC CARDS */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Consommation</Text>
            <Text style={styles.metricValue}>{data.current}<Text style={styles.metricUnit}> kW</Text></Text>
            <Text style={styles.metricUp}>↑ +12% vs hier</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Coût aujourd'hui</Text>
            <Text style={styles.metricValue}>{data.today}<Text style={styles.metricUnit}> €</Text></Text>
            <Text style={styles.metricDown}>↓ -5% vs hier</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Ce mois-ci</Text>
            <Text style={styles.metricValue}>{data.month}<Text style={styles.metricUnit}> kWh</Text></Text>
            <Text style={styles.metricUp}>↑ +8% vs juin</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Économies</Text>
            <Text style={styles.metricValue}>{data.savings}<Text style={styles.metricUnit}> €</Text></Text>
            <Text style={styles.metricDown}>↓ Ce mois</Text>
          </View>
        </View>

        {/* CHART */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Consommation 7 jours</Text>
            <Text style={styles.chartUnit}>kWh</Text>
          </View>
          <View style={styles.bars}>
            {data.weekly.map((val, i) => (
              <View key={i} style={styles.barWrap}>
                <View style={[
                  styles.bar,
                  { height: (val / MAX_BAR) * 80,
                    backgroundColor: val === Math.max(...data.weekly)
                      ? '#f87171'
                      : val === Math.min(...data.weekly)
                      ? '#4ade80'
                      : '#0891b2'
                  }
                ]} />
                <Text style={styles.barLabel}>{DAYS[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ALERT */}
        <View style={styles.alert}>
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.alertText}>
            Pic détecté — Samedi 21h : {Math.max(...data.weekly)} kWh
          </Text>
        </View>

        {/* DEVICES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appareils connectés</Text>
          <Text style={styles.totalWatts}>Total actif : {totalActive} W</Text>
        </View>

        {devices.map(device => (
          <View key={device.id} style={styles.deviceCard}>
            <View style={styles.deviceLeft}>
              <View style={styles.deviceIcon}>
                <Text style={{ fontSize: 18 }}>{device.icon}</Text>
              </View>
              <View>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceStatus}>
                  {device.active ? `Actif — ${device.watts} W` : 'Inactif'}
                </Text>
              </View>
            </View>
            <View style={styles.deviceRight}>
              {device.active && (
                <Text style={styles.deviceCost}>
                  {(device.watts * 0.0003).toFixed(3)} €/h
                </Text>
              )}
              <TouchableOpacity
                style={[styles.toggle, device.active ? styles.toggleOn : styles.toggleOff]}
                onPress={() => toggleDevice(device.id)}
              >
                <Text style={styles.toggleText}>{device.active ? 'ON' : 'OFF'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.updateTime}>
          Dernière mise à jour : {lastUpdate.toLocaleTimeString('fr-BE')}
        </Text>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', icon: '🏠', label: 'Accueil' },
          { id: 'chart', icon: '📊', label: 'Analyses' },
          { id: 'devices', icon: '💡', label: 'Appareils' },
          { id: 'alerts', icon: '🔔', label: 'Alertes' },
          { id: 'settings', icon: '⚙️', label: 'Réglages' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={styles.navItem}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={{ fontSize: 20 }}>{tab.icon}</Text>
            <Text style={[styles.navLabel, activeTab === tab.id && styles.navLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll: { flex: 1 },

  header: {
    backgroundColor: '#0f2d40',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#6ee7b7', fontSize: 18, fontWeight: '600' },
  headerSub: { color: '#4a6a7a', fontSize: 11, marginTop: 2 },
  liveContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ade80' },
  liveText: { color: '#4ade80', fontSize: 12 },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
  },
  metricCard: {
    backgroundColor: '#1a2a3a',
    borderRadius: 12,
    padding: 12,
    width: (width - 32) / 2 - 4,
    borderWidth: 0.5,
    borderColor: '#2a3a4a',
  },
  metricLabel: { color: '#6b8fa8', fontSize: 11, marginBottom: 4 },
  metricValue: { color: '#e2e8f0', fontSize: 22, fontWeight: '600' },
  metricUnit: { color: '#6b8fa8', fontSize: 12, fontWeight: '400' },
  metricUp: { color: '#f87171', fontSize: 10, marginTop: 4 },
  metricDown: { color: '#4ade80', fontSize: 10, marginTop: 4 },

  chartCard: {
    backgroundColor: '#1a2a3a',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#2a3a4a',
  },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  chartTitle: { color: '#6b8fa8', fontSize: 12 },
  chartUnit: { color: '#6ee7b7', fontSize: 12 },
  bars: { flexDirection: 'row', alignItems: 'flex-end', height: 100, gap: 4 },
  barWrap: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  barLabel: { color: '#4a6a7a', fontSize: 9 },

  alert: {
    backgroundColor: '#2d1a1a',
    borderWidth: 0.5,
    borderColor: '#7f1d1d',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertIcon: { fontSize: 16 },
  alertText: { color: '#fca5a5', fontSize: 12, flex: 1 },

  section: {
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { color: '#6b8fa8', fontSize: 12 },
  totalWatts: { color: '#6ee7b7', fontSize: 12 },

  deviceCard: {
    backgroundColor: '#1a2a3a',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#2a3a4a',
  },
  deviceLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  deviceIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#0f2d40',
    justifyContent: 'center', alignItems: 'center',
  },
  deviceName: { color: '#e2e8f0', fontSize: 13, fontWeight: '500' },
  deviceStatus: { color: '#6b8fa8', fontSize: 11, marginTop: 2 },
  deviceRight: { alignItems: 'flex-end', gap: 4 },
  deviceCost: { color: '#6b8fa8', fontSize: 10 },
  toggle: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20,
  },
  toggleOn: { backgroundColor: '#16a34a' },
  toggleOff: { backgroundColor: '#374151' },
  toggleText: { color: '#ffffff', fontSize: 11, fontWeight: '600' },

  updateTime: {
    color: '#4a6a7a', fontSize: 10,
    textAlign: 'center', marginTop: 8,
  },

  bottomNav: {
    backgroundColor: '#0f2d40',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#1a3a4a',
  },
  navItem: { alignItems: 'center', gap: 3 },
  navLabel: { color: '#4a6a7a', fontSize: 9 },
  navLabelActive: { color: '#6ee7b7' },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Composant pour les cartes du menu
const MenuCard = ({ title, subtitle, icon, theme, onPress }) => {
  const isDark = theme === 'dark';
  return (
    <TouchableOpacity 
      style={[styles.card, isDark ? styles.cardDark : styles.cardLight]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={40} color="white" />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, isDark ? styles.textWhite : styles.textBlack]}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={30} color="#C41E3A" />
    </TouchableOpacity>
  );
};

export default function App() {
  const [theme, setTheme] = useState('light'); // 'light' ou 'dark'
  const isDark = theme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header avec Logo */}
        <View style={styles.header}>
          <View style={[styles.logoPlaceholder, { borderColor: '#C41E3A' }]}>
             <MaterialCommunityIcons name="airplane-takeoff" size={60} color="#C41E3A" />
          </View>
          <Text style={styles.brandTitle}>AIR TAHITI</Text>
          <Text style={styles.brandSubtitle}>— TOOLS —</Text>
          <Text style={[styles.toolboxText, isDark ? styles.textWhite : styles.textBlack]}>
            AIRCRAFT MAINTENANCE TOOLBOX
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuCard 
            theme={theme}
            title="FUEL TOOLS" 
            subtitle="Converter • Uplift" 
            icon="gas-station"
          />
          <MenuCard 
            theme={theme}
            title="TORQUE & UNITS" 
            subtitle={"Torque • Length\nPressure • Mass\nTemperature"} 
            icon="wrench"
          />
          <MenuCard 
            theme={theme}
            title="SETTINGS" 
            subtitle="Theme • Language • Fuel Density" 
            icon="cog"
            onPress={() => setTheme(isDark ? 'light' : 'dark')}
          />
        </View>

        <Text style={styles.versionText}>VERSION 1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgLight: { backgroundColor: '#F8F8F8' },
  bgDark: { backgroundColor: '#121212' },
  scrollContainer: { padding: 20, alignItems: 'center' },
  
  header: { alignItems: 'center', marginBottom: 40, marginTop: 20 },
  brandTitle: { fontSize: 32, fontWeight: '900', color: '#C41E3A', letterSpacing: 2 },
  brandSubtitle: { fontSize: 24, fontWeight: 'bold', color: '#C41E3A', marginTop: -5 },
  toolboxText: { fontSize: 14, fontWeight: '600', marginTop: 10, opacity: 0.8 },
  
  menuContainer: { width: '100%', gap: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardLight: { backgroundColor: '#FFFFFF' },
  cardDark: { backgroundColor: '#1E1E1E' },
  
  iconContainer: {
    backgroundColor: '#C41E3A',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  
  textWhite: { color: '#FFFFFF' },
  textBlack: { color: '#000000' },
  versionText: { color: '#C41E3A', fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
});

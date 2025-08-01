import React from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList } from 'react-native';

const stocks = [
  { name: 'Patanjali Mustard Oil 1 ltr', qty: '18.00 Pcs.' },
  { name: 'Patanjali Mustard Oil 5 ltr', qty: '20.00 Pcs.' },
  { name: 'Poha 1 kg', qty: '100.00 Pcs.' },
  { name: 'Poha 500 Gm', qty: '50.00 Pcs.' },
  { name: 'Saffola Refined Oil 1 ltr', qty: '10.00 Pcs.' },
  { name: 'Saffola Refined Oil 5 ltr', qty: '10.00 Pcs.' },
  { name: 'Sooji 1 kg', qty: '15.00 Pcs.' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1362b2" barStyle="light-content" />

      
      <View style={styles.header}>
        <Text style={styles.menuIcon}>☰</Text>
        <Text style={styles.headerTitle}>Demo Company</Text>
        <Text style={styles.arrowIcon}>⌄</Text>
      </View>

      <View style={styles.statusChipContainer}>
        <View style={styles.statusChip}>
          <Text style={styles.statusChipText}>STOCK STATUS</Text>
        </View>
      </View>

      
      <View style={styles.dateContainer}>
        <Text style={styles.calendarIcon}>📅</Text>
        <Text style={styles.dateText}>31-03-2023</Text>
      </View>

      <View style={styles.divider} />

    
      <FlatList
        data={stocks}
        keyExtractor={(item, idx) => idx.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.stockRow}>
            <Text style={styles.stockName}>{item.name}</Text>
            <Text style={styles.stockQty}>{item.qty}</Text>
          </View>
        )}
      />


      <View style={styles.bottomRow}>
        <Text style={styles.totalLabel}>Total Qty:</Text>
        <Text style={styles.totalQty}>2,585.00</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9ff',
  },
  header: {
  backgroundColor: '#1362b2',
  height: 120,
  paddingHorizontal: 18,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 2,
  borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
  },
  menuIcon: {
    fontSize: 23,
    color: 'white',
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontWeight: '400',
    fontSize: 19,
    flex: 1,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 20,
    marginLeft: 6,
    marginBottom: 2,
  },
  statusChipContainer: {
    alignItems: 'center',
    marginTop: -24,
    zIndex: 3,
    marginBottom: 15,
  },
  statusChip: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 66,
    borderRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 180,
    alignItems: 'center'
  },
  statusChipText: {
    color: '#6f6f70ff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 2
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 2,
    gap: 8,
  },
  calendarIcon: {
    fontSize: 19,
    marginRight: 7,
    color: '#8c8c8c'
  },
  dateText: {
    fontSize: 15,
    color: '#484d50',
    fontWeight: '500',
  },
  divider: {
    marginTop: 15,
    height: 1,
    backgroundColor: '#ececec',
    marginHorizontal: 10,
    marginBottom: 2,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f9',
    backgroundColor: 'white',
    fontSize: 15,
  },
  stockName: {
    fontSize: 15,
    color: '#363d41',
  },
  stockQty: {
    fontSize: 15,
    color: '#757575',
    fontWeight: '500'
  },
  bottomRow: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: '#eae8e8ff',
    borderTopWidth: 1,
    borderTopColor: '#f3f3f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  totalLabel: {
    fontSize: 15,
    color: '#080404ff',
    fontWeight: '600'
  },
  totalQty: {
    fontSize: 15,
    color: '#040507ff',
    fontWeight: 'bold'
  },
});
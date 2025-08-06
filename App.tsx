import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import uuid from 'react-native-uuid';


const fetchStocks = async (page: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockData = [];
  const products = ['Patanjali Mustard Oil', 'Poha', 'Saffola Refined Oil', 'Sooji'];
  const sizes = ['1 ltr', '5 ltr', '1 kg', '500 Gm'];
  
  for (let i = 0; i < 20; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const qty = (Math.random() * 100).toFixed(2);
    
    mockData.push({
      id: uuid.v4().toString(), 
      name: `${product} ${size}`,
      qty: `${qty} Pcs.`
    });
  }
  
  return mockData;
};


type Stock = { id: string; name: string; qty: string };

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalQty, setTotalQty] = useState(2585.00);

  const loadStocks = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const newStocks = await fetchStocks(page);
      setStocks(prev => [...prev, ...newStocks]);
      setPage(prev => prev + 1);

      const newQty = newStocks.reduce((sum, item) => sum + parseFloat(item.qty), 0);
      setTotalQty(prev => prev + newQty);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    loadStocks();
  }, []);

  const renderItem = ({ item }: { item: Stock }) => (
    <View style={styles.stockRow}>
      <Text style={styles.stockName}>{item.name}</Text>
      <Text style={styles.stockQty}>{item.qty}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#1362b2" />
      </View>
    );
  };

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
        keyExtractor={(item) => item.id} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={renderItem}
        onEndReached={loadStocks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />

      <View style={styles.bottomRow}>
        <Text style={styles.totalLabel}>Total Qty:</Text>
        <Text style={styles.totalQty}>
          {totalQty.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </Text>
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
    alignItems: 'center',
  },
  statusChipText: {
    color: '#6f6f70ff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 2,
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
    color: '#8c8c8c',
  },
  dateText: {
    fontSize: 15,
    color: '#484d50',
    fontWeight: '500',
  },
  divider: {
    marginTop: 15,
    height: 1,
    backgroundColor: '#fffdfdff',
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
    fontWeight: '500',
  },
  bottomRow: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: '#f0ededff',
    borderTopWidth: 1,
    borderTopColor: '#f3f3f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  totalLabel: {
    fontSize: 15,
    color: '#080404ff',
    fontWeight: '600',
  },
  totalQty: {
    fontSize: 15,
    color: '#040507ff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    paddingVertical: 20,
  },
});
// PurchaseHistory.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    loadPurchaseHistory();
  }, []);

  const loadPurchaseHistory = async () => {
    try {
      const purchaseHistoryData = await AsyncStorage.getItem('@purchaseHistory');
      if (purchaseHistoryData !== null) {
        setPurchaseHistory(JSON.parse(purchaseHistoryData));
      }
    } catch (error) {
      console.error('Error loading purchase history from AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Purchase History</Text>
      {purchaseHistory.length === 0 ? (
        <Text style={styles.emptyText}>No purchase history available.</Text>
      ) : (
        <FlatList
          data={purchaseHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.purchaseItem}>
              <Text style={styles.itemText}>Total Bill: Rs. {item.totalBill}/-</Text>
              <Text style={styles.itemText}>Date: {item.date}</Text>
              <Text style={styles.itemText}>Time: {item.time}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 0,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  purchaseItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PurchaseHistory;

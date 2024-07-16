import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
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
        const parsedData = JSON.parse(purchaseHistoryData);
        console.log('Parsed Purchase History:', parsedData); // Debug log
        setPurchaseHistory(parsedData);
      } else {
        console.log('No purchase history data found.');
      }
    } catch (error) {
      console.error('Error loading purchase history from AsyncStorage:', error);
    }
  };

  const deleteRecord = async (index) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const updatedHistory = purchaseHistory.filter((_, i) => i !== index);
              setPurchaseHistory(updatedHistory);
              await AsyncStorage.setItem('@purchaseHistory', JSON.stringify(updatedHistory));
            } catch (error) {
              console.error('Error deleting record from AsyncStorage:', error);
            }
          }
        }
      ]
    );
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
          renderItem={({ item, index }) => (
            <View style={styles.purchaseItem}>
              <Text style={styles.itemText}><Text style={styles.boldText}>Total Bill:</Text> Rs. {item.totalBill}/-</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Date:</Text> {item.date}</Text>
              <Text style={styles.itemText}><Text style={styles.boldText}>Time:</Text> {item.time}</Text>
              <Button title="Delete" onPress={() => deleteRecord(index)} color="#FF0000" />
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
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontFamily: 'Raleway-Regular',
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

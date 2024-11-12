// screens/TransactionDetails.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TransactionDetails = ({ route }) => {
  const { purchase } = route.params;  // Get the selected purchase data from params

  return (
    <ScrollView style={styles.container}>
      {/* Date and Time at the top */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.detailsText}>
          <Text style={styles.boldText}>Date:</Text> {purchase.date}
        </Text>
        <Text style={styles.detailsText}>
          <Text style={styles.boldText}>Time:</Text> {purchase.time}
        </Text>
      </View>

      {/* Product Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableText, styles.boldText]}>Product</Text>
          <Text style={[styles.tableText, styles.boldText]}>Quantity</Text>
          <Text style={[styles.tableText, styles.boldText]}>Price</Text>
        </View>

        {purchase.cart && purchase.cart.map((product, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableText}>{product.productName}</Text>
            <Text style={styles.tableText}>{product.quantity}</Text>
            <Text style={styles.tableText}>Rs. {product.price}/-</Text>
          </View>
        ))}
      </View>

      {/* Total Bill */}
      <View style={styles.totalBillContainer}>
        <Text style={[styles.detailsText, styles.boldText]}>
          Total Bill: Rs. {purchase.totalBill}/-
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  tableText: {
    fontSize: 12,
    width: '30%', // Adjust width for columns
    textAlign: 'center',
  },
  totalBillContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
});

export default TransactionDetails;

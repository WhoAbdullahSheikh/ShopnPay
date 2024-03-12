// Receipt.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Receipt = ({ cart }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Receipt</Text>
      <View style={styles.itemsContainer}>
        {cart.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.productName}</Text>
            <Text>${item.price}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.total}>Total: ${cart.reduce((acc, item) => acc + item.price, 0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default Receipt;

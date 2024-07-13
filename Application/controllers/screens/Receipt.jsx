import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const Receipt = ({ cart, totalBill }) => {
  const calculateTotal = () => {
    return parseFloat(totalBill).toFixed(2); 
  };

  const AppLogo = () => (
    <Image
      source={require('../../pics/mainlogo.png')}
      style={styles.logo}
    />
  );

  const getCurrentDate = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    return `${date}`;
  };

  const getCurrentTime = () => {
    const current = new Date();
    const time = `${current.getHours()}:${current.getMinutes()}`;
    return `${time}`;
  };

  return (
    <View style={styles.container}>
      {/* Cut Paper Design at Top */}
      <View style={styles.title}>
        <AppLogo />
      </View>
      <Text style={styles.title2}>E-Receipt</Text>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.date}><Text style={styles.boldText}>Date:</Text> {getCurrentDate()}</Text>
        <Text style={styles.time}><Text style={styles.boldText}>Time:</Text> {getCurrentTime()}</Text>
      </View>
      <View style={styles.tableHeader_top}></View>
      <View style={styles.tableHeader_bottom}>
        <Text style={styles.tableHeaderText}>Description</Text>
        <Text style={styles.tableHeaderText}>Qty</Text>
        <Text style={styles.tableHeaderText}>Unit Price</Text>
        <Text style={styles.tableHeaderText}>Total</Text>
      </View>

      <View style={styles.itemsContainer}>
        {cart.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.tableText}>{item.productName}</Text>
            <Text style={styles.tableText}>{item.quantity}</Text>
            <Text style={styles.tableText}> {parseFloat(item.price).toFixed(2)}/-</Text> 
            <Text style={styles.tableText}> {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.tableHeader_top}></View>
      <Text style={styles.total}><Text style={styles.boldText}>Total: Rs.</Text>{calculateTotal()}/-</Text>
      <View style={styles.tableHeader_top}></View>

      <View style={styles.notesContainer}>
        <Text style={styles.noteText}></Text>
        <Text style={styles.noteText}>Bring Invoice for return/exchange within 5 days of purchase.{'\n'}
          No return or Exchange on{'\n'}Crockery, Toys, Cosmetics & Frozen Items{'\n'}</Text>
        <Text style={styles.noteText}><Text style={styles.boldText}>Developed by:</Text> &copy;Shopnpay 2024</Text>
      </View>
      {/* Cut Paper Design at Bottom */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  logo: {
    width: 290,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    marginBottom: 12,
  },
  title2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    marginTop: 15,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 10,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 10,
    color: 'grey',
  },
  tableHeader_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
    paddingBottom: 5,
  },
  tableHeader_bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  itemsContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableText: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  total: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  notesContainer: {
    marginTop: 20,
    paddingTop: 10,
  },
  noteText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'grey',
  },
});

export default Receipt;

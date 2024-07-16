import React from 'react';
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const Receipt = ({ cart, totalBill }) => {
  const calculateTotal = () => {
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    // Add POS service fee (assuming it's a fixed amount of 1.00)
    const posServiceFee = 1.00;
    const grandTotal = subtotal + posServiceFee;

    return {
      subtotal: parseFloat(subtotal).toFixed(2),
      posServiceFee: parseFloat(posServiceFee).toFixed(2),
      grandTotal: parseFloat(grandTotal).toFixed(2),
    };
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
    let hours = current.getHours();
    const minutes = current.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const total = calculateTotal();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Cut Paper Design at Top */}
        <View style={styles.title}>
          <AppLogo />
        </View>
        <Text style={styles.title2}>E-Invoice</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}><Text style={styles.boldText}>Date:</Text> {getCurrentDate()}</Text>
          <Text style={styles.time}><Text style={styles.boldText}>Time:</Text> {getCurrentTime()}</Text>
        </View>
        <View style={styles.tableHeader_top}></View>
        <View style={styles.tableHeader_bottom}>
          <Text style={styles.tableHeaderText}>Description</Text>
          <Text style={styles.tableHeaderText}>Qty</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
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
        <Text style={styles.total}><Text style={styles.boldText}>Subtotal: </Text> Rs. {total.subtotal}/-</Text>
        <View style={styles.tableHeader_top}></View>
        <View style={styles.servicesfeecontainer}>
          <Text style={styles.fee}><Text style={styles.boldText}>FBR POS Service Free:       </Text> Rs. {total.posServiceFee}/-</Text>
          <Text style={styles.fee}><Text style={styles.boldText}>Grand Total:       </Text> Rs. {total.grandTotal}/-</Text>
        </View>
        <View style={styles.notesContainer}>
          <Text style={styles.noteText}></Text>
          <Text style={styles.noteText}>Bring Invoice for return/exchange within 5 days of purchase.{'\n'}
            No return or Exchange on{'\n'}Crockery, Toys, Cosmetics & Frozen Items{'\n'}</Text>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value="This receipt is originally generated by &copy; Shopnpay 2024"  // You can customize this value as needed
              size={100}
              color="black"
              backgroundColor="white"
              style={styles.qrCode}
            />
          </View>
          <Text style={styles.signatureText}>This receipt is computer-generated and digitally signed. No need of any signatures</Text>
          <Text style={styles.noteText}><Text style={styles.boldText}>Developed by:</Text> &copy;Shopnpay 2024</Text>
        </View>
        {/* Cut Paper Design at Bottom */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
    borderWidth: 3,
    borderStyle: 'dotted',
    borderColor: '#A52A2A',
    paddingBottom: 30,
  },
  logo: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    marginBottom: 12,
  },
  title2: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
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
  servicesfeecontainer: {
    marginTop: 15,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  fee: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'right',
    marginLeft: 10,
    color: 'black',
  },

  tableHeader_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 5,
    paddingBottom: 5,
  },
  tableHeader_bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 13,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
  itemsContainer: {
    marginTop: 5,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableText: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  total: {
    fontSize: 13,
    alignSelf: 'flex-end',
  },
  notesContainer: {
    marginTop: 10,
    paddingTop: 10,
  },
  noteText: {
    fontSize: 13,
    textAlign: 'center',
    color: 'grey',
  },
  signatureText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    color: 'grey',
    marginBottom: 10,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCodeText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'Raleway-Regular',
  },
  qrCode: {
    marginTop: 10,
  },
});

export default Receipt;

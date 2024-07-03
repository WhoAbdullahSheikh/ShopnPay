import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const PromotionScreen = () => {
  // Sample promotion offers data
  const promotionOffers = [
    {
      id: 1,
      title: '50% Off on Electronics',
      description: 'Get 50% off on all electronic items. Limited time offer!',
      image: require('../../pics/alfateh.png'),
    },
    {
      id: 2,
      title: 'Free Shipping on Orders Above $50',
      description: 'Enjoy free shipping on all orders above $50. Hurry up!',
      image: require('../../pics/alfateh.png'),
    },
    {
      id: 3,
      title: 'Buy One Get One Free on Apparel',
      description: 'Buy one apparel item and get another one for free. Limited stock!',
      image: require('../../pics/alfateh.png'),
    },
  ];

  // Render each promotion offer as a card
  const renderPromotionOffer = (offer) => (
    <TouchableOpacity key={offer.id} style={styles.card}>
      <Image source={offer.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {promotionOffers.map((offer) => renderPromotionOffer(offer))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'black', // Choose the color of the outline
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark color for the title
  },
  description: {
    fontSize: 16,
    color: '#555', // Light dark color for the description
  },
});


export default PromotionScreen;

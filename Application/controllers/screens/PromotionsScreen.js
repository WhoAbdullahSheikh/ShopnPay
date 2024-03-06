import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const PromotionsScreen = () => {
  const [promotions, setPromotions] = useState([]);

  // Example: Fetch promotions data from API
  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = () => {
    // Fetch promotions data from your API
    // Update state with fetched promotions
    const fetchedPromotions = [
      {
        id: 1,
        title: 'Special Offer 1',
        image: require('./../../pics/alfateh.png'),
      },
      {
        id: 2,
        title: 'Special Offer 2',
        image: require('./../../pics/alfateh.png'),
      },
      // Add more promotions data as needed
    ];
    setPromotions(fetchedPromotions);
  };

  // Render each promotion item
  const renderPromotionItem = ({item}) => (
    <TouchableOpacity
      style={styles.promotionItem}
      onPress={() => handlePromotionPress(item)}>
      <Image source={item.image} style={styles.promotionImage} />
      <View style={styles.overlay}>
        <Text style={styles.promotionTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePromotionPress = item => {
    // Handle navigation or other actions when a promotion is pressed
    console.log(`Pressed promotion: ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={promotions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPromotionItem}
        contentContainerStyle={styles.promotionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  promotionList: {
    paddingBottom: 20,
  },
  promotionItem: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  promotionImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default PromotionsScreen;

//Imports
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from './Sidebar';
import DrawerScreen from './Sidebar';

////////////////////////////////////////////////////////////////

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Define your shopping marts data
  const shoppingMarts = [
    { id: 1, name: 'Imtiaz', location: 'Imtiaz Super Market', image: require('../../pics/imtiaz.png') },
    { id: 2, name: 'Al-Fatah', location: 'Al-Fatah Store', image: require('../../pics/alfateh.png') },
    { id: 3, name: 'SaveMart', location: 'The Real Store', image: require('../../pics/savemart.png') },
    { id: 4, name: 'PCC', location: 'Punjab Cash & Carry', image: require('../../pics/pcc.png') },
  ];

  // Render each shopping mart item as a card
  const renderShoppingMartItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleMartPress(item)}>
      <Image source={item.image} style={styles.martImage} />
      <Text style={styles.martName}>{item.name}</Text>
      <Text style={styles.martLocation}>{item.location}</Text>
    </TouchableOpacity>
  );

  // Handle press on a shopping mart card
  const handleMartPress = (mart) => {
    // Navigate to details screen or perform any other action
    console.log(`Navigating to details of ${mart.name}`);
  };

  // Filter shopping marts based on search query
  const filteredMarts = shoppingMarts.filter(mart =>
    mart.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Parent container for drawer icon and search bar */}
      <View style={styles.headerContainer}>
        {/* Drawer Icon */}
        <TouchableOpacity
          style={styles.drawerIconContainer}
          onPress={() => navigation.navigate('Sidebar')} // Navigate to Sidebar
        >
          <Icon name="bars" size={25} color="white" />
        </TouchableOpacity>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search Marts"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* FlatList and other components */}
      <FlatList
        data={filteredMarts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderShoppingMartItem}
        numColumns={2}
        contentContainerStyle={styles.martList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A52A2A',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  drawerIconContainer: {
    marginRight: 10,
    
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: 'white',
  },
  martList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  martImage: {
    width: 150,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  martName: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Raleway-Bold',
  },
  martLocation: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;

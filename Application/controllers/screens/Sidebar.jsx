import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
import jsonImage from '../../pics/avatar.gif';

const Sidebar = ({ navigation }) => {
  const handleSignOut = () => {
    
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <Avatar
            rounded
            source={jsonImage}
            style={styles.profileImage}
            size="large"
            containerStyle={styles.avatar}
          />
          <Text style={styles.username}>Abdullah Sheikh</Text>
        </View>
        {/* Menu Items Section */}
        <View style={styles.menuItems}>
          <DrawerItem
            label="Home"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <DrawerItem
            label="Profile"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
          {/* Add more menu items as needed */}
        </View>
        {/* Signout Section */}
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '80%', // Adjust the width of the sidebar as needed
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItems: {
    marginTop: 20,
    marginLeft: 10,
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: '#A52A2A',
    borderWidth: 3,
  },
});

export default Sidebar;

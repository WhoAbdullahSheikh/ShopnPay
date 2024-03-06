import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar} from 'react-native-elements';

const Sidebar = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const animatedValue = new Animated.Value(0);

  const [translateX] = React.useState(new Animated.Value(-windowWidth));

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignOut = () => {
    // Implement signout functionality
  };

  return (
    <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
      <DrawerContentScrollView>
        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <Avatar
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/men/99.jpg',
            }}
            size="large"
            containerStyle={styles.avatar}
          />
          <Text style={styles.username}>John Doe</Text>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
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
});

export default Sidebar;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import jsonImage from '../../pics/avatar.gif';
import Icons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../components/config';
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const AccountInformation = () => {
    navigation.navigate('AccountInformation');
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      Alert.alert('Signed Out', 'You have been signed out successfully');
      navigation.replace('Login'); // Navigate to Login screen
    } catch (error) {
      console.error('Error signing out', error);
      Alert.alert('Error', 'There was an error signing out. Please try again.');
    }
  };

  useEffect(() => {
    const optionalConfigObject = {
      unifiedErrors: false,
      passcodeFallback: false,
    };

    const loadSessionData = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const userSession = JSON.parse(session);
          setPhoneNumber(userSession.phoneNumber);
          fetchUserData(userSession.phoneNumber); // Fetch user data by phone number
        }
      } catch (error) {
        console.error('Failed to load session data', error);
      }
    };

    const fetchUserData = async (phoneNumber) => {
      const detailsRef = doc(db, 'customers', 'details');
      const docSnapshot = await getDoc(detailsRef);

      if (docSnapshot.exists()) {
        const users = docSnapshot.data().RegisteredUser;
        const userData = users.find(user => user.phoneNumber === phoneNumber);
        if (userData) {
          setName(userData.name); // Set the name state
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert('User not found', 'User data not available.');
        }
      } else {
        setLoading(false);
        Alert.alert('No user details found', 'User details collection is empty.');
      }
    };

    loadSessionData();
  }, [navigation]);


  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.heading1}>Account info, Settings & More</Text>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          {/* Profile Image and Details */}
          <View style={styles.profileContainer}>
            <Image source={jsonImage} style={styles.profileImage} />
            <View style={styles.textContainer}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#A52A2A" />
                </View>
              ) : (
                <>
                  <Text style={styles.customerName}>{name}</Text>
                  <Text style={styles.profilePhone}>{phoneNumber}</Text>
                </>
              )}
            </View>
          </View>

          {/* Section Break Line */}
          <View style={styles.sectionBreakLine}></View>
        </View>

        {/* Other Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          {/* Option Buttons */}
          <TouchableOpacity onPress={AccountInformation} style={styles.optionButton}>
            <Icons name="user" size={18} color="white" />
            <Text style={styles.optionText}>Account Information</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('NotificationSettings')} style={styles.optionButton}>
            <Icon name="notifications" size={18} color="white" />
            <Text style={styles.optionText}>Notifications</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Icon name="lock-closed" size={18} color="white" />
            <Text style={styles.optionText}>Privacy</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="information-circle" size={18} color="white" />
            <Text style={styles.optionText}>About Us</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut} style={styles.optionButton}>
            <Icon name="log-out" size={18} color="white" />
            <Text style={styles.optionText}>Sign out</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  title: {
    paddingTop: 50,
    fontSize: 25,
    fontFamily: 'Raleway-Bold',
  },
  heading1: {
    fontSize: 15,
    marginBottom: 20,
    fontFamily: 'Raleway-Bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Raleway-Bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: '#A52A2A',
    borderWidth: 3,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  customerName: {
    fontSize: 24,
    fontFamily: 'Raleway-Regular',
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 18,
    color: 'grey',
  },
  sectionBreakLine: {
    height: 1,
    backgroundColor: '#A52A2A',
    marginVertical: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 0,
    borderColor: '#A52A2A',
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#A52A2A',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
  },
});

export default ProfileScreen;
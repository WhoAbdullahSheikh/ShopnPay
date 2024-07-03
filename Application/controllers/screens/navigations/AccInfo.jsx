import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import jsonImage from '../../../pics/avatar.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchID from 'react-native-touch-id';
import AnimatedComponent from '../../components/AnimatedComponent';

const AccInfo = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // show passcode authentication if biometrics fail (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        if (
          biometryType === 'FaceID' ||
          biometryType === 'TouchID' ||
          biometryType === 'Biometrics'
        ) {
          TouchID.authenticate(
            'To access your account information, please authenticate',
            optionalConfigObject,
          )
            .then(success => {
              setAuthenticated(true); // User authenticated
            })
            .catch(error => {
              Alert.alert(
                'Authentication Failed',
                'You could not be authenticated. Try again or cancel.',
                [
                  { text: 'Try Again', onPress: () => navigation.goBack() },
                  { text: 'Cancel', onPress: () => navigation.goBack() },
                ],
              );
            });
        }
      })
      .catch(error => {
        // Failure scenario handling for not supported or other errors
        Alert.alert(
          'Authentication not supported',
          'Your device does not support Face ID/Touch ID.',
        );
      });

    const loadSessionData = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const userSession = JSON.parse(session);
          setPhoneNumber(userSession.phoneNumber);
        }
      } catch (error) {
        console.error('Failed to load session data', error);
      }
    };

    loadSessionData();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        
          <>
            <View style={styles.profileContainer}>
              <Image source={jsonImage} style={styles.profileImage} />
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <Text style={styles.profilePhone}>{phoneNumber}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="person" size={24} color="white" />
                <Text style={styles.actionButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="lock-closed" size={24} color="white" />
                <Text style={styles.actionButtonText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="log-out" size={24} color="white" />
                <Text style={styles.actionButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  profilePhone: {
    fontSize: 18,
    color: 'gray',
  },
  actionsContainer: {
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default AccInfo;

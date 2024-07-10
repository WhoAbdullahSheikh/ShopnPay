import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import jsonImage from '../../../pics/avatar.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/config';

const AccInfo = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessionData = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const userSession = JSON.parse(session);
          setPhoneNumber(userSession.phoneNumber);
          fetchUserData(userSession.phoneNumber);
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
          setName(userData.name);
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


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A52A2A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.cancelButton]} onPress={() => navigation.goBack()}>
          <Icon2 name="close" size={30} color="black" />

        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image source={jsonImage} style={styles.profileImage} />
          <Text style={styles.profileName}>{name}</Text>

        </View>
        <View style={styles.actionsContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}

          />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}

          />

          
          <TouchableOpacity
            style={[styles.actionButton, styles.inputMargin]}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Icon name="lock-closed" size={24} color="white" />
            <Text style={[styles.actionButtonText]}>Change Password</Text>
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
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginRight: 3,
    marginLeft: 3,
    fontFamily: 'Raleway-Regular',
  },
  input: {

    borderWidth: 1,
    borderColor: '#A52A2A',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 17,
    fontFamily: '',
    marginRight: 3,
    marginLeft: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
  },
  phoneNumberInput: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',

  },
  actionsContainer: {
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 0,
    borderColor: '#A52A2A',
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#A52A2A',
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
  }
  ,
  inputMargin: {
    marginTop: 30,
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    padding: 10,
    zIndex: 1,
  },
});

export default AccInfo;

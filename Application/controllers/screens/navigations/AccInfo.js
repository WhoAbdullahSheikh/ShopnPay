import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import jsonImage from '../../../pics/avatar.gif';
import Icons from 'react-native-vector-icons/FontAwesome';
import TouchID from 'react-native-touch-id';

const AccInfo = () => {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // show passcode authentication if biometrics fail (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // biometryType can be 'FaceID', 'TouchID', or 'Biometrics' (for android)
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
                  {text: 'Try Again', onPress: () => navigation.goBack()},
                  {text: 'Cancel', onPress: () => navigation.goBack()},
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
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      {authenticated ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Your account information</Text>
          {/* Display your content here */}
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Authenticating...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
});

export default AccInfo;

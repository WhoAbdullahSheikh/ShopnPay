import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function BarcodeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


const BarcodeStack = createNativeStackNavigator();

function BarcodeStackScreen() {
  return (
    <BarcodeStackScreen.Navigator>
      <BarcodeStack.Screen name="Home" component={HomeScreen} />
      <BarcodeStack.Screen name="Details" component={DetailsScreen} />
    </BarcodeStackScreen.Navigator>
  );
}

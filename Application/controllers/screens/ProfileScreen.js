import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import jsonImage from '../../pics/avatar.gif';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle" size={50} color="#A52A2A" />
        </TouchableOpacity>
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.heading1}>Account info, Settings & More</Text>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.button}>
            <Image source={jsonImage} style={styles.profileImage} />
            <Text style={styles.customerName}>John Doe</Text>
          </TouchableOpacity>
          {/* Section Break Line */}
          <View style={styles.sectionBreakLine}></View>
        </View>

        {/* Other Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="notifications" size={24} color="white" />
            <Text style={styles.optionText}>Notifications</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="language" size={24} color="white" />
            <Text style={styles.optionText}>Language</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="lock-closed" size={24} color="white" />
            <Text style={styles.optionText}>Privacy</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="arrow-forward-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Icon name="information-circle" size={24} color="white" />
            <Text style={styles.optionText}>About Us</Text>
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
    paddingTop: 10,
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: '#A52A2A',
    borderWidth: 3,
  },
  customerName: {
    fontSize: 20,
    paddingLeft: 20,
    fontFamily: 'Raleway-Regular',
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
    borderWidth: 1,
    borderColor: '#A52A2A',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#A52A2A',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 17,
    color: 'white',
    fontFamily: 'Raleway-Regular',
  },
});

export default ProfileScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import credentials from "./Credentials";
import { db } from "../components/config";
import { Alert } from "react-native";
import OtpScreen from "../otp/OtpScreen";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { async } from "@firebase/util";
import Colors from "../../src/utilities/Color"


const RegisterPage = ({ navigation }) => {
  const [contact, setContact] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [confirmation, setConfirmation] = useState("");

  const request = async () => {
    setDisplayOTPInput(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const signIn = () => {};

  function create() {
    const phoneNumber = countryCode + contact;
    if (!contact.trim()) {
      Alert.alert("Please enter a phone number.");
      return;
    }

    // Add user data to Firestore
    const userData = {
      phoneNumber: phoneNumber,
    };

    const documentRef = doc(db, "customers", "details");
    updateDoc(documentRef, {
      RegisteredUser: arrayUnion(userData),
    })
      .then(() => {
        console.log("User data added to Firestore");
        console.log("Register success");
        setContact("");

        navigation.navigate(credentials);
      })
      .catch((error) => {
        console.error("Error adding user data:", error);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      <View style={styles.container}>
      
        <Text style={styles.title}>REGISTER</Text>
        <View style={styles.selectContainer}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCodeText}>+92</Text>
          </View>
          <TextInput
            value={contact}
            onChangeText={(contact) => {
            setContact(contact);
            }}
            placeholder="Phone Number"
            style={styles.input}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={create}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "black",
    fontFamily: 'Raleway-Regular',
  },
  selectContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  countryCodeBox: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    height: 40,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    
    width: "60%",
    marginBottom: 10,
    padding: 10,
    height: 40,
    borderRadius: 10,
  },
  
  button: {
    
    width: 300,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#A52A2A',
    
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    color: "black",
    marginTop: 20,
  },
});

export default RegisterPage;
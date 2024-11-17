import QRCode from 'react-native-qrcode-svg';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TouchID from 'react-native-touch-id';

const QRCodeScreen = ({ route }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const { qrData } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        const optionalConfigObject = {
            unifiedErrors: false,
            passcodeFallback: false,
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
    }, [navigation]);

    const handleProceedToPayment = () => {
        // Navigate to the payment screen or trigger payment logic
        navigation.navigate('PaymentScreen'); // Replace with your actual payment screen name
    };

    return (
        <View style={styles.container}>
            {authenticated ? (
                <>
                    <Text style={styles.title}>
                        Scan <Text style={styles.colorful}>Code</Text> & <Text style={styles.colorful}>Checkout</Text>!
                    </Text>
                    <Text style={styles.heading}>E-Invoice QR Code</Text>
                    <QRCode
                        value={JSON.stringify(qrData)}
                        size={250}
                    />
                    <View style={styles.notesContainer}>
                        <Text style={styles.noteText}></Text>
                        <Text style={styles.noteText}>
                            Scan this code on cash counter to confirm {'\n'}your shopping{'\n'}
                        </Text>
                        <Text style={styles.signatureText}>
                            This QR Code is computer-generated and digitally verified.
                        </Text>
                        <Text style={styles.noteText}>
                            <Text style={styles.boldText}>
                                Developed by &copy; <Text style={styles.colorful}><Text style={styles.boldText}>Shopnpay</Text></Text> 2024
                            </Text>
                        </Text>
                    </View>

                    {/* Proceed to Payment Button */}
                    <TouchableOpacity
                        style={styles.proceedButton}
                        onPress={handleProceedToPayment}
                    >
                        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.loadingText}>Authenticating...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: '20%', // Space for button
    },
    boldText: {
        fontWeight: 'bold',
        fontFamily: 'Raleway-Regular',
    },
    title: {
        fontSize: 33,
        paddingTop: '20%',
        fontWeight: 'bold',
        marginBottom: '17%',
        fontFamily: 'Raleway-Regular',
    },
    colorful: {
        color: '#A52A2A',
    },
    heading: {
        marginTop: '5%',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Raleway-Regular',
    },
    notesContainer: {
        marginTop: 10,
        paddingTop: 10,
    },
    noteText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Raleway-Regular',
    },
    signatureText: {
        fontSize: 12,
        textAlign: 'center',
        paddingTop: 70,
        fontStyle: 'italic',
        color: 'grey',
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Raleway-Regular',
    },
    proceedButton: {
        marginTop: 30,
        paddingVertical: 15,
        width: '90%',
        backgroundColor: '#A52A2A',
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    proceedButtonText: {
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default QRCodeScreen;

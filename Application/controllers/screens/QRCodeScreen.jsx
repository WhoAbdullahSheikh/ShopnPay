

import QRCode from 'react-native-qrcode-svg';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import TouchID from 'react-native-touch-id';

const Tab = createBottomTabNavigator();

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
    return (<View style={styles.container}>
        {authenticated ? (
            <>
                <Text style={styles.title}>Scan <Text style={styles.colorful}>Code</Text> & <Text style={styles.colorful}>Checkout</Text>!</Text>
                <Text style={styles.heading}>E-Invoice QR Code</Text>
                <QRCode
                    value={JSON.stringify(qrData)}
                    size={250}
                />
                <View style={styles.notesContainer}>
                    <Text style={styles.noteText}></Text>
                    <Text style={styles.noteText}>Scan this code on cash counter to confirm {'\n'}your shopping{'\n'}</Text>

                    <Text style={styles.signatureText}>This QR Code is computer-generated and digitally verified.</Text>
                    <Text style={styles.noteText}><Text style={styles.boldText}>Developed by &copy; <Text style={styles.colorful}><Text style={styles.boldText}>Shopnpay</Text></Text> 2024</Text> </Text>
                </View>
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
        paddingBottom: '40%',
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
    }
});

export default QRCodeScreen;

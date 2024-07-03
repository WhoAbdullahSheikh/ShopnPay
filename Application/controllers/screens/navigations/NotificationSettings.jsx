import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const NotificationSettings = () => {
  const [isEmailEnabled, setEmailEnabled] = useState(false);
  const [isPushEnabled, setPushEnabled] = useState(false);

  const toggleEmailSwitch = () =>
    setEmailEnabled(previousState => !previousState);
  const togglePushSwitch = () =>
    setPushEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Email Notifications:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#20b854'}}
          thumbColor={isEmailEnabled ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#DBDBDB"
          onValueChange={toggleEmailSwitch}
          value={isEmailEnabled}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Push Notifications:</Text>
        <Switch
          trackColor={{false: '#DBDBDB', true: '#20b854'}}
          thumbColor={isPushEnabled ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#DBDBDB"
          onValueChange={togglePushSwitch}
          value={isPushEnabled}
        />
      </View>
    </View>
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
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
  },
});

export default NotificationSettings;

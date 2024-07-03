import { LogBox } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Suppress specific warning
const ignoreWarnings = ['Sending `onAnimatedValueUpdate` with no listeners registered'];

LogBox.ignoreLogs(ignoreWarnings);

AppRegistry.registerComponent(appName, () => App);

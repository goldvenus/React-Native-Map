/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './src/components/bgMessaging';

AppRegistry.registerComponent('JumpSeat', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line


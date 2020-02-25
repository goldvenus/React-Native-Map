import React from 'react';
import AppRoutes from './src/navigation/routes'
import firebase from 'react-native-firebase';
import strings from './src/localization/strings';
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageKyes from './src/utils/AsyncStorageKyes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token:"",
        };
    }

    async componentDidMount() {
        this.checkPermission();

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;
      
            console.log(notificationOpen);
          });


        this.createNotificationListeners();
        firebase.notifications().getInitialNotification()
            .then((notificationOpen) => {
                if (notificationOpen) {
                    this.openThreadNow(notificationOpen, navigate);
                }
            });
    }

    componentWillUnmount() {
        this.notificationListener();
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async getToken() {
        let fcmToken = await firebase.messaging().getToken();
        this.setState({token:fcmToken},()=>{
            AsyncStorage.setItem(AsyncStorageKyes.FCM_TOKEN, fcmToken).then(() => {
                strings.FCM_TOKEN = this.state.token;
            })
        })
        console.log("fcm token " + fcmToken)
    }

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission({
                badge: false,
                sound: true,
                alert: true,
            }
            );

            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    async CreateChannel() {
        const channel = new firebase.notifications.Android.Channel(
            'channelId',
            'Channel Name',
            firebase.notifications.Android.Importance.Max
        ).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);
        // the listener returns a function you can use to unsubscribe
        this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
            if (Platform.OS === 'android') {
                const localNotification = new firebase.notifications.Notification({
                    sound: 'default',
                    show_in_foreground: true,
                    Priority: 'High'
                })
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .android.setChannelId('channelId') // e.g. the id you chose above
                    .android.setSmallIcon('ic_stat_notification') // create this icon in Android Studio
                    .android.setColor('#000000') // you can set a color here
                    .android.setPriority(firebase.notifications.Android.Priority.High);
                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));
            }
            else if (Platform.OS === 'ios') {
                const localNotification = new firebase.notifications.Notification()
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setSubtitle(notification.subtitle)
                    .setBody(notification.body)
                    .setData(notification.data)
                    .click_action("com.jumpseat.com")
                    .ios.setBadge(notification.ios.badge);
                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));
            }
        });
    }

    async createNotificationListeners() {
        this.messageListener = firebase.messaging().onMessage((message) => {
            console.log("msg " + JSON.stringify(message))
        });

        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const {
                body,
                data,
                notificationId,
                sound,
                subtitle,
                title
            } = notification;

        });

        this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        });
    }

    onNotification(notification) {
        console.log('[Notifications] on notification:', notification);
        // Check if opened from forground
        if (notification.data.openedInForeground) {
            notification.userInteraction = true;
        }
        if (notification.userInteraction)
        {
          this.onNotificationCallback?.(notification)
        }
        // Only call callback if not from foreground
        if (!notification.data.openedInForeground) {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      }

    render() {
        return (
            <AppRoutes />
        );
    }
}
export default App;
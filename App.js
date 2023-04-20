import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import registerForPushNotificationsAsync from "./fcm";
import * as Notifications from "expo-notifications";

function handleForegroundNotification(notification) {
  console.log("Received a foreground notification:", notification);
}

function handleBackgroundNotification(notification) {
  console.log("Received a background notification:", notification);
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        if (Platform.OS === "ios") {
          handleForegroundNotification(notification.request.content);
        } else {
          handleForegroundNotification(notification);
        }
      }
    );

    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        if (Platform.OS === "ios") {
          handleBackgroundNotification(response.notification.request.content);
        } else {
          handleBackgroundNotification(response.notification);
        }
      }
    );

    return () => {
      subscription.remove();
      backgroundSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

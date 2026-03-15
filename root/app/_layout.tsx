import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import { StackScreen } from "expo-router/build/layouts/stack-utils";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
// ------------------------------------------------------------------------------------
// Part 5: Notification Routing (expo-notifications)
// The Listener Setup

// In root _layout.tsx (or another top-level component), set up 
// Notifications.addNotificationResponseReceivedListener.
// The Routing Logic

// When a user taps a notification, extract the payload data.
// Use router.push('/map') to navigate to the Map screen.
// The Parameter Passing

// Pass the event coordinates or ID through router parameters so map.tsx knows which event triggered the alert.
// The Auto-Zoom

// In map.tsx, create a useEffect that listens for router parameters.
// If a parameter exists, use your map useRef to automatically animateToRegion for that event pin.

export default function RootLayout() {
  // const router = useRouter();

  // useEffect(() => {
  //   // This listener fires when the user physically taps the notification in their tray
  //   const subscription = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       // 1. Extract the custom data payload you sent with the notification
  //       const eventData = response.notification.request.content.data;

  //       // 2. Route the user to the map and pass the coordinates as URL parameters
  //       // Make sure your map screen can read these parameters and use them to center the map
        
  //       if (eventData && eventData.latitude && eventData.longitude) {
  //         router.push({
  //           pathname: "/map",
  //           params: {
  //             lat: eventData.latitude,
  //             lng: eventData.longitude,
  //           },
  //         });
  //       }
  //     },
  //   );

  //   return () => subscription.remove();
  // }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </SafeAreaProvider>
  )
  // ... rest of your layout code
}

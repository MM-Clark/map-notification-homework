import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // This listener fires when the user physically taps the notification in their tray
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // 1. Extract the custom data payload you sent with the notification
        const eventData = response.notification.request.content.data;

        // 2. Route the user to the map and pass the coordinates as URL parameters
        // Make sure your map screen can read these parameters and use them to center the map
        if (eventData && eventData.latitude && eventData.longitude) {
          router.push({
            pathname: "/map",
            params: {
              lat: eventData.latitude,
              lng: eventData.longitude,
            },
          });
        }
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <Stack/>
  )
  // ... rest of your layout code
}

import getDistance from "geolib/es/getPreciseDistance";
import { Text, View } from "react-native";

// index.tsx
// A Home screen with:
// a welcome message
// a button to request location permissions
// a button to View Campus Map
// ----------------------------------------------------------------------------------
// Part 4: Proximity Tracking & Local Notifications (expo-location)
// Location Permissions

// On the Home screen (index.tsx), request foreground location permissions using 
// Location.requestForegroundPermissionsAsync().
// The 100-Meter Check

// Use Location.watchPositionAsync to continuously track user location.
// Write a helper function to calculate distance between the user's current GPS coordinates 
// and event locations.
// Starter code for this has been provided for you in index.tsx
// Trigger the Alert

// If distance drops below 100 meters for an event, use Notifications.scheduleNotificationAsync to fire a local push notification (example: "Free Pizza at TD Arena!").
// Crucial Requirements

// Include the event's coordinates or ID in the notification data payload.
// Ensure each event notification fires only once (no repeated spam while inside the zone).

export default function Index() {
  
  // Inside your Location.watchPositionAsync callback:
    const distanceToEvent = getDistance(
      { latitude: userLat, longitude: userLng },
      { latitude: eventLat, longitude: eventLng },
    );
  
    if (distanceToEvent <= 100 && !hasBeenNotified) {
      // Fire the notification!
      
    }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

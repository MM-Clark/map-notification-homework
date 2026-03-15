import getDistance from "geolib/es/getPreciseDistance";
import { useEffect, useRef, useState } from "react";
import { Alert, Linking, Text, View } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import TOUR_LOCATIONS from '../(tabs)/map';
import { SafeAreaView } from "react-native-safe-area-context";

// Target Coordinates (e.g., A Local Coffee Shop)
const TARGET_LAT = 32.7900; // Patriots Point area
const TARGET_LNG = -79.9061;
const GEOFENCE_RADIUS = 100; // 50 meters

// Force notifications to show up as a banner when the app is open!
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Helper Function: Calculates distance in meters between two coordinates
// const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
//   const R = 6371e3; 
//   const toRadians = (deg: number) => deg * (Math.PI / 180);
//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; 
// };

export default function Index() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const hasEnteredZone = useRef(false);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      // TODO 3: Request Foreground Location AND Notification permissions here.
      const locationStatus = await Location.requestForegroundPermissionsAsync(); 
      if(locationStatus.status ==='granted') {
          setErrorMsg(null);
      }
      if(locationStatus.status !== 'granted') {
          setErrorMsg('Foreground location permission is required.');
          // GO TO SETTINGS TO CHANGE PERMISSIONS *************************
          Alert.alert("Location Permission Denied.","Please allow tracking.",[
            {text: "Cancel", style: "cancel"},
            {text: "Open Settings", onPress: () => Linking.openSettings()}
          ]);
          // cannot view, just return ****************
          return;
      }
      const notificationStatus = await Notifications.requestPermissionsAsync();
      if(notificationStatus.status === 'granted') {
          setErrorMsg(null);
      }
      if(notificationStatus.status !== 'granted') {
          setErrorMsg('Notification permission is required.');
          Alert.alert("Notification Settings Denied", "Please Allow Notifications.", [
            {text: "Cancel", style: "cancel"},
            {text: "Open Settings", onPress: () => Linking.openSettings()}
          ])
      }
      
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // Only fire callback if move at least 10 meters
        }, 
        (newLocation) => {
          // Update map UI
          setLocation(newLocation);
      
          // ********** Calculate how far user is from events ***********************************
          TOUR_LOCATIONS.forEach((targetLoc) => {
            // geolib expects coordinate objects, not 4 raw numbers
            const dist = getDistance(
              { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude },
              { latitude: targetLoc.latitude, longitude: targetLoc.longitude }
            );

            // Geofence Logic for THIS specific location
            if (dist <= GEOFENCE_RADIUS) {
              
              // If they are inside the circle AND haven't been notified for THIS location yet
              if (!enteredZones.current.has(targetLoc.id)) {
                console.log(`Crossed into ${targetLoc.name}! Triggering notification...`);
                
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: `Welcome to ${targetLoc.name}!`,
                    body: targetLoc.message || "Click here to view more details.",
                    sound: true,
                    data: { locationId: targetLoc.id }, // Pass the ID so you know what they clicked
                  },
                  trigger: null, // Fire immediately
                });
        
                // Add this location's ID to our Set so we don't spam them
                enteredZones.current.add(targetLoc.id);
              }

            } else {
              // If they leave THIS circle, remove it from the Set to reset the tracker
              if (enteredZones.current.has(targetLoc.id)) {
                console.log(`Left ${targetLoc.name}. Resetting tracker.`);
                enteredZones.current.delete(targetLoc.id);
              }
            }
          });
        }
      );
    })();
    
    // Cleanup function
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // // Inside your Location.watchPositionAsync callback:
  //   const distanceToEvent = getDistance(
  //     { latitude: userLat, longitude: userLng },
  //     { latitude: eventLat, longitude: eventLng },
  //   );
  
  //   if (distanceToEvent <= 100 && !hasBeenNotified) {
  //     // Fire the notification!
      
  //   }


  return (
    <SafeAreaView
      // style={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      <Text>djslfjk;adsjfkdsafj;dsjkldjk;fdsjkldjkldf.</Text>
    </SafeAreaView>
  );
}

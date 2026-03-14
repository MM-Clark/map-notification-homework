import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Circle, Marker, Region, PROVIDER_GOOGLE, Callout } from "react-native-maps";

// map.tsx
// --------------------------------------------------------------------------------
// Implement a custom <Callout tooltip={true}> for each marker.
// Display the event name and a short description.
// Android note: attach the onPress to the <Callout> itself.
// ----------------------------------------------------------------------------------------
// Part 3: Refs & Programmatic Control
// Attach a useRef to your <MapView>.
// Add a floating Fit All Events button over the map.
// On press, use mapRef.current?.fitToCoordinates() to adjust 
// the camera so all event markers are framed on screen.
type Coordinate = {
  latitude: number;
  longitude: number;
};

// --- TYPESCRIPT INTERFACES ---
interface TourLocation {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

// --- STARTER DATA ---
const TOUR_LOCATIONS: TourLocation[] = [
  { id: '1', name: 'Home', description: 'Home of the Cougars.', latitude: 32.9366, longitude: -80.0385 },
  { id: '2', name: 'CIP', description: 'Historic defensive seawall.', latitude: 32.940114462656005, longitude: -80.04857197526441 },
  { id: '3', name: 'Walmart', description: '10-acre park in the city center.', latitude: 32.93982, longitude: -80.03677 }
];

// PUT TYPE OF THE OBJECT
const CHARLESTON_CENTER: Region = {
  latitude: 32.78,
  longitude: -79.93,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const map = () => {
  const mapRef = useRef<MapView>(null);
  const [distance, setDistance] = useState<number | null>(null);
  
  const recenterMap = () => { 
    mapRef.current?.animateCamera({center:CHARLESTON_CENTER}, {duration:1000})
  };

  const handleCalloutPress = (name: string, desc: string) => {
    Alert.alert(`${name}: ${desc}`)
  };

  const fitAllMarkers = () => {
    if(mapRef.current) {
      mapRef.current.fitToCoordinates(TOUR_LOCATIONS, {
        edgePadding: {top: 100, bottom: 50, right:50, left:50},
        animated:true
      });
    }
  };
  
  return (
    <View>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={CHARLESTON_CENTER}
        showsUserLocation={true} 
      >
        {/* <Marker coordinate={{ 
          latitude: TARGET_LAT, 
          longitude: TARGET_LNG 
        }} title="Target" />
        <Circle center={{ 
          latitude: TARGET_LAT, 
          longitude: TARGET_LNG 
        }} 
        radius={GEOFENCE_RADIUS} 
        fillColor="rgba(0, 255, 0, 0.3)" /> */}

        {TOUR_LOCATIONS.map((item) =>
            // key to keep track of what has already been looked at
            <Marker coordinate={item} key={item.id}>
              <Callout
                  //allows to click on the button
                  tooltip={true}
                  onPress={() => handleCalloutPress(item.name, item.description)}
              >
                  <View style={styles.calloutCard}>
                      <Text style={styles.calloutTitle}> {item.name} </Text>
                      <Text style={styles.calloutDesc}> {item.description} </Text>
                  </View>
              </Callout>

          </Marker>
        )}

      </MapView>

      <View style={styles.bottomCard}>
        <Text style={styles.cardTitle}>Coffee Radar</Text>
        <Text>Distance to target: {distance ? `${Math.round(distance)} meters` : 'Calculating...'}</Text>
      </View>
    </View>
  );
};

export default map;

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  centeredContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  map: { 
    flex: 1 
  },
  bottomCard: { 
    position: 'absolute', 
    bottom: 40, 
    left: 20, 
    right: 20, 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15, 
    elevation: 5 
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  calloutCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    width: 200,
    elevation: 4, 
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  calloutDesc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
});

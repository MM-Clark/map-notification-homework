import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Circle, Marker } from 'react-native-maps';

// map.tsx
// --------------------------------------------------------------------------------
// Part 2: The Map & Overlays (react-native-maps)
// The Map Foundation

// Render a full-screen map on map.tsx, initially centered on the Charleston area.
// Enable showsUserLocation={true} so the user can see their own blue GPS dot.
// The Data (Markers)

// Create an array of at least 3 event locations with coordinates.
// Map over this array to render <Marker> components.
// The Custom Callout

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

const locations = [
  {
    id: 1,
    title: 'Location A H',
    latitude: 32.9366,
    longitude: -80.0385 ,
  },
  {
    id: 2,
    title: 'Location B I',
    latitude: 32.940114462656005,
    longitude: -80.04857197526441,
  },
  {
    id: 3,
    title: 'Location C W',
    latitude: 32.93982,
    longitude: -80.03677,
  },
];

const map = () => {

  return (
    <View>
      <MapView 
        style={styles.map} 
        showsUserLocation={true} 
        initialRegion={{
          latitude: locations[0].latitude, 
          longitude: locations[0].longitude, 
          latitudeDelta: 0.02, 
          longitudeDelta: 0.02
        }}>
        <Marker coordinate={{ 
          latitude: TARGET_LAT, 
          longitude: TARGET_LNG 
        }} title="Target" />
        <Circle center={{ 
          latitude: TARGET_LAT, 
          longitude: TARGET_LNG 
        }} 
        radius={GEOFENCE_RADIUS} 
        fillColor="rgba(0, 255, 0, 0.3)" />
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
  container: { flex: 1 },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1 },
  bottomCard: { position: 'absolute', bottom: 40, left: 20, right: 20, backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});

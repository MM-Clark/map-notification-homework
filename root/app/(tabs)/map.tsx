import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";

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
export const TOUR_LOCATIONS: TourLocation[] = [
  { id: '1', name: 'TD Arena', description: 'Free Airpods at TD Arena with basketball game attendance!', latitude: 32.7856, longitude: -79.9344 },
  { id: '2', name: 'Harbor Walk', description: 'Free pizza at Harbor Walk for networking event!', latitude: 32.79155, longitude: -79.92658 },
  { id: '3', name: 'Rivers Green', description: 'Pop up poster sale at Rivers Green!', latitude: 32.78404, longitude: -79.93950 }
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
  
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.lat && params.lng && mapRef.current) {
      // find specific location object from array using ID
      const targetEvent = TOUR_LOCATIONS.find(loc => loc.id === params.locationId);
      
      // URL parameters always strings, so must convert back to numbers
      const targetLat = parseFloat(params.lat as string);
      const targetLng = parseFloat(params.lng as string);

      mapRef.current.animateToRegion({
        latitude: targetLat,
        longitude: targetLng,
        latitudeDelta: 0.005, 
        longitudeDelta: 0.005,
      }, 1000);
    }
  }, [params.lat, params.lng]);

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
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        initialRegion={CHARLESTON_CENTER}
        showsUserLocation={true}
        ref={mapRef} 
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

      <View style={styles.floatingButtonContainer}>
{/* ------------------------------------------------------------------------------------------------------------------ */}
        {/* TODO (Task 4): Attach your recenterMap function to this button's onPress */}
        <TouchableOpacity style={styles.actionButton} onPress={recenterMap}>
          <Text style={styles.actionButtonText}>Recenter</Text>
        </TouchableOpacity>
        
        {/* TODO (Bonus): Attach your fitAllMarkers function to this button's onPress */}
        <TouchableOpacity style={[styles.actionButton, styles.bonusButton]} onPress={fitAllMarkers}>
          <Text style={styles.actionButtonText}>Fit All</Text>
        </TouchableOpacity>
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
    flex: 1,
    width: '100%',
    height: '100%' 
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
  floatingButtonContainer: {
    position: "absolute",
    bottom: 40,
    right: 20,
    gap: 10, 
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  bonusButton: {
    backgroundColor: "#007AFF", 
  },
  actionButtonText: {
    fontWeight: "bold",
    color: "#333",
  },
});

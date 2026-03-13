import getDistance from "geolib/es/getPreciseDistance";
import { Text, View } from "react-native";

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

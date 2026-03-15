# Map Notification Homework - NOTES

Remember that project is in root folder, not just map-notification-homework. Will get major issues running app otherwise. 

Encountered weird error where Expo CLI latest version is 55.0.0 or something to that effect, and ExpoGo iOS is only up to 54.0.2 or so. Had to downgrade CLI to work. 

---------------------------------------------------------------------------------------------

## Submission Instructions
To complete and submit this assignment, you will be using Git and GitHub. Please follow these exact steps to ensure your work is tracked and graded correctly:

1. Clone the Repository: Start by cloning the provided assignment repository to your local machine.
2. Create Your Branch: Do not work on the main branch. Immediately create and switch to a new branch using your GitHub username.
3. Commit Your Work: As you complete the assignment, commit your changes regularly to your branch. Make sure you include you commit message.
4. Push and Submit: Push your branch to the remote repository.
### Grading Note: You do not need to open a Pull Request. I will be evaluating the final commit made to your specific branch before the assignment deadline. Any commits pushed 3 after the deadline will not be graded.

## Scenario
The College of Charleston wants to notify students about pop-up campus events (e.g., free food, guest speakers).

Your app should monitor the student's location. If they walk within **100 meters** of an event, their phone should buzz with an alert. Tapping that alert should open the app, switch to the **Map** tab, and focus the camera on the event pin.

---

## Part 1: App Navigation & Layout (`expo-router`)
Create two screens using `expo-router`:

- **`index.tsx`**
	- A **Home** screen with:
		- a welcome message
		- a button to request location permissions
		- a button to **View Campus Map**
- **`map.tsx`**
	- The screen that contains your `MapView`

Ensure basic navigation works so the user can freely move between the Home screen and the Map screen.

---

## Part 2: The Map & Overlays (`react-native-maps`)
- **The Map Foundation**
	- Render a full-screen map on `map.tsx`, initially centered on the Charleston area.
	- Enable `showsUserLocation={true}` so the user can see their own blue GPS dot.

- **The Data (Markers)**
	- Create an array of at least **3 event locations** with coordinates.
	- Map over this array to render `<Marker>` components.

- **The Custom Callout**
	- Implement a custom `<Callout tooltip={true}>` for each marker.
	- Display the event name and a short description.
	- **Android note:** attach the `onPress` to the `<Callout>` itself.

---

## Part 3: Refs & Programmatic Control
- Attach a `useRef` to your `<MapView>`.
- Add a floating **Fit All Events** button over the map.
- On press, use `mapRef.current?.fitToCoordinates()` to adjust the camera so all event markers are framed on screen.

---

## Part 4: Proximity Tracking & Local Notifications (`expo-location`)
- **Location Permissions**
	- On the Home screen (index.tsx), request foreground location permissions using `Location.requestForegroundPermissionsAsync()`.

- **The 100-Meter Check**
	- Use `Location.watchPositionAsync` to continuously track user location.
	- Write a helper function to calculate distance between the user's current GPS coordinates and event locations.
    - Starter code for this has been provided for you in index.tsx

- **Trigger the Alert**
	- If distance drops below **100 meters** for an event, use `Notifications.scheduleNotificationAsync` to fire a local push notification (example: *"Free Pizza at TD Arena!"*).

- **Crucial Requirements**
	- Include the event's coordinates **or** ID in the notification `data` payload.
	- Ensure each event notification fires **only once** (no repeated spam while inside the zone).

---

## Part 5: Notification Routing (`expo-notifications`)
- **The Listener Setup**
	- In root `_layout.tsx` (or another top-level component), set up `Notifications.addNotificationResponseReceivedListener`.

- **The Routing Logic**
	- When a user taps a notification, extract the payload data.
	- Use `router.push('/map')` to navigate to the Map screen.

- **The Parameter Passing**
	- Pass the event coordinates or ID through router parameters so `map.tsx` knows which event triggered the alert.

- **The Auto-Zoom**
	- In `map.tsx`, create a `useEffect` that listens for router parameters.
	- If a parameter exists, use your map `useRef` to automatically `animateToRegion` for that event pin.
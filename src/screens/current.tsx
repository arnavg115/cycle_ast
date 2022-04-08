import { View, Text, StyleSheet, Button } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import IonicIcons from "react-native-vector-icons/Ionicons";
import MapView, { LatLng, Marker, Polygon } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useLocState } from "../store";

interface markers {
  p1: LatLng;
  p2: LatLng;
  p3: LatLng;
  p4: LatLng;
}

function CurrentScreen() {
  const LocState = useLocState();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [location, setLocation] = useState<Location.LocationObject>();
  async function init() {
    await Location.requestForegroundPermissionsAsync();
    const res = await Location.getCurrentPositionAsync();
    setLocation(res);
  }
  useEffect(() => {
    init();
  }, []);

  // variables
  const snapPoints = useMemo(() => ["4%", "25%", "90%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const [markers, setMarkers] = useState<markers>({
    p1: {
      longitude: -121.91425323486327,
      latitude: 37.673104213661375,
    },
    p2: {
      longitude: -121.9178795814514,
      latitude: 37.67349484401166,
    },
    p3: {
      longitude: -121.91852331161498,
      latitude: 37.669775280290835,
    },
    p4: {
      longitude: -121.91369533538817,
      latitude: 37.669843219199265,
    },
  });
  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <View>
      <MapView
        style={{
          height: "100%",
          width: "100%",
        }}
        initialRegion={{
          latitude: !!location ? location.coords.latitude : 37.66924875164171,
          longitude: !!location
            ? location.coords.longitude
            : -121.9193172454834,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={markers.p1}
          onDragEnd={(e) => {
            setMarkers({ ...markers, p1: e.nativeEvent.coordinate });
          }}
        />
        <Marker
          draggable
          coordinate={markers.p2}
          onDragEnd={(e) => {
            setMarkers({ ...markers, p2: e.nativeEvent.coordinate });
          }}
        />
        <Marker
          draggable
          coordinate={markers.p3}
          onDragEnd={(e) => {
            setMarkers({ ...markers, p3: e.nativeEvent.coordinate });
          }}
        />
        <Marker
          draggable
          coordinate={markers.p4}
          onDragEnd={(e) => {
            setMarkers({ ...markers, p4: e.nativeEvent.coordinate });
            bottomSheetRef.current?.expand();
          }}
        />
        <Polygon
          coordinates={Object.values(markers)}
          fillColor="rgba(255,0,0,0.2)"
          strokeColor="rgba(255,0,0,0.5)"
        />
        <Marker
          coordinate={LocState.coord}
          onPress={(e) => {
            bottomSheetRef.current?.expand();
          }}
        />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <IonicIcons name="bicycle" size={48} />
            <Text style={{ fontSize: 40 }}>Rishabh's Bicycle</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default gestureHandlerRootHOC(() => CurrentScreen());

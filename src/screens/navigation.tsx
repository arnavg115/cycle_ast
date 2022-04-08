import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import * as Location from "expo-location";
const App = () => {
  // variables
  const snapPoints = useMemo(() => ["25%", "90%"], []);
  const [location, setLocation] = useState<Location.LocationObject>();
  async function init() {
    await Location.requestForegroundPermissionsAsync();
    const res = await Location.getCurrentPositionAsync();
    setLocation(res);
  }
  useEffect(() => {
    init();
  }, []);
  // renders
  return (
    <View style={styles.container}>
      <Text>{location?.coords.latitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default gestureHandlerRootHOC(() => App());

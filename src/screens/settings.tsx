import { View, Text, SafeAreaView, Switch } from "react-native";
import React, { FC, useEffect } from "react";
import { styles } from "../Styles";
import { ScrollView } from "react-native-gesture-handler";
import { SETACTIVE, useLocDispatch, useLocState } from "../store";

// import React from 'react'

export default function SettingsScreen() {
  const LocState = useLocState();
  const LocDispatch = useLocDispatch();
  useEffect(() => {
    console.log(LocDispatch);
  }, []);
  return (
    <View style={{ ...styles.verticalCenter, padding: "5%" }}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#00ff00" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                LocDispatch!({ type: SETACTIVE, payload: !LocState.active });
              }}
              value={LocState.active}
            />
            <Text>Geofencing active</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

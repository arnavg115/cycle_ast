import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import IonicIcons from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";
import CurrentScreen from "./screens/current";
import NavigationScreen from "./screens/navigation";
import SettingsScreen from "./screens/settings";
import BackgroundTimer from "react-native-background-timer";
import { SETCOORDS, useLocDispatch, useLocState } from "./store";
import { Alert, TouchableOpacity } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function AppComponent() {
  const LocState = useLocState();
  const LocDispatch = useLocDispatch();

  useEffect(() => {
    const id = BackgroundTimer.setInterval(async () => {
      const result = await fetch("http://192.168.1.95:3000/current_lat");
      const json = await result.json();
      LocDispatch!({
        type: SETCOORDS,
        payload: { latitude: json[1], longitude: json[0] },
      });
      //   Alert.alert(JSON.stringify(json));
    }, 5000);
    return () => {
      BackgroundTimer.clearInterval(id);
    };
  }, []);
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size, color }) => {
            if (route.name === "Location") {
              return <IonicIcons name="location" size={size} color={color} />;
            } else if (route.name === "Navigation") {
              return <IonicIcons name="navigate" size={size} color={color} />;
            } else if (route.name === "Settings") {
              return <IonicIcons name="cog" size={size} color={color} />;
            }
            // return <IonicIcons name={"location"} size={size} color={color} />;
          },
          tabBarButton: (props) => <TouchableOpacity {...props} />,
        })}
      >
        <Tab.Screen name="Location" component={CurrentScreen} />
        <Tab.Screen name="Navigation" component={NavigationScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF6B6B",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: "PokéApp" }}
      />
      <Stack.Screen
        name="detalles"
        component={DetailsScreen}
        options={{ title: "Detalles del Pokémon" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  // HOOK DE REACT USESTATE (ESTADO)
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [detallesPokemon, setdetallesPokemon] = useState(null);
  const Stack = createNativeStackNavigator();

  const getUnPokemon = async (name) => {
    try {
      // Intentar hacer algo
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      console.log("Pokemon", data);
      setdetallesPokemon(data);
      console.log("Pokemon elegido", detallesPokemon);
    } catch (error) {
      // Si hay error
      console.log("ERROR. No se encontro el Pokemon");
    }
  };

  //FUNCION PARA LLAMAR A UNA API
  //fetch y async await

  const getPokemon = async () => {
    try {
      // Intentar hacer algo
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const data = await response.json();
      console.log("Pokemon", data);
      setPokemon(data.results);
    } catch (error) {
      // Si hay error
      console.log("ERROR. No fue posible acceder a la API");
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  const home = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.lista}>
          <Text>POKEAPP</Text>
          <Text>Lista de Pokemones:</Text>
          <FlatList
            data={pokemon}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => getUnPokemon(item.name)}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.url.split("/").filter(Boolean).pop()}
            contentContainerStyle={styles.listaContent}
          />
        </View>

        <View style={styles.detalles}>
          {detallesPokemon ? (
            <View>
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: detallesPokemon?.sprites?.front_default }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 50 }}>{detallesPokemon.name}</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate("detalles", { pokemon: detallesPokemon })
                }
              >
                <Text>Ver detalles</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.placeholder}>
              No se seleccionó ningún pokémon
            </Text>
          )}
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  };

  const detalles = ({ route }) => {
    const { pokemon } = route.params;
    return <Text>{pokemon.name}</Text>;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={home}></Stack.Screen>
          <Stack.Screen name="detalles" component={detalles}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    flex: 0.5,
    backgroundColor: "red",
  },
  detalles: {
    flex: 0.5,
    backgroundColor: "green",
  },
});

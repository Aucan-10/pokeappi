import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ScrollView,
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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      console.log("Pokemon", data);
      setdetallesPokemon(data);
    } catch (error) {
      console.log("ERROR. No se encontro el Pokemon");
    }
  };

  const getPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const data = await response.json();
      console.log("Pokemon", data);
      setPokemon(data.results);
    } catch (error) {
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
    const { pokemon } = route.params || {};

    if (!pokemon) {
      return (
        <View style={styles.container}>
          <Text>No hay datos</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* Parte Superior - 30% */}
        <View style={styles.topSection}>
          <Text style={styles.nombre}>{pokemon.name.toUpperCase()}</Text>
          <Image
            style={styles.image}
            source={{ uri: pokemon.sprites?.front_default }}
          />
        </View>

        {/* Parte Inferior - 70% */}
        <View style={styles.bottomSection}>
          <ScrollView>
            {/* GRID DE DOS COLUMNAS */}
            <View style={styles.grid}>
              {/* COLUMNA 1 - STATUS */}
              <View style={styles.col}>
                <Text style={styles.titulo}>Status</Text>
                {pokemon.stats?.map((stat) => (
                  <View key={stat.stat.name} style={styles.fila}>
                    <Text>{stat.stat.name}:</Text>
                    <Text>{stat.base_stat}</Text>
                  </View>
                ))}
              </View>

              {/* COLUMNA 2 - HABILIDADES */}
              <View style={styles.col}>
                <Text style={styles.titulo}>Habilidades</Text>
                {pokemon.abilities?.map((ability, index) => (
                  <Text key={index} style={styles.habilidad}>
                    • {ability.ability.name}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
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
    backgroundColor: "#FF6B6B",
  },
  detalles: {
    flex: 0.5,
    backgroundColor: "#FFFFF0",
  },

  // ========= DECO HOME ===========
  lista_home: {
    flex: 0.3,
    backgroundColor: "grey",
  },
  texto: {
    color: "black",
    fontSize: "10",
  },

  // ========== DETALLES ==========
  // Sección Superior - 30%
  topSection: {
    flex: 0.3,
    backgroundColor: "#ff6b6b",
    justifyContent: "flex-start",
    padding: 20,
  },
  // Sección Inferior - 70%
  bottomSection: {
    flex: 0.7,
    backgroundColor: "#FFFFF0",
    padding: 20,
  },
  // Nombre del Pokemon
  nombre: {
    color: "#FFFFF0",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    textAlign: "left",
    marginLeft: 5,
    marginTop: 5,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 10,
  },

  // ========== GRID ==========
  grid: {
    flexDirection: "row",
    marginTop: 20,
  },
  col: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  habilidad: {
    marginBottom: 10,
    fontSize: 14,
  },
});

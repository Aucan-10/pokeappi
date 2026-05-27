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
          <Text style={styles.homeTitle}>POKEAPP</Text>
          <Text style={styles.homeSubtitle}>Selecciona un Pokémon</Text>
          <FlatList
            data={pokemon}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.item,
                  pressed && styles.itemPressed,
                ]}
                onPress={() => getUnPokemon(item.name)}
                android_ripple={{ color: "#FFE66D", radius: 20 }} // 👈 Efecto ripple en Android
              >
                <View style={styles.itemContent}>
                  {/* Número del Pokémon */}
                  <Text style={styles.itemNumber}>
                    #{String(index + 1).padStart(3, "0")}
                  </Text>

                  {/* Nombre con formato */}
                  <Text style={styles.itemText}>{item.name}</Text>

                  {/* Pequeña flecha decorativa */}
                  <Text style={styles.itemArrow}>›</Text>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.listaContent}
            showsVerticalScrollIndicator={false} // 👈 Ocultar barra de scroll
          />
        </View>

        <View style={styles.detalles}>
          {detallesPokemon ? (
            <View style={styles.detallesContent}>
              <Image
                style={styles.detallesImage}
                source={{ uri: detallesPokemon?.sprites?.front_default }}
                resizeMode="contain"
              />
              <Text style={styles.detallesName}>{detallesPokemon.name}</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate("detalles", { pokemon: detallesPokemon })
                }
                style={styles.verDetallesBtn}
              >
                <Text style={styles.verDetallesText}>Ver detalles</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.placeholder}>
              Seleccioná un Pokémon para ver sus detalles
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

//  =============================
//  --------- ESTILOS -----------
//  =============================
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  topSection: {
    flex: 0.3,
    backgroundColor: "#ff6b6b",
    justifyContent: "flex-start",
    padding: 20,
  },
  bottomSection: {
    flex: 0.7,
    backgroundColor: "#FFFFF0",
    padding: 20,
  },
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
  // ========== LISTA MEJORADA ==========
  listaContent: {
    padding: 12,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "white",
    borderRadius: 16,
    marginVertical: 6,
    marginHorizontal: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  itemPressed: {
    backgroundColor: "#FFF5E6",
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.15,
    elevation: 5,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemNumber: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    marginRight: 12,
    minWidth: 30,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  itemArrow: {
    fontSize: 24,
    color: "#FF6B6B",
    fontWeight: "300",
    marginLeft: 12,
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 6,
    color: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  homeSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 2,
  },
  // ========== DETALLES ==========
  detalles: {
    flex: 0.5,
    backgroundColor: "#FFFFF0",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  detallesContent: {
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
  },
  detallesImage: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  detallesName: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
    marginBottom: 20,
    textAlign: "center",
  },
  verDetallesBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
  },
  verDetallesText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  placeholder: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

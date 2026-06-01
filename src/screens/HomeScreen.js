import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  fetchPokemonList,
  fetchPokemonByName,
} from "../services/pokemonService";

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPokemonList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList();
      setPokemonList(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPokemonList();
  }, [loadPokemonList]);

  const handleSelectPokemon = useCallback(async (name) => {
    try {
      const details = await fetchPokemonByName(name);
      setSelectedPokemon(details);
    } catch (err) {
      console.error("Error al cargar detalles:", err);
      alert("No se pudo cargar el Pokémon");
    }
  }, []);

  const renderPokemonItem = useCallback(
    ({ item, index }) => (
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        onPress={() => handleSelectPokemon(item.name)}
        android_ripple={{ color: "#FFE66D", radius: 20 }}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemNumber}>
            #{String(index + 1).padStart(3, "0")}
          </Text>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemArrow}>›</Text>
        </View>
      </Pressable>
    ),
    [handleSelectPokemon]
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Pressable style={styles.retryButton} onPress={loadPokemonList}>
          <Text>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.lista}>
        <Text style={styles.homeTitle}>POKEAPP</Text>
        <Text style={styles.homeSubtitle}>Selecciona un Pokémon</Text>
        <FlatList
          data={pokemonList}
          renderItem={renderPokemonItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listaContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.detalles}>
        {selectedPokemon ? (
          <View style={styles.detallesContent}>
            <Image
              style={styles.detallesImage}
              source={{ uri: selectedPokemon.sprites?.front_default }}
              resizeMode="contain"
            />
            <Text style={styles.detallesName}>{selectedPokemon.name}</Text>
            <Pressable
              style={styles.verDetallesBtn}
              onPress={() =>
                navigation.navigate("detalles", { pokemon: selectedPokemon })
              }
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", marginBottom: 10 },
  retryButton: { padding: 10, backgroundColor: "#FF6B6B", borderRadius: 8 },
  lista: { flex: 0.5, backgroundColor: "#FF6B6B" },
  detalles: {
    flex: 0.5,
    backgroundColor: "#FFFFF0",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 6,
    color: "white",
  },
  homeSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 10,
  },
  listaContent: { padding: 12, paddingBottom: 20 },
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
  itemPressed: { backgroundColor: "#FFF5E6", transform: [{ scale: 0.98 }] },
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
  detallesContent: { alignItems: "center", width: "100%", maxWidth: 300 },
  detallesImage: { width: 140, height: 140, marginBottom: 16 },
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
  verDetallesText: { fontSize: 15, fontWeight: "500", color: "white" },
  placeholder: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

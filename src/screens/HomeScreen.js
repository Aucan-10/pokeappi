import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchPokemonList, fetchPokemonByName } from "../services/pokeApi";

const HomeScreen = ({ navigation }) => {
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
    ({ item }) => (
      <Pressable
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        onPress={() => handleSelectPokemon(item.name)}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalles de ${item.name}`}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </Pressable>
    ),
    [handleSelectPokemon]
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
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
        <Text style={styles.title}>POKEAPP</Text>
        <Text style={styles.subtitle}>Lista de Pokemones:</Text>
        <FlatList
          data={pokemonList}
          renderItem={renderPokemonItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listaContent}
          initialNumToRender={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
      </View>

      <View style={styles.detalles}>
        {selectedPokemon ? (
          <View style={styles.selectedPokemon}>
            <Image
              style={styles.pokemonImage}
              source={{ uri: selectedPokemon.sprites?.front_default }}
              accessibilityLabel={`Imagen de ${selectedPokemon.name}`}
            />
            <Text style={styles.pokemonName}>
              {selectedPokemon.name.toUpperCase()}
            </Text>
            <Pressable
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("detalles", { pokemon: selectedPokemon })
              }
              accessibilityRole="button"
            >
              <Text style={styles.detailsButtonText}>Ver Detalles</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.placeholder}>
            No se seleccionó ningún pokémon
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lista: {
    flex: 0.5,
    backgroundColor: "#FF6B6B",
  },
  detalles: {
    flex: 0.5,
    backgroundColor: "#4ECDC4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#FFE66D",
  },
  subtitle: {
    textAlign: "center",
    padding: 5,
    fontSize: 14,
  },
  listaContent: {
    padding: 8,
  },
  item: {
    padding: 15,
    marginVertical: 4,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemPressed: {
    backgroundColor: "#FFE66D",
    transform: [{ scale: 0.98 }],
  },
  itemText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  selectedPokemon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  detailsButton: {
    backgroundColor: "#FFE66D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placeholder: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default HomeScreen;

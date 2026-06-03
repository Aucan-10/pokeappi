import { useState, useEffect } from "react";
import { Text, View, FlatList, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { getPokemon, getUnPokemon } from "../services/pokemonService";
import { homeStyles as styles } from "../styles/homeStyles";
import { commonStyles } from "../styles/commonStyles";

export default function HomeScreen() {
  const [pokemones, setPokemon] = useState([]);
  const [detallesPokemon, setDetallesPokemon] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const cargarPokemon = async () => {
      const resultados = await getPokemon();
      setPokemon(resultados);
    };
    cargarPokemon();
  }, []);

  const handleSelectPokemon = async (name) => {
    const data = await getUnPokemon(name);
    setDetallesPokemon(data);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.lista}>
        <Text style={styles.homeTitle}>POKEAPP</Text>
        <Text style={styles.homeSubtitle}>Selecciona un Pokémon</Text>
        <FlatList
          data={pokemones}
          renderItem={({ item, index }) => (
            <Pressable
              style={({ pressed }) => [
                styles.item,
                pressed && styles.itemPressed,
              ]}
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
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listaContent}
          showsVerticalScrollIndicator={false}
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
                navigation.navigate("detalles", { pokemones: detallesPokemon })
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
}

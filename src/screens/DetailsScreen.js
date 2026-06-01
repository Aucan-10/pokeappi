import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function DetailsScreen({ route }) {
  const { pokemon } = route.params || {};

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.nombre}>{pokemon.name.toUpperCase()}</Text>
        <Image
          style={styles.image}
          source={{ uri: pokemon.sprites?.front_default }}
        />
      </View>

      <View style={styles.bottomSection}>
        <ScrollView>
          <View style={styles.grid}>
            <View style={styles.col}>
              <Text style={styles.titulo}>Status</Text>
              {pokemon.stats?.map((stat) => (
                <View key={stat.stat.name} style={styles.fila}>
                  <Text style={styles.statName}>{stat.stat.name}:</Text>
                  <Text style={styles.statValue}>{stat.base_stat}</Text>
                </View>
              ))}
            </View>

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
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: {
    flex: 0.3,
    backgroundColor: "#FF6B6B",
    justifyContent: "flex-start",
    padding: 20,
  },
  bottomSection: { flex: 0.7, backgroundColor: "#FFFFF0", padding: 20 },
  nombre: {
    color: "#FFFFF0",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
    textAlign: "left",
    marginLeft: 5,
    marginTop: 5,
  },
  image: { width: 150, height: 150, alignSelf: "center", marginTop: 10 },
  grid: { flexDirection: "row", marginTop: 20 },
  col: { flex: 1, padding: 10 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  statName: { textTransform: "capitalize" },
  statValue: { fontWeight: "bold" },
  habilidad: { marginBottom: 10, fontSize: 14, textTransform: "capitalize" },
});

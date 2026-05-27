import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

const DetailsScreen = () => {
  const route = useRoute();
  const { pokemon } = route.params || {};

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text>No hay información del Pokémon</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>

      <Image
        style={styles.image}
        source={{ uri: pokemon.sprites?.front_default }}
      />

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Información Básica</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Altura:</Text>
          <Text style={styles.infoValue}>{pokemon.height / 10} m</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Peso:</Text>
          <Text style={styles.infoValue}>{pokemon.weight / 10} kg</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Experiencia Base:</Text>
          <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Tipos</Text>
        <View style={styles.typesContainer}>
          {pokemon.types?.map((type, index) => (
            <View key={index} style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {type.type.name.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Habilidades</Text>
        {pokemon.abilities?.map((ability, index) => (
          <View key={index} style={styles.abilityRow}>
            <Text style={styles.abilityText}>
              • {ability.ability.name.replace("-", " ")}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "capitalize",
    color: "#2C3E50",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2C3E50",
    borderBottomWidth: 2,
    borderBottomColor: "#4ECDC4",
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  typeBadge: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },
  abilityRow: {
    paddingVertical: 6,
  },
  abilityText: {
    fontSize: 16,
    color: "#2C3E50",
    textTransform: "capitalize",
  },
});

export default DetailsScreen;

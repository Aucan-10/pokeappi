import { Text, View, Image, ScrollView } from "react-native";

import { detallesStyles as styles } from "../styles/detallesStyles";
import { commonStyles } from "../styles/commonStyles";

export default function DetallesScreen({ route }) {
  const { pokemones } = route.params || {};

  if (!pokemones) {
    return (
      <View style={commonStyles.container}>
        <Text>No hay datos</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      {/* Parte Superior - 30% */}
      <View style={styles.topSection}>
        <Text style={styles.nombre}>{pokemones.name.toUpperCase()}</Text>
        <Image
          style={styles.image}
          source={{ uri: pokemones.sprites?.front_default }}
        />
      </View>

      {/* Parte Inferior - 70% */}
      <View style={styles.bottomSection}>
        <ScrollView>
          <View style={commonStyles.grid}>
            {/* COLUMNA 1 - STATUS */}
            <View style={commonStyles.col}>
              <Text style={commonStyles.titulo}>Status</Text>
              {pokemones.stats?.map((stat) => (
                <View key={stat.stat.name} style={styles.fila}>
                  <Text>{stat.stat.name}:</Text>
                  <Text>{stat.base_stat}</Text>
                </View>
              ))}
            </View>

            {/* COLUMNA 2 - HABILIDADES */}
            <View style={commonStyles.col}>
              <Text style={commonStyles.titulo}>Habilidades</Text>
              {pokemones.abilities?.map((ability, index) => (
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

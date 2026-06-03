import { StyleSheet } from "react-native";

// Constantes de color centralizadas — importar desde acá en todos los archivos
export const COLORS = {
  primary: "#FF6B6B",
  background: "#FFFFF0",
  dark: "#333",
  muted: "#999",
  white: "white",
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
});

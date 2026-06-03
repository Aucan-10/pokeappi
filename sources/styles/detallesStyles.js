import { StyleSheet } from "react-native";
import { COLORS } from "./commonStyles";

export const detallesStyles = StyleSheet.create({
  topSection: {
    flex: 0.3,
    backgroundColor: COLORS.primary,
    justifyContent: "flex-start",
    padding: 20,
  },
  bottomSection: {
    flex: 0.7,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  nombre: {
    color: COLORS.background,
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

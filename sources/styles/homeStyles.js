import { StyleSheet } from "react-native";
import { COLORS } from "./commonStyles";

export const homeStyles = StyleSheet.create({
  lista: {
    flex: 0.5,
    backgroundColor: COLORS.primary,
  },
  detalles: {
    flex: 0.5,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 6,
    color: COLORS.white,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  homeSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 2,
  },
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
    color: COLORS.dark,
    textTransform: "capitalize",
  },
  itemArrow: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "300",
    marginLeft: 12,
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
    color: COLORS.dark,
    textTransform: "capitalize",
    marginBottom: 20,
    textAlign: "center",
  },
  verDetallesBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  verDetallesText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.white,
  },
  placeholder: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

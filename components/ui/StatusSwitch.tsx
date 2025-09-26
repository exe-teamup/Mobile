import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function StatusSwitch({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.container}>
      <Icon name="weather-sunny" size={22} color={!value ? "#FF7A00" : "#bbb"} />
      <TouchableOpacity
        style={[
          styles.switch,
          { backgroundColor: value ? "#22223B" : "#FF7A00", borderColor: value ? "#22223B" : "#FF7A00" },
        ]}
        onPress={() => onChange(!value)}
        activeOpacity={0.8}
      >
        <View style={[styles.dot, { left: value ? 22 : 2 }]} />
      </TouchableOpacity>
      <Icon name="weather-night" size={22} color={value ? "#FF7A00" : "#bbb"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 8 },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 14,
    borderWidth: 2,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    top: 2,
    elevation: 2,
  },
});
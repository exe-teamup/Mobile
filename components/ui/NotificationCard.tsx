import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type NotificationType = "info" | "success" | "warning";

const getCardStyle = (type: NotificationType) => {
  switch (type) {
    case "success": return { backgroundColor: "#E6FAF0", icon: "check-circle-outline", iconColor: "#2ecc71" };
    case "warning": return { backgroundColor: "#FFF9E6", icon: "alert-circle-outline", iconColor: "#FFB300" };
    default: return { backgroundColor: "#F3F8FC", icon: "information-outline", iconColor: "#2196F3" };
  }
};

export default function NotificationCard({
  type = "info",
  content,
  time,
}: {
  type?: NotificationType;
  content: string;
  time: string;
}) {
  const stylesCard = getCardStyle(type);
  return (
    <View style={[styles.card, { backgroundColor: stylesCard.backgroundColor }]}>
      <Icon name={stylesCard.icon} size={20} color={stylesCard.iconColor} style={{ marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  content: { fontSize: 14, color: "#222", marginBottom: 3 },
  time: { fontSize: 12, color: "#888" },
});
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export type TabKey = "forum" | "newpost" | "notification" | "account";

export default function TabBar({
  active,
  onTab,
}: {
  active: TabKey;
  onTab: (tab: TabKey) => void;
}) {
  return (
    <View style={styles.container}>
      <TabBarIcon
        icon="book-open-page-variant"
        active={active === "forum"}
        onPress={() => onTab("forum")}
      />
      <TabBarIcon
        icon="plus-box"
        active={active === "newpost"}
        onPress={() => onTab("newpost")}
      />
      <TabBarIcon
        icon="bell-outline"
        active={active === "notification"}
        onPress={() => onTab("notification")}
      />
      <TabBarIcon
        icon="account-circle-outline"
        active={active === "account"}
        onPress={() => onTab("account")}
      />
    </View>
  );
}

function TabBarIcon({
  icon,
  active,
  onPress,
}: {
  icon: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconBtn} activeOpacity={0.7}>
      <Icon
        name={icon}
        size={30}
        color={active ? "#FF7A00" : "#bbb"}
        style={{ opacity: active ? 1 : 0.6 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 10,
  },
  iconBtn: { flex: 1, alignItems: "center", paddingVertical: 6 },
});
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NOTIFICATION_FILTERS = [
  { label: "Tất cả", value: "all" },
  { label: "Hệ thống", value: "system" },
  { label: "Nhóm của bạn", value: "group" },
  { label: "Yêu cầu của bạn", value: "request" },
];

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "group",
    title: "Có 2 sinh viên vừa mới ứng tuyển vào nhóm EduTech của bạn.",
    time: "2 giờ trước",
    read: false,
  },
  {
    id: "2",
    type: "group",
    title: "Chúc mừng! Bạn vừa được chấp nhận vào nhóm Green Street.",
    time: "1 ngày trước",
    read: true,
  },
];

export default function NotificationScreen() {
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const notifications =
    filter === "all"
      ? MOCK_NOTIFICATIONS
      : MOCK_NOTIFICATIONS.filter((n) => n.type === filter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back-ios" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.readAll}>Read all</Text>
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter((v) => !v)}
        >
          <Text style={{ color: "#FF7A00", fontWeight: "bold" }}>
            {NOTIFICATION_FILTERS.find((f) => f.value === filter)?.label}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="#FF7A00" />
        </TouchableOpacity>
        {showFilter && (
          <View style={styles.filterDropdown}>
            {NOTIFICATION_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.value}
                style={styles.filterOption}
                onPress={() => {
                  setFilter(f.value);
                  setShowFilter(false);
                }}
              >
                <Text>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Notifications */}
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyDesc}>
            You have no notifications at this time thank you
          </Text>
          <MaterialIcons name="notifications-none" size={80} color="#FF7A00" style={{ marginTop: 20 }} />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.notificationCard,
                { backgroundColor: item.read ? "#E6F4EA" : "#E3F0FF" },
              ]}
            >
              <MaterialIcons
                name="notifications"
                size={22}
                color={item.read ? "#4CAF50" : "#1976D2"}
                style={{ marginRight: 8 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.notificationText}>{item.title}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="more-vert" size={22} color="#888" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  headerTitle: { fontWeight: "bold", fontSize: 18, flex: 1, textAlign: "center" },
  readAll: { color: "#FF7A00", fontWeight: "bold" },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF7A00",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FFF3E0",
  },
  filterDropdown: {
    position: "absolute",
    top: 36,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF7A00",
    zIndex: 10,
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  filterOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
  },
  notificationText: { fontWeight: "500", marginBottom: 4 },
  notificationTime: { color: "#888", fontSize: 12 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  emptyDesc: { color: "#888", marginBottom: 12 },
});
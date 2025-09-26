import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

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
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notificationsFiltered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    id: string
  ) => (
    <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteNotification(id)}>
      <MaterialIcons name="delete" size={24} color="#fff" />
      <Text style={{ color: "#fff" }}>Xoá</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    id: string
  ) => (
    <TouchableOpacity style={styles.readBtn} onPress={() => markAsRead(id)}>
      <MaterialIcons name="done" size={24} color="#fff" />
      <Text style={{ color: "#fff" }}>Đã đọc</Text>
    </TouchableOpacity>
  );

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
      {notificationsFiltered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyDesc}>
            You have no notifications at this time thank you
          </Text>
          <MaterialIcons name="notifications-none" size={80} color="#FF7A00" style={{ marginTop: 20 }} />
        </View>
      ) : (
        <FlatList
          data={notificationsFiltered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Swipeable
              renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item.id)}
              renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
            >
              <View
                style={[
                  styles.notificationCard,
                  { backgroundColor: item.read ? "#E6F4EA" : "#E3F0FF" },
                ]}
              >
                <MaterialIcons
                  name={item.read ? "check-circle" : "notifications"}
                  size={22}
                  color={item.read ? "#4CAF50" : "#1976D2"}
                  style={{ marginRight: 8 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.notificationText}>{item.title}</Text>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteNotification(item.id)}>
                  <MaterialIcons name="more-vert" size={22} color="#888" />
                </TouchableOpacity>
              </View>
            </Swipeable>
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
  deleteBtn: {
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 12,
    marginVertical: 10,
  },
  readBtn: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 12,
    marginVertical: 10,
  },
});
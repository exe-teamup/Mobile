import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LogoutConfirmModal({
  visible,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Bạn có chắc chắn muốn đăng xuất?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.24)", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#fff", borderRadius: 18, padding: 24, width: 320, maxWidth: "90%", alignItems: "center" },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 24, textAlign: "center" },
  buttonRow: { flexDirection: "row", gap: 16 },
  cancelBtn: { backgroundColor: "#eee", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  confirmBtn: { backgroundColor: "#FF7A00", paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8 },
  cancelText: { color: "#444", fontWeight: "bold" },
  confirmText: { color: "#fff", fontWeight: "bold" },
});
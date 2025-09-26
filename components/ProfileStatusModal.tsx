import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STATUSES = [
  { label: "Đang tìm nhóm", value: "đang tìm nhóm" },
  { label: "Đã có nhóm", value: "đã có nhóm" },
  { label: "Mặc định", value: "mặc định" },
];

export default function ProfileStatusModal({ visible, status, onClose, onChange }: any) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Thay đổi trạng thái cá nhân</Text>
          {STATUSES.map((s) => (
            <TouchableOpacity
              key={s.value}
              style={styles.option}
              onPress={() => onChange(s.value)}
            >
              <Text style={{ flex: 1 }}>{s.label}</Text>
              <View style={s.value === status ? styles.radioSelected : styles.radio} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={{ color: "#FF7A00" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.18)", justifyContent: "flex-end" },
  modal: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 16 },
  option: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: "#CCC", marginRight: 10 },
  radioSelected: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#FF7A00", marginRight: 10 },
  closeBtn: { marginTop: 20, alignSelf: "flex-end" },
});
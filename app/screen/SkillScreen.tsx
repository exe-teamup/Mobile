import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ALL_SKILLS = [
  "Graphic Design",
  "Graphic Thinking",
  "Ui/UX Design",
  "Adobe Indesign",
  "Web Design",
  "InDesign",
  "Canva Design",
  "User Interface Design",
  "Product Design",
  "User Experience Design",
  "Leadership",
  "Teamwork",
  "Visioner",
  "Target oriented",
  "Consistent",
  "Good communication skills",
  "English",
];

export default function SkillScreen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([
    "Leadership",
    "Teamwork",
    "Visioner",
    "Target oriented",
    "Consistent",
    "Good communication skills",
    "English",
  ]);
  const [showConfirm, setShowConfirm] = useState(false);

  // Lọc kỹ năng theo search và loại bỏ đã chọn
  const filteredSkills = ALL_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(skill)
  );

  const handleAddSkill = (skill: string) => {
    setSelected([...selected, skill]);
    setSearch("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSelected(selected.filter((s) => s !== skill));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back-ios" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm kĩ năng mới</Text>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Tìm kĩ năng phù hợp"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <MaterialIcons name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Selected skills */}
      <View style={styles.selectedWrap}>
        {selected.map((skill) => (
          <View key={skill} style={styles.selectedSkill}>
            <Text style={styles.selectedText}>{skill}</Text>
            <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
              <MaterialIcons name="close" size={16} color="#888" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* List skills */}
      {filteredSkills.length > 0 && (
        <FlatList
          data={filteredSkills}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.skillItem}
              onPress={() => handleAddSkill(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          style={{ marginHorizontal: 16, marginTop: 8 }}
        />
      )}

      {/* Button */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => setShowConfirm(true)}
      >
        <Text style={styles.saveBtnText}>CẬP NHẬT</Text>
      </TouchableOpacity>

      {/* Confirm Modal */}
      <Modal
        visible={showConfirm}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bạn có chắc chắn cập nhật không?</Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  setShowConfirm(false);
                  // TODO: Gọi API cập nhật kỹ năng ở đây
                }}
              >
                <Text style={styles.confirmBtnText}>CẬP NHẬT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelBtnText}>HUỶ THAY ĐỔI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  headerTitle: { fontWeight: "bold", fontSize: 18, marginLeft: 8 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16 },
  selectedWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  selectedSkill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedText: { marginRight: 4 },
  skillItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  saveBtn: {
    backgroundColor: "#FF7A00",
    borderRadius: 12,
    margin: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
  confirmBtn: {
    backgroundColor: "#FF7A00",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 12,
  },
  confirmBtnText: { color: "#fff", fontWeight: "bold" },
  cancelBtn: {
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelBtnText: { color: "#888", fontWeight: "bold" },
});
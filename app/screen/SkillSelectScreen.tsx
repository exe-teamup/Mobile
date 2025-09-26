import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AVAILABLE_SKILLS = [
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
];

export default function SkillSelectScreen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Lọc kỹ năng theo search và loại bỏ đã chọn
  const filteredSkills = AVAILABLE_SKILLS.filter(
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

  const handleEdit = () => {
    setIsEditing((v) => !v);
  };

  const handleLogout = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Huỷ", style: "cancel" },
        { text: "Đăng xuất", style: "destructive", onPress: handleLogout }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Thêm kĩ năng mới</Text>

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
        keyboardShouldPersistTaps="handled"
      />

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={handleEdit}
      >
        <Text style={styles.editText}>Sửa</Text>
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity style={styles.sectionEditBtn}>
          <MaterialIcons name="edit" size={18} color="#888" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={20} color="#FF7A00" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 24 },
  header: { fontWeight: "bold", fontSize: 18, marginLeft: 16, marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    marginHorizontal: 16,
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
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7A00",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 8,
  },
  editText: { color: "#fff", marginLeft: 8, fontWeight: "bold", fontSize: 16 },
  sectionEditBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 12,
    padding: 8,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7A00",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 8,
  },
  logoutText: { color: "#fff", marginLeft: 8, fontWeight: "bold", fontSize: 16 },
});
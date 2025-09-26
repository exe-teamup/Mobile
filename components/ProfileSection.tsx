import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ProfileSection({ profile }: { profile: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Giới thiệu</Text>
        <Text>{profile.bio}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Contact</Text>
        {profile.contact.map((item: any, idx: number) => (
          <View key={idx} style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}>
            <Icon name={item.icon} size={18} style={{ width: 30 }} />
            <Text style={{ marginLeft: 5 }}>{item.link}</Text>
          </View>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Skills</Text>
        <Text>{profile.skills}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Interested</Text>
        <Text>{profile.interested}</Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn}>
        <Icon name="sign-out" size={20} color="#FF7A00" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 10 },
  label: { fontWeight: "bold", marginBottom: 6, color: "#333" },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 18, backgroundColor: "#FFF3E0", padding: 10, borderRadius: 12 },
  logoutText: { color: "#FF7A00", marginLeft: 6, fontWeight: "bold" },
});
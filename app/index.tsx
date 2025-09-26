import avatarImg from "@/assets/images/dembele.jpg";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileSection from "@/components/ProfileSection";
import ProfileStatusModal from "@/components/ProfileStatusModal";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const MOCK_PROFILE = {
  avatar: avatarImg,
  name: "", 
  major: "", 
  bio: "",
  contact: [
    { id: "1", icon: "facebook", link: "" },
    { id: "2", icon: "linkedin", link: "" },
    { id: "3", icon: "github", link: "" },
  ],
  skills: ["", "", ""], 
  interested: ["", "", ""], 
  status: "mặc định",
};

export default function HomeScreen() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleEditProfile = () => {
    if (isEditing) {
      // Lưu thay đổi (có thể thêm API call tại đây)
      Alert.alert("Lưu thành công!");
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleStatusPress = () => {
    setShowStatusModal(true);
  };

  const handleStatusChange = (status: string) => {
    setProfile({ ...profile, status });
    setShowStatusModal(false);
    Alert.alert("Cập nhật trạng thái thành công!");
  };

  const updateContact = (id: string, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      contact: prev.contact.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addContact = () => {
    setProfile(prev => ({
      ...prev,
      contact: [...prev.contact, { id: Date.now().toString(), icon: "", link: "" }],
    }));
  };

  const removeContact = (id: string) => {
    setProfile(prev => ({
      ...prev,
      contact: prev.contact.filter(item => item.id !== id),
    }));
  };

  const updateSkills = (index: number, value: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addSkill = () => {
    setProfile(prev => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index: number) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const updateInterests = (index: number, value: string) => {
    setProfile(prev => ({
      ...prev,
      interested: prev.interested.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addInterest = () => {
    setProfile(prev => ({ ...prev, interested: [...prev.interested, ""] }));
  };

  const removeInterest = (index: number) => {
    setProfile(prev => ({
      ...prev,
      interested: prev.interested.filter((_, i) => i !== index),
    }));
  };

  const updateBio = (text: string) => {
    setProfile({ ...profile, bio: text });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <ScrollView>
        <ProfileHeader
            avatar={profile.avatar}
            name={profile.name}
            major={profile.major}
            isEditing={isEditing}
            onNameChange={text => setProfile({ ...profile, name: text })}
            onMajorChange={text => setProfile({ ...profile, major: text })}
            status={profile.status}
            onEdit={handleEditProfile}
            onStatusPress={handleStatusPress}
/>
        <ProfileSection
          profile={profile}
          isEditing={isEditing}
          onUpdateBio={updateBio}
          onUpdateContact={updateContact}
          onAddContact={addContact}
          onRemoveContact={removeContact}
          onUpdateSkills={updateSkills}
          onAddSkill={addSkill}
          onRemoveSkill={removeSkill}
          onUpdateInterests={updateInterests}
          onAddInterest={addInterest}
          onRemoveInterest={removeInterest}
        />
      </ScrollView>
      <ProfileStatusModal
        visible={showStatusModal}
        status={profile.status}
        onClose={() => setShowStatusModal(false)}
        onChange={handleStatusChange}
      />
    </View>
  );
}
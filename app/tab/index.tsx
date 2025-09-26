import ProfileHeader from "@/components/ProfileHeader";
import ProfileSection from "@/components/ProfileSection";
import ProfileStatusModal from "@/components/ProfileStatusModal";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import avatarImg from "../../assets/images/dembele.jpg";

const MOCK_PROFILE = {
  avatar: avatarImg,
  name: "Nguyễn Văn An",
  major: "Kỹ Thuật Phần Mềm",
  bio: "Tôi là một người đam mê công nghệ!",
  contact: [
    { icon: "facebook", link: "facebook/vanan.com" },
    { icon: "linkedin", link: "linkedin/vanan.com" },
    { icon: "github", link: "github/vanan.com" },
  ],
  skills: "Python, AWS, Redis, Docker, mySQL, Linux",
  interested: "Website, AI in production, Research",
  status: "mặc định",
};

export default function HomeScreen() {
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleEditProfile = () => {
    // navigation.navigate("EditProfile", { profile });
    // Nếu muốn điều hướng, thêm navigation ở đây
  };

  const handleStatusPress = () => {
    setShowStatusModal(true);
  };

  const handleStatusChange = (status: string) => {
    setProfile({ ...profile, status });
    setShowStatusModal(false);
    Alert.alert("Cập nhật trạng thái thành công!");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <ScrollView>
        <ProfileHeader
          avatar={profile.avatar}
          name={profile.name}
          major={profile.major}
          status={profile.status}
          onEdit={handleEditProfile}
          onStatusPress={handleStatusPress}
        />
        <ProfileSection profile={profile} />
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

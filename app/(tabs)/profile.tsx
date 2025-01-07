import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopBarNavigation from "@/components/ui/TopBarNavigation";
import { useQuery } from "react-query";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function profile() {
  type User = {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    gender: string;
    image: string;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return {
        id: 1,
        username: "test",
        email: "test@mail.com",
        firstname: "testUser",
        lastname: "",
        gender: "male",
        image: "https://dummyjson.com/icon/emilys/128",
      } as User;
    },
  });

  const menuList = [
    {
      title: "account",
      icon: <MaterialIcons name="person" size={24} />,
      action: () => Alert.alert("account"),
    },
    {
      title: "privacy policy",
      icon: <MaterialIcons name="security" size={24} />,
      action: () => Alert.alert("privacy policy"),
    },
    {
      title: "setting",
      icon: <MaterialIcons name="settings" size={24} />,
      action: () => Alert.alert("setting"),
    },
    {
      title: "about",
      icon: <MaterialIcons name="info" size={24} />,
      action: () => Alert.alert("about"),
    },
  ];

  return (
    <SafeAreaView style={{ height: "100%", padding: 24 }}>
      <TopBarNavigation name={"profile"} />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color="#F76C6A" />
        </View>
      ) : (
        <SafeAreaView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginTop: 24,
              marginHorizontal: 20,
              height: 150,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "auto",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 16,
                }}
              >
                <Image
                  style={{ width: 100, height: 100, borderRadius: 99 }}
                  source={{ uri: data?.image }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: 200,
                    height: 100,
                    marginLeft: 8,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "worksans",
                        fontSize: 16,
                        textAlign: "center",
                      }}
                    >
                      {data?.username}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "worksans",
                        fontSize: 16,
                        textAlign: "center",
                      }}
                    >
                      ID: {data?.id}
                    </Text>
                  </View>
                  <TouchableOpacity style={{ marginRight: 8 }}>
                    <AntDesign name="edit" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 24,
              marginHorizontal: 20,
              height: "auto",
              borderRadius: 16,
            }}
          >
            <ScrollView>
              {menuList.map((item, index: number) => (
                <View
                  style={{
                    margin: 8,
                    padding: 16,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                    <Text
                      style={{
                        marginLeft: 16,
                        fontFamily: "worksans",
                        fontSize: 16,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={item.action}>
                    <MaterialIcons name="arrow-forward" size={24} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

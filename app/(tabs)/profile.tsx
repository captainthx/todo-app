import { ThemedText } from "@/components/ThemedText";
import Card from "@/components/ui/Card";
import TopBarNavigation from "@/components/ui/TopBarNavigation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
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
import { useQuery } from "react-query";

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
  const colorIcon = useThemeColor({}, "icon");
  const backgroundColor = useThemeColor({}, "background");

  const menuList = [
    {
      title: "account",
      icon: <MaterialIcons name="person" size={24} color={colorIcon} />,
      action: () => Alert.alert("account"),
    },
    {
      title: "privacy policy",
      icon: <MaterialIcons name="security" size={24} color={colorIcon} />,
      action: () => Alert.alert("privacy policy"),
    },
    {
      title: "setting",
      icon: <MaterialIcons name="settings" size={24} color={colorIcon} />,
      action: () => Alert.alert("setting"),
    },
    {
      title: "about",
      icon: <MaterialIcons name="info" size={24} color={colorIcon} />,
      action: () => Alert.alert("about"),
    },
  ];
  return (
    <SafeAreaView style={{ height: "100%", padding: 24, backgroundColor }}>
      <TopBarNavigation name={"Profile"} />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color="#F76C6A" />
        </View>
      ) : (
        <SafeAreaView>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
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
                    <ThemedText
                      type="defaultSemiBold"
                      style={{
                        fontFamily: "worksans",
                        fontSize: 16,
                        textAlign: "center",
                      }}
                    >
                      {data?.username}
                    </ThemedText>
                    <ThemedText
                      type="defaultSemiBold"
                      style={{
                        fontFamily: "worksans",
                        fontSize: 16,
                        textAlign: "center",
                      }}
                    >
                      ID: {data?.id}
                    </ThemedText>
                  </View>
                  <TouchableOpacity style={{ marginRight: 8 }}>
                    <AntDesign name="edit" size={24} color={colorIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>

          <Card
            style={{
              height: "auto",
            }}
          >
            <ScrollView>
              {menuList.map((item, index: number) => (
                <View
                  style={{
                    margin: 8,
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                    <ThemedText
                      style={{
                        marginLeft: 16,
                        fontFamily: "worksans",
                        fontSize: 16,
                      }}
                    >
                      {item.title}
                    </ThemedText>
                  </View>
                  <TouchableOpacity onPress={item.action}>
                    <MaterialIcons
                      name="arrow-forward"
                      size={24}
                      color={colorIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </Card>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

import {ActivityIndicator, View} from "react-native";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a0a",
      }}
    >
      <ActivityIndicator color="#7c3aed" size={64} />
    </View>
  );
}

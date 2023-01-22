import {useFonts} from "expo-font";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import {Loading} from "./src/components/Loading";

import {StatusBar} from "expo-status-bar";

import "./src/lib/dayjs";
import {Routes} from "./src/routes";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Routes />
      <StatusBar translucent backgroundColor="transparent" />
    </>
  );
}

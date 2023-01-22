import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import {Feather} from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, {
  FadeIn,
  RotateInUpLeft,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

type Props = {
  title: string;
  checked?: boolean;
} & TouchableOpacityProps;

export function Checkbox({checked = false, title, ...rest}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="h-8 w-8 bg-green-500 border-2 border-green-400 rounded-lg items-center justify-center"
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 border-2 border-zinc-700 rounded-lg items-center justify-center"></View>
      )}

      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}

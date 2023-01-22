import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import clsx from "clsx";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / weekDays - screenHorizontalPadding;

type Props = {
  completed?: number;
  amount?: number;
  date: Date;
} & TouchableOpacityProps;

export function HabitDay({completed = 0, amount = 0, date, ...rest}: Props) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <TouchableOpacity
      className={clsx("bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800", {
        "bg-zinc-900 border-zinc-800": completedPercentage === 0,
        "bg-violet-900 border-violet-700":
          completedPercentage > 0 && completedPercentage < 20,
        "bg-violet-800 border-violet-600":
          completedPercentage >= 20 && completedPercentage < 40,
        "bg-violet-700 border-violet-500":
          completedPercentage >= 40 && completedPercentage < 60,
        "bg-violet-600 border-violet-500":
          completedPercentage >= 60 && completedPercentage < 80,
        "bg-violet-500 border-violet-400": completedPercentage >= 80,
      })}
      style={{width: daySize, height: daySize}}
      activeOpacity={0.7}
      {...rest}
    />
  );
}

/*

*/

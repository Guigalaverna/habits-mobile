import {useRoute} from "@react-navigation/native";
import {Alert, ScrollView, Text, View} from "react-native";
import {BackButton} from "../components/BackButton";

import dayjs from "dayjs";
import {ProgressBar} from "../components/ProgressBar";
import {Checkbox} from "../components/Checkbox";
import {useEffect, useState} from "react";
import {api} from "../lib/api";
import {Loading} from "../components/Loading";

interface Params {
  date: string;
}

interface DayInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function Habit() {
  const route = useRoute();
  const {date} = route.params as Params;

  const [loading, setLoading] = useState(true);

  const [dayInfo, setDayInfo] = useState<DayInfo>();
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayOfMonth = parsedDate.format("DD/MM");

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("day", {params: {date}});

      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Erro ao obter as informações");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const completedPercentage =
    dayInfo!.possibleHabits.length > 0
      ? Math.round(
          (completedHabits.length / dayInfo!.possibleHabits.length) * 100
        )
      : 0;

  async function toggleHabit(id: string) {
    if (completedHabits.includes(id)) {
      setCompletedHabits(prevState => prevState?.filter(habit => habit !== id));
    } else {
      setCompletedHabits(prevState => [...prevState, id]);
    }

    await api.patch(`habits/${id}/toggle`);
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-semibold text-3xl mt-3 mb-6">
          {dayOfMonth}
        </Text>

        <ProgressBar progress={completedPercentage} />

        <View className="mt-6">
          {dayInfo?.possibleHabits &&
            dayInfo?.possibleHabits.map(possibleHabit => {
              const isCompleted = completedHabits.includes(possibleHabit.id);

              return (
                <Checkbox
                  key={possibleHabit.id}
                  checked={isCompleted}
                  onPress={() => toggleHabit(possibleHabit.id)}
                  title={possibleHabit.title}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

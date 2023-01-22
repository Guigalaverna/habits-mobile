import {useNavigation} from "@react-navigation/native";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {daySize, HabitDay} from "../components/HabitDay";
import {Header} from "../components/Header";
import {Loading} from "../components/Loading";
import {api} from "../lib/api";
import {generateDateFormYearBeginning} from "../utils/generate-range-from-year-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearBeginning = generateDateFormYearBeginning();
const minimumSummaryDatesSize = 18 * 4;
const amountOfDaysToFill =
  minimumSummaryDatesSize - datesFromYearBeginning.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary[]>([]);

  const {navigate} = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get("summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops!", "Não foi possível carregar as informações");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-4 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, i) => {
          return (
            <Text
              key={i}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{width: daySize}}
            >
              {day}
            </Text>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearBeginning.map(date => {
            const dayWithHabits = summary.find(({date: day}) => {
              return dayjs(date).isSame(day);
            });

            return (
              <HabitDay
                key={date.toString()}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                date={date}
                onPress={() =>
                  navigate("habit-details", {date: date.toISOString()})
                }
              />
            );
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({length: amountOfDaysToFill}).map((day, i) => (
              <View
                key={i}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{width: daySize, height: daySize}}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

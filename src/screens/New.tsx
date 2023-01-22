import {useState} from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";
import {BackButton} from "../components/BackButton";
import {Checkbox} from "../components/Checkbox";
import {Feather} from "@expo/vector-icons";
import {api} from "../lib/api";
import {useNavigation} from "@react-navigation/native";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const {goBack} = useNavigation();

  const [title, setTitle] = useState<string>("");

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => [
        ...prevState.filter(weekDay => weekDay !== weekDayIndex),
      ]);
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function createNewHabit() {
    if (!title || weekDays.length === 0) {
      Alert.alert("Ops!", "Preencha o título e a recorrência");
      return;
    }

    try {
      await api.post("habits/create", {
        title,
        weekDays,
      });

      setTitle("");
      setWeekDays([]);

      goBack();
    } catch (error) {
      Alert.alert("Ops!", "Não foi possível criar um novo hábito");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 border-2 border-zinc-700 text-white focus:border-green-600"
          placeholderTextColor={colors.zinc[500]}
          value={title}
          onChangeText={e => setTitle(e)}
          placeholder="Ex: beber 2L de água, exercitar-se"
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual é a recorrência?
        </Text>

        {availableWeekDays.map((day, i) => (
          <Checkbox
            key={`${day}-${i}`}
            title={day}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}

        <TouchableOpacity
          className="flex-1 h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={createNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

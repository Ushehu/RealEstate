import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import seed from "@/lib/seed";

export default function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSeed = async () => {
    Alert.alert(
      "Seed Database",
      "This will delete all existing data and create new sample data. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Seed",
          style: "destructive",
          onPress: async () => {
            setIsSeeding(true);
            setSeedStatus("idle");

            try {
              await seed();
              setSeedStatus("success");
              Alert.alert(
                "Success! 🎉",
                "Database has been seeded with sample data.",
                [{ text: "OK" }]
              );
            } catch (error) {
              setSeedStatus("error");
              Alert.alert(
                "Error",
                `Failed to seed database: ${error instanceof Error ? error.message : "Unknown error"}`,
                [{ text: "OK" }]
              );
            } finally {
              setIsSeeding(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleSeed}
        disabled={isSeeding}
        className={`rounded-lg p-4 items-center justify-center ${
          isSeeding
            ? "bg-gray-400"
            : seedStatus === "success"
            ? "bg-green-600"
            : seedStatus === "error"
            ? "bg-red-600"
            : "bg-primary-300"
        }`}
        activeOpacity={0.7}
      >
        {isSeeding ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator color="white" />
            <Text className="text-white font-rubik-bold text-base">
              Seeding Database...
            </Text>
          </View>
        ) : (
          <Text className="text-white font-rubik-bold text-base">
            {seedStatus === "success"
              ? "✓ Seeded Successfully"
              : seedStatus === "error"
              ? "✗ Seeding Failed"
              : "🌱 Seed Database"}
          </Text>
        )}
      </TouchableOpacity>

      {seedStatus === "success" && (
        <Text className="text-green-600 text-center mt-2 font-rubik text-sm">
          20 properties, 5 agents, 20 reviews, and galleries added!
        </Text>
      )}

      {seedStatus === "error" && (
        <Text className="text-red-600 text-center mt-2 font-rubik text-sm">
          Something went wrong. Check console for details.
        </Text>
      )}

      <Text className="text-gray-500 text-center mt-3 font-rubik text-xs">
        ⚠️ This will delete all existing data
      </Text>
    </View>
  );
}
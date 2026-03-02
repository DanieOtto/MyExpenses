import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CATEGORIES = [
  "groceries",
  "eat-out",
  "electricity",
  "clothing",
  "insurance",
];

export default function ExpensesScreen() {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    CATEGORIES.forEach((c) => (init[c] = ""));
    return init;
  });

  const keyboardType = Platform.OS === "ios" ? "decimal-pad" : "numeric";

  const setValue = (key: string, text: string) => {
    setValues((s) => ({ ...s, [key]: text }));
  };

  const onSubmit = () => {
    const parsed: Record<string, number> = {};
    CATEGORIES.forEach((c) => {
      const raw = values[c] ?? "";
      const num = parseFloat(raw.replace(/,/g, "."));
      parsed[c] = Number.isFinite(num) ? num : 0;
    });
    console.log("Submitted expenses:", parsed);
    const summary = CATEGORIES.map((c) => `${c}: ${parsed[c].toFixed(2)}`).join("\n");
    Alert.alert("Expenses submitted", summary);
  };

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Expenses</Text>

        <ScrollView contentContainerStyle={styles.list}>
          {CATEGORIES.map((cat) => (
            <View key={cat} style={styles.row}>
              <Text style={styles.label}>{cat}</Text>
              <TextInput
                value={values[cat]}
                onChangeText={(t) => setValue(cat, t)}
                keyboardType={keyboardType}
                placeholder="0.00"
                style={styles.input}
                returnKeyType="done"
              />
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
  list: { paddingBottom: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: { fontSize: 16, textTransform: "capitalize" },
  input: {
    width: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#0066CC",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
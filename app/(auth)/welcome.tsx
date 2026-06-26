import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💚</Text>

      <Text style={styles.title}>داويني</Text>

      <Text style={styles.subtitle}>
        صحتك تبدأ من هنا
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    fontSize: 70,
    marginBottom: 20,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 15,
    fontSize: 18,
    color: Colors.subtitle,
  },
});
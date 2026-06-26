import { View, Text, StyleSheet } from 'react-native';

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intro Screen — Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#0F766E',
  },
});
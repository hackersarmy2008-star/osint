import { View, Text } from 'react-native';
export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22 }}>🏠 Home</Text>
      <Text>Welcome! Use the Users tab to see total users.</Text>
    </View>
  );
}
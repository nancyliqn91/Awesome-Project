import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Blog from './Blog'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to see the travel blogs!</Text>
      <StatusBar style="auto" /> 
      <Blog/>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabase';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Missing Info', 'Enter both email and password.');
        return;
      }

      console.log('Attempting login with:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.log('Login success:', data);
        navigation.replace('Home');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'Unexpected issue occurred.');
    }
  };

  const handleSignUp = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Missing Info', 'Enter both email and password.');
        return;
      }

      console.log('Creating account for:', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Signup error:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.log('Signup success:', data);
        Alert.alert('Success', 'Account created! You can now log in.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'Unexpected issue occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FaxThat Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    width: '90%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondary: {
    backgroundColor: '#333',
  },
});

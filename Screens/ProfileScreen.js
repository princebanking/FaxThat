// Screens/ProfileScreen.js
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { supabase } from '../supabase';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({ username: '', bio: '', avatar_url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error loading profile');
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return Alert.alert('No user found');

      const updates = {
        user_id: user.id,
        username: profile.username,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { onConflict: 'user_id' });

      if (error) throw error;
      Alert.alert('Profile updated!');
    } catch (error) {
      console.error(error);
      Alert.alert('Update failed');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
      navigation.replace('Login'); // ✅ FIXED: Goes to Login instead of Auth/Home
    } catch (error) {
      Alert.alert('Error logging out', error.message);
    }
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={profile.avatar_url ? { uri: profile.avatar_url } : require('../assets/images/background.jpg')}
        style={styles.avatar}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        value={profile.username}
        onChangeText={(text) => setProfile({ ...profile, username: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio"
        placeholderTextColor="#888"
        value={profile.bio}
        onChangeText={(text) => setProfile({ ...profile, bio: text })}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#333' }]} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginVertical: 20 },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
  },
  buttonText: { color: '#000', fontWeight: '600', textAlign: 'center' },
});

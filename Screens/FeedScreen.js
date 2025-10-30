// Screens/FeedScreen.js
import { Heart, MessageCircle, Repeat2, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from '../supabase';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data);
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;

    const { error } = await supabase.from('posts').insert([
      {
        caption: newPost,
        likes: 0,
        comments: 0,
        reposts: 0,
        user_id: user.id,
        username: user.email || 'Anonymous',
      },
    ]);

    if (!error) {
      setNewPost('');
      fetchPosts();
    }
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
    Animated.timing(fadeAnim, {
      toValue: menuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }], // Go directly to login
    });
  }
};


  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header with Profile Icon */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.profileButton}>
            <User color="#fff" size={26} />
          </TouchableOpacity>

          {menuVisible && (
            <Animated.View style={[styles.dropdownOverlay, { opacity: fadeAnim }]}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate('Profile');
                }}
              >
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleLogout}
              >
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Feed List */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.caption}>{item.caption}</Text>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <Heart color="#fff" size={18} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MessageCircle color="#fff" size={18} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Repeat2 color="#fff" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* Create Post Input */}
        <View style={styles.newPostContainer}>
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor="#888"
            value={newPost}
            onChangeText={setNewPost}
            style={styles.input}
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, backgroundColor: '#000' },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#000',
    zIndex: 5,
  },
  profileButton: {
    padding: 8,
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 50,
    right: 15,
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 8,
    width: 120,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  username: { color: '#aaa', fontSize: 14, marginBottom: 5 },
  caption: { color: '#fff', fontSize: 16 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 110,
    marginTop: 10,
  },
  newPostContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  input: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  postButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 10,
  },
  postButtonText: { color: '#000', fontWeight: '600' },
});

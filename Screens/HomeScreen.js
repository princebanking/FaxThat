import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.buttonText}>Scan Barcode</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.buttonText}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}>
            <Text style={styles.buttonText}>Social Feed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,   // increased size
    height: 300,  // increased size
    marginBottom: 70,
  },
  buttons: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#000', // black buttons
    borderWidth: 1.2,
    borderRadius: 10,
    width: '75%',
    paddingVertical: 15,
    marginVertical: 10,
  },
  buttonText: {
  color: '#fff',
  fontSize: 20,
  fontFamily: 'PlayfairDisplay_700Bold',
  textAlign: 'center',
  letterSpacing: 1,
},

});

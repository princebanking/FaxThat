import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = ({ data }) => {
    if (!scannedData) {
      setScannedData(data);
      if (data.startsWith('http')) {
        Linking.openURL(data);           // open URLs in Safari
      } else {
        alert(`Scanned: ${data}`);       // show plain text / UPC
      }
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission is required.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'upc_a', 'upc_e'],
        }}
        onBarcodeScanned={scannedData ? undefined : handleBarcodeScanned}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          >
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      {scannedData && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Scanned Data:</Text>
          <Text style={styles.dataText}>{scannedData}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setScannedData(null)}>
            <Text style={styles.text}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  flipButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: { color: '#fff', fontSize: 16 },
  resultBox: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#111',
  },
  resultText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  dataText: { color: '#0ff', fontSize: 16, marginVertical: 10 },
  button: {
    marginTop: 10,
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
});

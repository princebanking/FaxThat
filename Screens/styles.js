import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginVertical: 10,
    width: '75%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#fff',
    width: '80%',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: '#B3B3B3',
    fontSize: 16,
  },
});

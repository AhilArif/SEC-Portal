import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function FormScreen() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = () => {
    fetch('http://10.0.2.2:3000/form') // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched forms:', data);
        setForms(data);
      })
      .catch((error) => {
        console.error('Error fetching forms:', error);
        setError('Failed to fetch forms.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {forms.length > 0 ? (
        forms.map((form) => (
          <View key={form._id} style={styles.card}>
            <Text style={styles.formTitle}>{form.title}</Text>
            <Text style={styles.formDescription}>{form.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.title}>NO FORMS AVAILABLE OR CONNECT TO DATABASE</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  formDescription: {
    fontSize: 14,
    color: '#555',
  },
});

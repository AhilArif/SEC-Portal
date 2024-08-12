import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FinanceFormScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    eventName: '',
    budget: '',
    expenses: '',
    description: '',
  });

  const handleSubmit = () => {
    // Handle form submission logic here, such as sending data to the backend

    // Show alert on submission
    Alert.alert(
      'Finance Submitted',
      'Your finance details have been successfully submitted!',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );

    // Reset form data
    setFormData({
      eventName: '',
      budget: '',
      expenses: '',
      description: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Finance</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        onChangeText={(text) => setFormData({ ...formData, eventName: text })}
        value={formData.eventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget"
        onChangeText={(text) => setFormData({ ...formData, budget: text })}
        value={formData.budget}
      />
      <TextInput
        style={styles.input}
        placeholder="Expenses"
        onChangeText={(text) => setFormData({ ...formData, expenses: text })}
        value={formData.expenses}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        value={formData.description}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FinanceFormScreen;

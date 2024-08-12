import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventFormScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventDescription: '',
  });

  const handleSubmit = () => {
    // Handle form submission logic here, such as sending data to the backend

    // Show alert on submission
    Alert.alert(
      'Event Submitted',
      'Your event has been successfully submitted!',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );

    // Reset form data
    setFormData({
      eventName: '',
      eventDate: '',
      eventLocation: '',
      eventDescription: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        onChangeText={(text) => setFormData({ ...formData, eventName: text })}
        value={formData.eventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        onChangeText={(text) => setFormData({ ...formData, eventDate: text })}
        value={formData.eventDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Location"
        onChangeText={(text) => setFormData({ ...formData, eventLocation: text })}
        value={formData.eventLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        onChangeText={(text) => setFormData({ ...formData, eventDescription: text })}
        value={formData.eventDescription}
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

export default EventFormScreen;

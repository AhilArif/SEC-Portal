import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AddScreen = () => {
  const [eventDetailsExpanded, setEventDetailsExpanded] = useState(false);
  const [financeDetailsExpanded, setFinanceDetailsExpanded] = useState(false);

  const [eventname, setEventname] = useState('');
  const [eventdate, setEventdate] = useState('');
  const [eventlocation, setEventlocation] = useState('');

  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState('');
  const [revenue, setRevenue] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Prevent navigation if the form is not submitted
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!formSubmitted) {
          Alert.alert(
            'Incomplete Form',
            'Please complete and submit the form before leaving.',
            [{ text: 'OK' }]
          );
          return true; // Prevent default behavior (going back)
        }
        return false; // Allow default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [formSubmitted])
  );

  const handleSubmit = async () => {
    if (!eventname || !eventdate || !eventlocation || !budget || !expenses || !revenue) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    const eventData = {
      eventname,
      eventdate,
      eventlocation,
      budget,
      expenses,
      revenue,
    };
  
    try {
      const response = await fetch('http://10.0.2.2:3000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Form Submitted', 'Your form has been received. Please check your email for any changes.', [{ text: 'OK' }]);
        setFormSubmitted(true);
  
        // Reset form fields
        setEventname('');
        setEventdate('');
        setEventlocation('');
        setBudget('');
        setExpenses('');
        setRevenue('');
      } else {
        Alert.alert('Error', data.error || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting the form.');
      console.error('Submission error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setEventDetailsExpanded(!eventDetailsExpanded)}
      >
        <Text style={styles.sectionTitle}>Event Details</Text>
      </TouchableOpacity>
      {eventDetailsExpanded && (
        <View style={styles.sectionContent}>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={eventname}
            onChangeText={setEventname}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Date"
            value={eventdate}
            onChangeText={setEventdate}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Location"
            value={eventlocation}
            onChangeText={setEventlocation}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setFinanceDetailsExpanded(!financeDetailsExpanded)}
      >
        <Text style={styles.sectionTitle}>Finance Details</Text>
      </TouchableOpacity>
      {financeDetailsExpanded && (
        <View style={styles.sectionContent}>
          <TextInput
            style={styles.input}
            placeholder="Budget"
            value={budget}
            onChangeText={setBudget}
          />
          <TextInput
            style={styles.input}
            placeholder="Expenses"
            value={expenses}
            onChangeText={setExpenses}
          />
          <TextInput
            style={styles.input}
            placeholder="Revenue"
            value={revenue}
            onChangeText={setRevenue}
          />
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  sectionHeader: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddScreen;
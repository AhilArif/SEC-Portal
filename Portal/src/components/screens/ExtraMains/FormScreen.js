import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TextInput, Button } from 'react-native';

export default function FormScreen() {
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [statusToUpdate, setStatusToUpdate] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = () => {
    fetch('http://10.0.2.2:3000/form') // Replace with your server URL
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error fetching forms:', error));
  };

  const handleFormClick = (formId) => {
    setSelectedFormId(selectedFormId === formId ? null : formId); // Toggle selection
  };

  const openModal = (status) => {
    setStatusToUpdate(status);
    setModalVisible(true);
  };

  const handleAccept = () => {
    openModal('closed');
  };

  const handleReject = () => {
    openModal('rejected');
  };

  const submitFeedback = () => {
    fetch(`http://10.0.2.2:3000/forms/${selectedFormId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Ensure the correct content type
      },
      body: JSON.stringify({
        status: statusToUpdate,
        suggestion: feedback, // Assuming 'suggestion' field is used for feedback
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update form');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Form updated:', data);
        fetchForms(); // Reload the forms to reflect updates
        setModalVisible(false);
        setFeedback('');
        setSelectedFormId(null);
      })
      .catch((error) => console.error('Error updating form:', error));
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {forms.length > 0 ? (
        forms.map((form) => (
          <TouchableOpacity
            key={form._id}
            style={styles.card}
            onPress={() => handleFormClick(form._id)}
          >
            <Text style={styles.formTitle}>{form.eventname}</Text>
            <View style={styles.expandableSection}>
              <Text style={styles.formDetails}>Date: {form.eventdate}</Text>
              <Text style={styles.formDetails}>Location: {form.eventlocation}</Text>
              <Text style={styles.formDetails}>Budget: {form.budget}</Text>
              <Text style={styles.formDetails}>Expenses: {form.expenses}</Text>
              <Text style={styles.formDetails}>Revenue: {form.revenue}</Text>
            </View>

            {form.status ? (
              <Text style={styles.statusMessage}>
                This form is {form.status.toUpperCase()}
              </Text>
            ) : (
              selectedFormId === form._id && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={handleAccept}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={handleReject}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.title}>NO FORMS AVAILABLE OR CONNECT TO DATABASE</Text>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Provide Feedback</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your feedback..."
              value={feedback}
              onChangeText={setFeedback}
            />
            <Button title="Submit" onPress={submitFeedback} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
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
  expandableSection: {
    paddingTop: 10,
  },
  formDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  statusMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';

export default function RequestScreen() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://10.0.2.2:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => setError('Failed to fetch users.'));
  };

  const handleDelete = (userId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            fetch(`http://10.0.2.2:3000/users/${userId}`, { method: 'DELETE' })
              .then((response) => response.json())
              .then((data) => {
                Alert.alert('Success', 'User deleted successfully');
                setUsers(users.filter(user => user._id !== userId));
              })
              .catch((error) => {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to delete user');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = (userId) => {
    if (!newEmail || !newPassword) {
      Alert.alert('Error', 'Please enter a new email and password');
      return;
    }

    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update this user\'s email and password?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            fetch('http://10.0.2.2:3000/users/update-email-password', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: editingUser.email, newEmail, newPassword }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('User updated:', data);
                Alert.alert('Success', 'User email and password updated successfully');
                setEditingUser(null);
                setNewEmail('');
                setNewPassword('');
                fetchUsers(); // Fetch users again to update the list
              })
              .catch((error) => {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to update user');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {users.length > 0 ? (
        users.map((user) => (
          <View key={user._id} style={styles.card}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(user._id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEditingUser(user);
                setNewEmail(user.email); // Prefill with current email
              }}
            >
              <Text style={styles.editButtonText}>Edit Email & Password</Text>
            </TouchableOpacity>

            {editingUser && editingUser._id === user._id && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="New Email"
                  value={newEmail}
                  onChangeText={setNewEmail}
                />
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleUpdate(user._id)}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.title}>NO REQUEST AT THE MOMENT! OR CONNECT TO DATABASE</Text>
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function AdminNotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const fetchAllNotifications = async () => {
    try {
        const response = await fetch('http://10.0.2.2:3000/notification');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setFetchError(error.message);  // Save the error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Notification Center</Text>
      {fetchError ? (
        <Text style={styles.errorText}>Error: {fetchError}</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationType}>{item.type}</Text>
              <Text style={styles.notificationDate}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationType: {
    fontSize: 14,
    color: '#555',
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

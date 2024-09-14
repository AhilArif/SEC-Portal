import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Alert, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import axios from 'axios';
import loginbg from '../../../assets/loginbg.png';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) {
      Alert.alert('Please enter a search query.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('http://10.0.2.2:3000/search', {
        params: { query: searchQuery },
      });

      setLoading(false);

      if (response.data.forms && response.data.forms.length > 0) {
        setSearchResults(response.data.forms);
      } else {
        setSearchResults(null);
        Alert.alert('No forms found.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Search error:', error);
      Alert.alert('Error occurred while searching. Please check your network connection.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.loginbg} source={loginbg} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          value={searchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Feather name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      <ScrollView style={styles.resultsContainer}>
        {searchResults && (
          <>
            <Text style={styles.sectionTitle}>Forms:</Text>
            {searchResults.map((form, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.formTitle}>{form.eventname}</Text>
                <Text style={styles.formDate}>{new Date(form.eventdate).toLocaleDateString()}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 60,
    marginRight: 15,
    marginLeft: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
  },
  searchButton: {
    paddingHorizontal: 10,
  },
  loginbg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 0.9,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  resultsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  formDate: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
});

export default SearchScreen;

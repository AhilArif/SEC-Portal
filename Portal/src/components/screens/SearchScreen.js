import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const SearchScreen = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Pass the search query to the parent component
    onSearch('Dummy search result for: ' + searchQuery);
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        value={searchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import loginbg from '../../../assets/loginbg.png'

const SearchScreen = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch('Dummy search result for: ' + searchQuery);
  };

  return (
    <View style={styles.container}>
        <Image style={styles.loginbg} source={loginbg} />
    <View style={styles.container1}>
      <Feather name="search" size={24} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        value={searchQuery}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'pink'
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 60,
    marginRight: 15,
    marginLeft: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginbg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 0.9,
  }
});

export default SearchScreen;

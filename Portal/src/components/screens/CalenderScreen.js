import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  // Import images (replace image paths with your own)
  const eventImages = {
    zabFest: require('../../../images/sccthrewurcloths-lozge7.jpeg'),
    techSummit: require('../../../images/sccthrewurcloths-lozge7.jpeg'),
    hackathon: require('../../../images/sccthrewurcloths-lozge7.jpeg'),
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          // Add your calendar customization props here
          // For example:
          // onDayPress={(day) => { console.log('selected day', day); }}
        />
      </View>

      <View style={styles.eventsContainer}>
        <Text style={styles.heading}>Upcoming Events</Text>
        {/* List of upcoming events */}
        {/* Add your list of events here */}
        <View style={styles.eventItem}>
          <Image source={eventImages.zabFest} style={styles.eventImage} />
          <Text>ZAB E-Fest</Text>
        </View>
        <View style={styles.eventItem}>
          <Image source={eventImages.techSummit} style={styles.eventImage} />
          <Text>ZAB Tech Summit</Text>
        </View>
        <View style={styles.eventItem}>
          <Image source={eventImages.hackathon} style={styles.eventImage} />
          <Text>ZAB Hackathon</Text>
        </View>
        {/* Add more events as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendarContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  eventsContainer: {
    padding: 10,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eventImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25, // Make the image circular
  },
  loginbg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 0.9,
  },
});

export default CalendarScreen;

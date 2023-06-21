import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const color = '#00AFF0';

const Header = ({ year }: { year: number }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerImage}>
        <FontAwesome size={16} name="image" color="#ffffff" />
      </View>
      <View style={styles.headerYearContainer}>
        <Text style={styles.headerYear}>{year}</Text>
        <View style={styles.headerCalendar}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={25}
            color="#ffffff"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerYear: {
    fontSize: 20,
    color: color,
  },
  headerCalendar: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

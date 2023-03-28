import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CalendarFromNPM from './src/screens/CalendarFromNPM';
import CalendarDateFNS from './src/screens/CalendarDateFNS';
import BufferedCalendar from './src/screens/BufferCalendar';
import CalendarForLoopDateFNS from './src/screens/CalendarForLoopDateFNS';

const color = '#00AFF0';

const App = () => {
  const [view, setView] = useState(<CalendarFromNPM />);
  const [viewTitle, setViewTitle] = useState('Taken from NPM package');

  return (
    <>
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<CalendarFromNPM />);
            setViewTitle('Taken from NPM package');
          }}>
          <Text style={styles.navButtonText}>NPM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<CalendarDateFNS />);
            setViewTitle('Generated using Date-FNS and .map()');
          }}>
          <Text style={styles.navButtonText}>FNS Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<CalendarForLoopDateFNS />);
            setViewTitle('Generated using Date-FNS and for loop');
          }}>
          <Text style={styles.navButtonText}>FNS For Loop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<BufferedCalendar />);
            setViewTitle('Buffered calendar');
          }}>
          <Text style={styles.navButtonText}>FNS Buffered</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
        {viewTitle}
      </Text>
      <Text
        style={{ textAlign: 'center', color: 'green', paddingHorizontal: 5 }}>
        Choose Calendar render method by using buttons above. Swipe to
        Left/Right to change Years.
      </Text>

      <ScrollView
        // Actual calendar content in this component
        contentContainerStyle={{
          padding: 10,
          backgroundColor: '#ffffff',
        }}>
        {view}
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  navContainer: {
    padding: 5,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: color,
  },
  navButtonText: {
    color: 'white',
  },
});

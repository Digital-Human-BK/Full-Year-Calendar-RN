import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import CalendarFromNPM from './src/screens/CalendarFromNPM';
// import CalendarDateFNS from './src/screens/CalendarDateFNS';
import BufferedCalendarFL from './src/screens/BufferCalendarFL';
import CalendarForLoopDateFNS from './src/screens/CalendarForLoopDateFNS';
// import BufferedCalendarBidirectional from './src/screens/BufferCalendarBidirectional';
import Calendar from './src/screens/Calendar';
import TestBidirectionalOriginal from './src/screens/TestBidirectionalOriginal';

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
            setView(<Calendar />);
            setViewTitle('Test');
          }}>
          <Text style={styles.navButtonText}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<CalendarForLoopDateFNS />);
            setViewTitle('Generated using Date-FNS and for loop');
          }}>
          <Text style={styles.navButtonText}>For Loop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<TestBidirectionalOriginal />);
            setViewTitle('FL Bi-directional');
          }}>
          <Text style={styles.navButtonText}>Bi-direct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            setView(<BufferedCalendarFL />);
            setViewTitle('Buffered calendar with horizontal flat list');
          }}>
          <Text style={styles.navButtonText}>Buffered FL</Text>
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
          // padding: 10,
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

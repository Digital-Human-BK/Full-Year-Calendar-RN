import React from 'react';
import { ScrollView } from 'react-native';

import Calendar from './src/screens/Calendar';

const App = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#ffffff',
      }}>
      <Calendar />
    </ScrollView>
  );
};

export default App;

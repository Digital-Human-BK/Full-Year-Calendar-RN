import React from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const WeekAgenda = () => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <Agenda
      items={{
        [today]: [
          //@ts-ignore
          { name: 'Meeting with John', time: '10:00 AM' },
          { name: 'Lunch with Jane', time: '12:30 PM' },
          { name: 'Presentation', time: '3:00 PM' },
        ],
        [new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0]]: [
          { name: 'Call with Sarah', time: '9:00 AM' },
          { name: 'Review project plan', time: '11:00 AM' },
          { name: 'Team building activity', time: '2:00 PM' },
        ],
        [new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0]]: [
          { name: 'Client meeting', time: '10:00 AM' },
          { name: 'Finalize proposal', time: '1:00 PM' },
          { name: 'Conference call', time: '4:00 PM' },
        ],
      }}
      selected={today}
      //@ts-ignore
      renderItem={({ name, time }) => (
        <View>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text>{time}</Text>
        </View>
      )}
    />
  );
};

export default WeekAgenda;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import Agenda from '../components/Agenda';
import Header from '../components/Header';
import SwipeableItem from '../components/SwipeableItem';

type MonthProps = {
  month: number;
  year: number;
};

// MONTH COMPONENT FROM 'react-native-calendars'
const Month = ({ month, year }: MonthProps) => {
  console.log(year);

  const [selectedDate, setSelectedDate] = useState(
    new Date(year, month, 1).toDateString(),
  );

  const onDateSelect = (date: DateData) => {
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        // CUSTOM DAY COMPONENT IF WE WANT
        // dayComponent={({ date }) => (
        //   <View>
        //     <Text>{date.day}</Text>
        //   </View>
        // )}
        markedDates={{
          '2023-05-16': { selected: true, marked: true },
          '2023-03-17': { marked: true },
          '2023-06-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2023-07-19': { disabled: true, disableTouchEvent: true },
        }}
        onDayPress={onDateSelect}
        hideExtraDays={true}
        hideArrows={true}
        current={selectedDate}
        showWeekNumbers={false}
        showSixWeeks={true}
        monthFormat="MMMM"
        headerStyle={{
          alignItems: 'baseline',
        }}
        hideDayNames={true}
        // firstDay={1}
        style={{
          height: 200,
        }}
        theme={{
          weekVerticalMargin: 0,
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#4286f4',
          selectedDayTextColor: '#fff',
          todayTextColor: '#d60b0b',
          dayTextColor: '#4286f4',
          textDayFontWeight: 'bold',
          textDisabledColor: '#d9e1e8',
          dotColor: '#4286f4',
          selectedDotColor: '#fff',
          arrowColor: '#4286f4',
          monthTextColor: '#4286f4',
          indicatorColor: '#4286f4',
          textDayFontFamily: 'Helvetica Neue',
          textMonthFontFamily: 'Helvetica Neue',
          textDayHeaderFontFamily: 'Helvetica Neue',
          textMonthFontWeight: 'bold',
          textDayFontSize: 10,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 10,
        }}
      />
    </View>
  );
};

const ReactNativeCalendarsComponent = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <SwipeableItem
      onSwipeLeft={() => setYear(prev => prev - 1)}
      onSwipeRight={() => setYear(prev => prev + 1)}>
      <Header year={year} />
      <View
        style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {months.map(month => (
          <Month key={`${year}-${month}`} year={year} month={month} />
        ))}
      </View>
      <Agenda />
    </SwipeableItem>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33%',
    backgroundColor: '#fff',
  },
});

export default ReactNativeCalendarsComponent;

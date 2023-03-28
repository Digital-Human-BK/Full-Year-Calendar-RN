import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import {
  isSameMonth,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import Header from '../components/Header';
import Agenda from '../components/Agenda';
import SwipeableItem from '../components/SwipeableItem';

const color = '#00AFF0';
const { width } = Dimensions.get('screen');

const Week = ({ week, month }: { week: Date; month: Date }) => {
  const days = eachDayOfInterval({
    start: startOfWeek(week),
    end: endOfWeek(week),
  });

  return (
    <View style={styles.weekView}>
      {days.map(day => {
        if (isSameMonth(day, month)) {
          return (
            <Text key={day.getTime()} style={styles.dayText}>
              {day.getDate()}
            </Text>
          );
        } else {
          return <View key={day.getTime()} style={styles.emptyDay} />;
        }
      })}
    </View>
  );
};

const Month = ({ month }: { month: Date }) => {
  const weeks = eachWeekOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  return (
    <View style={styles.monthView}>
      <Text style={styles.monthTitle}>
        {month.toLocaleString('default', { month: 'long' })}
      </Text>
      {weeks.map(week => (
        <Week key={week.getTime()} week={week} month={month} />
      ))}
    </View>
  );
};

const Year = ({ year }: { year: Date }) => {
  const months = useMemo(
    () =>
      eachMonthOfInterval({
        start: startOfYear(year),
        end: endOfYear(year),
      }),
    [year],
  );

  return (
    <View style={styles.yearView}>
      {months.map(month => (
        <Month key={month.getTime()} month={month} />
      ))}
    </View>
  );
};

const CalendarDateFNS = () => {
  const [year, setYear] = useState(new Date());

  const subtractYear = () => {
    setYear(prev => new Date(prev.setFullYear(prev.getFullYear() - 1)));
  };

  const addYear = () => {
    setYear(prev => new Date(prev.setFullYear(prev.getFullYear() + 1)));
  };

  return (
    <SwipeableItem onSwipeLeft={addYear} onSwipeRight={subtractYear}>
      <Header year={year.getFullYear()} />
      <Year year={year} />
      <Agenda />
    </SwipeableItem>
  );
};

export default CalendarDateFNS;

const styles = StyleSheet.create({
  yearView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
  },
  monthView: {
    width: width / 3 - 20,
    marginBottom: 15,
  },
  monthTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: color,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: color,
  },
  emptyDay: {
    flex: 1,
  },
});

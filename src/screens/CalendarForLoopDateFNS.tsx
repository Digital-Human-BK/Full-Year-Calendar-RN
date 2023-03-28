import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import {
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
import Agenda from '../components/Agenda';
import SwipeableItem from '../components/SwipeableItem';
import Header from '../components/Header';

const color = '#00AFF0';
const { width } = Dimensions.get('screen');

const Month = ({ month }: { month: Date }) => {
  const weeks = eachWeekOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month),
  });

  const renderedWeeks = [];
  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i];
    const days = eachDayOfInterval({
      start: startOfWeek(week),
      end: endOfWeek(week),
    });

    const renderedDays = [];
    for (let j = 0; j < days.length; j++) {
      const day = days[j];
      const dayOfMonth = day.getDate();

      // Only render the day if it belongs to the current month
      if (day.getMonth() === month.getMonth()) {
        renderedDays.push(
          <Text key={day.getTime()} style={styles.dayText}>
            {dayOfMonth}
          </Text>,
        );
      } else {
        renderedDays.push(<View key={day.getTime()} style={styles.emptyDay} />);
      }
    }

    renderedWeeks.push(
      <View key={week.getTime()} style={styles.weekView}>
        {renderedDays}
      </View>,
    );
  }

  return (
    <View style={styles.monthView}>
      <Text style={styles.monthTitle}>
        {month.toLocaleString('default', { month: 'long' })}
      </Text>
      {renderedWeeks}
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

  const renderedMonths = [];
  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    renderedMonths.push(<Month key={month.getTime()} month={month} />);
  }

  return <View style={styles.yearView}>{renderedMonths}</View>;
};

const CalendarForLoopDateFNS = () => {
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

export default CalendarForLoopDateFNS;

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

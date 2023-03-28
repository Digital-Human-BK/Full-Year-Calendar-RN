import React, { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  // TouchableOpacity,
  Dimensions,
} from 'react-native';

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
  addYears,
  subYears,
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

  return (
    <View style={styles.yearView}>
      {months.map(month => (
        <Month key={month.getTime()} month={month} />
      ))}
    </View>
  );
};

const BufferedCalendar = () => {
  const [yearIndex, setYearIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date());
  const yearComponents = useMemo(() => {
    return [
      <Year year={subYears(currentYear, 4)} />,
      <Year year={subYears(currentYear, 3)} />,
      <Year year={subYears(currentYear, 2)} />,
      <Year year={subYears(currentYear, 1)} />,
      <Year year={currentYear} />,
      <Year year={addYears(currentYear, 1)} />,
      <Year year={addYears(currentYear, 2)} />,
      <Year year={addYears(currentYear, 3)} />,
      <Year year={addYears(currentYear, 4)} />,
    ];
  }, [currentYear]);

  useEffect(() => {
    if (yearIndex === -5) {
      setCurrentYear(prev => subYears(prev, 5));
      setYearIndex(0);
      return;
    }
    if (yearIndex === 5) {
      setCurrentYear(prev => addYears(prev, 5));
      setYearIndex(0);
      return;
    }
  }, [yearIndex]);

  const subtractYear = () => {
    setYearIndex(prev => prev - 1);
  };

  const addYear = () => {
    setYearIndex(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <SwipeableItem onSwipeLeft={addYear} onSwipeRight={subtractYear}>
        <Header year={currentYear.getFullYear() + yearIndex} />
        {yearComponents[yearIndex + 4]}
        <Agenda />
      </SwipeableItem>
    </View>
  );
};

export default BufferedCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  yearView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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

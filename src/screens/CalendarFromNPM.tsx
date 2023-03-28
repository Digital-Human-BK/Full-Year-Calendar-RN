import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

import { Months } from '../utils';
import Header from '../components/Header';
import Agenda from '../components/Agenda';
import SwipeableItem from '../components/SwipeableItem';

const color = '#00AFF0';
const { width } = Dimensions.get('screen');

// !!!This component is taken from react-full-year-calendar npm package
const CalendarFromNPM = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  const displayCalendar = useCallback((year: number) => {
    let calendarArr = [] as any;
    let startIndex = 0;
    let endIndex = 12;

    for (let i = startIndex; i < endIndex; i++) {
      let startDate = new Date(year, i, 1);
      let endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0,
      );
      const dateArr = [];
      let getWeek: any = '';

      while (startDate <= endDate) {
        let date = new Date(startDate);
        !getWeek && (getWeek = date);
        dateArr.push(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        );
        startDate = new Date(date.setDate(date.getDate() + 1));
      }

      let tempArr =
        getWeek.getDay() !== 0
          ? getWeek.getDay() - 1 === 0
            ? []
            : Array(getWeek.getDay() - 1)
                .join('.')
                .split('.')
          : Array(6).join('.').split('.');

      dateArr.splice(0, 0, ...tempArr);

      let addNElementsToEnd =
        dateArr.length % 7 !== 0
          ? Array(7 - (dateArr.length % 7))
              .join('.')
              .split('.')
          : [];
      dateArr.splice(dateArr.length, 0, ...addNElementsToEnd);

      calendarArr.push({
        label: i < 12 ? Months[i] : Months[i - 12],
        year: i < 12 ? year : year + 1,
        days: dateArr,
        startDay: getWeek.getDay(),
      });
    }
    setCalendarData(calendarArr);
  }, []);

  useEffect(() => {
    displayCalendar(currentYear);
  }, [currentYear, displayCalendar]);

  return (
    <SwipeableItem
      onSwipeLeft={() => setCurrentYear(prev => prev + 1)}
      onSwipeRight={() => setCurrentYear(prev => prev - 1)}>
      <Header year={currentYear} />
      <View style={styles.container}>
        {calendarData.map((month: any) => {
          return (
            <View key={month.label} style={styles.monthContainer}>
              <View key={`${month.label}-head`}>
                <Text style={styles.monthTitle}>{`${month.label}`}</Text>
              </View>
              <View key={`${month.label}`}>
                {month.days
                  .reduce(
                    (acc: any, e: any, i: number) => (
                      // eslint-disable-next-line no-sequences
                      i % 7 ? acc[acc.length - 1].push(e) : acc.push([e]), acc
                    ),
                    [],
                  )
                  .map((set: any, monthVal: number) => {
                    return (
                      <View
                        key={`${month.label}-${monthVal}`}
                        style={{
                          flexDirection: 'row',
                        }}>
                        {set.map((day: string, dayVal: number) => {
                          return (
                            <Text key={dayVal} style={styles.day}>
                              {day.split('-')[2]}
                            </Text>
                          );
                        })}
                      </View>
                    );
                  })}
              </View>
            </View>
          );
        })}
      </View>
      <Agenda />
    </SwipeableItem>
  );
};

export default CalendarFromNPM;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    justifyContent: 'center',
  },
  monthContainer: {
    width: width / 3 - 20,
    marginBottom: 15,
  },
  monthTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: color,
  },
  day: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: color,
  },
});

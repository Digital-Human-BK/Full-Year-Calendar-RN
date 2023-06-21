import React, { useState, useRef, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
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

// import Header from '../components/Header';
import Agenda from '../components/Agenda';

const color = '#00AFF0';

const { width } = Dimensions.get('window');

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

type YearItem = {
  id: string;
  element: Element;
};

const Calendar = () => {
  const currentYear = new Date();
  console.log('New render');

  const [yearsList, setYearsList] = useState<YearItem[]>([
    {
      id: subYears(currentYear, 4).toString(),
      element: <Year year={subYears(currentYear, 4)} />,
    },
    {
      id: subYears(currentYear, 3).toString(),
      element: <Year year={subYears(currentYear, 3)} />,
    },
    {
      id: subYears(currentYear, 2).toString(),
      element: <Year year={subYears(currentYear, 2)} />,
    },
    {
      id: subYears(currentYear, 1).toString(),
      element: <Year year={subYears(currentYear, 1)} />,
    },
    {
      id: currentYear.toString(),
      element: <Year year={currentYear} />,
    },
    {
      id: addYears(currentYear, 1).toString(),
      element: <Year year={addYears(currentYear, 1)} />,
    },
    {
      id: addYears(currentYear, 2).toString(),
      element: <Year year={addYears(currentYear, 2)} />,
    },
    {
      id: addYears(currentYear, 3).toString(),
      element: <Year year={addYears(currentYear, 3)} />,
    },
    {
      id: addYears(currentYear, 4).toString(),
      element: <Year year={addYears(currentYear, 4)} />,
    },
  ]);

  const ref = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    ref?.current?.scrollToIndex({
      animated: false,
      index: index,
    });
  };

  const [visibleItemIndex] = useState(3);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const distanceFromEnd =
      contentSize.width - layoutMeasurement.width - contentOffset.x;

    if (distanceFromEnd < 1) {
      // add more items to the end
      console.log('adding to end');
      setTimeout(() => {
        const lastYearValue = new Date(yearsList[yearsList.length - 1].id);
        setYearsList(currentData => [
          ...currentData,
          {
            id: addYears(lastYearValue, 1).toString(),
            element: <Year year={addYears(lastYearValue, 1)} />,
          },
          {
            id: addYears(lastYearValue, 2).toString(),
            element: <Year year={addYears(lastYearValue, 2)} />,
          },
          {
            id: addYears(lastYearValue, 3).toString(),
            element: <Year year={addYears(lastYearValue, 3)} />,
          },
        ]);
      }, 500);
    } else if (contentOffset.x <= 0) {
      console.log('adding to beginning');

      // add more items to the beginning
      setTimeout(() => {
        const firstYearValue = new Date(yearsList[0].id);
        setYearsList(currentData => [
          {
            id: subYears(firstYearValue, 3).toString(),
            element: <Year year={subYears(firstYearValue, 3)} />,
          },
          {
            id: subYears(firstYearValue, 2).toString(),
            element: <Year year={subYears(firstYearValue, 2)} />,
          },
          {
            id: subYears(firstYearValue, 1).toString(),
            element: <Year year={subYears(firstYearValue, 1)} />,
          },
          ...currentData,
        ]);
        scrollToIndex(3);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Header year={2023} /> */}
      <FlatList
        ref={ref}
        data={yearsList}
        renderItem={({ item }) => (
          <View style={{ width: width, padding: 10 }}>
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {item.id}
              </Text>
              {item.element}
              <Agenda />
            </>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        initialScrollIndex={visibleItemIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        decelerationRate="fast"
      />
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginVertical: 10,
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
    height: 160,
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

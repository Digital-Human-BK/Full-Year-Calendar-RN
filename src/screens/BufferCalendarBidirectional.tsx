import React, { useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
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
  addYears,
  subYears,
} from 'date-fns';

// import Header from '../components/Header';
import Agenda from '../components/Agenda';

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

type YearItem = {
  id: string;
  element: Element;
};

const BufferedCalendar = () => {
  // const [currentYear, setCurrentYear] = useState(new Date());
  // const [yearIndex, setYearIndex] = useState(0);
  const [yearsList, setYearsList] = useState<YearItem[]>([]);

  useEffect(() => {
    const currentYear = new Date();
    const initYearsList = () => {
      setYearsList([
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
    };

    initYearsList();
  }, []);

  const _renderItem = ({ item }: { item: YearItem; index: number }) => {
    return (
      <View style={{ width: width, padding: 10 }}>
        <>
          <Text>{item.id}</Text>
          {item.element}
          <Agenda />
        </>
      </View>
    );
  };

  const generatePrevYears = (): Promise<YearItem[]> => {
    const currentYear = new Date();
    return new Promise(resolve => {
      const prevYearsArray: YearItem[] = [
        {
          id: subYears(currentYear, 8).toString(),
          element: <Year year={subYears(currentYear, 8)} />,
        },
        {
          id: subYears(currentYear, 7).toString(),
          element: <Year year={subYears(currentYear, 7)} />,
        },
        {
          id: subYears(currentYear, 6).toString(),
          element: <Year year={subYears(currentYear, 6)} />,
        },
        {
          id: subYears(currentYear, 5).toString(),
          element: <Year year={subYears(currentYear, 5)} />,
        },
      ];
      resolve(prevYearsArray);
    });
  };

  const generateNextYears = (): Promise<YearItem[]> => {
    const currentYear = new Date();
    return new Promise(resolve => {
      const prevYearsArray: YearItem[] = [
        {
          id: addYears(currentYear, 5).toString(),
          element: <Year year={addYears(currentYear, 5)} />,
        },
        {
          id: addYears(currentYear, 6).toString(),
          element: <Year year={addYears(currentYear, 6)} />,
        },
        {
          id: addYears(currentYear, 7).toString(),
          element: <Year year={addYears(currentYear, 7)} />,
        },
        {
          id: addYears(currentYear, 8).toString(),
          element: <Year year={addYears(currentYear, 8)} />,
        },
      ];
      resolve(prevYearsArray);
    });
  };

  const loadPrevYears = async () => {
    console.log('prev handler fired');

    const prevYears = await generatePrevYears();
    setYearsList(years => [...prevYears, ...years]);
  };

  const loadNextYears = async () => {
    console.log('next handler fired');

    const nextYears = await generateNextYears();
    setYearsList(years => [...years, ...nextYears]);
  };

  return (
    <View style={styles.container}>
      {/* <Header year={2002} /> */}
      <FlatList
        horizontal
        pagingEnabled
        data={yearsList}
        extraData={yearsList}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        showDefaultLoadingIndicators={true}
        onStartReached={loadPrevYears}
        onEndReached={loadNextYears}
      />
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

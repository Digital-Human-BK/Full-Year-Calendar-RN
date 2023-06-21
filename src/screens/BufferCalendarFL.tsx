import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

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

import Header from '../components/Header';
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
  console.log('render');

  const [year, setYear] = useState(new Date().getFullYear());
  // const [yearIndex, setYearIndex] = useState(4);
  // const [currentYear] = useState(new Date());
  const [yearsList, setYearsList] = useState<YearItem[]>([]);

  useEffect(() => {
    const currentYear = new Date();
    const createYearsList = () => {
      return [
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
      ];
    };
    const createdYearsList = createYearsList();
    setYearsList(createdYearsList);
  }, []);
  // const yearComponents = useMemo(() => {
  //   return [
  //     <Year year={subYears(currentYear, 4)} />,
  //     <Year year={subYears(currentYear, 3)} />,
  //     <Year year={subYears(currentYear, 2)} />,
  //     <Year year={subYears(currentYear, 1)} />,
  //     <Year year={currentYear} />,
  //     <Year year={addYears(currentYear, 1)} />,
  //     <Year year={addYears(currentYear, 2)} />,
  //     <Year year={addYears(currentYear, 3)} />,
  //     <Year year={addYears(currentYear, 4)} />,
  //   ];
  // }, [currentYear]);

  const _onViewableItemsChanged = useCallback(({ changed }: any) => {
    console.log('Changed in this iteration', changed);
    if (changed[0].isViewable) {
      setYear(new Date(changed[0].key).getFullYear());
      // if (changed[0].index === 1) {
      //   const currentYear = new Date(changed[0].item.id).getFullYear();
      //   const prependYears = () => {
      //     return [
      //       {
      //         id: subYears(currentYear, 5).toString(),
      //         element: <Year year={subYears(currentYear, 5)} />,
      //       },
      //       {
      //         id: subYears(currentYear, 4).toString(),
      //         element: <Year year={subYears(currentYear, 4)} />,
      //       },
      //       {
      //         id: subYears(currentYear, 3).toString(),
      //         element: <Year year={subYears(currentYear, 3)} />,
      //       },
      //       {
      //         id: subYears(currentYear, 2).toString(),
      //         element: <Year year={subYears(currentYear, 2)} />,
      //       },
      //     ];
      //   };
      //   const yearsToPrepend = prependYears();
      //   setYearsList([...yearsToPrepend, ...yearsList]);
      // }
    }
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 99,
  };

  if (yearsList.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <Header year={currentYear.getFullYear() - (4 - yearIndex)} /> */}
      <Header year={year} />
      <FlatList
        horizontal
        pagingEnabled
        data={yearsList}
        extraData={yearsList}
        initialScrollIndex={4}
        viewabilityConfig={_viewabilityConfig}
        onViewableItemsChanged={_onViewableItemsChanged}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ width: width, padding: 10 }}>
              <>
                {item.element}
                <Agenda />
              </>
            </View>
          );
        }}
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

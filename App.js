/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    return await fetch(
      'https://jobs.github.com/positions.json?description=react&page=1',
    )
      .then((respose) => respose.json())
      .then((resposeJson) => {
        setLoading(false);
        setRecords(resposeJson);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [setRecords]);

  const Loader = () => {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let data = records.map((val, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text>
              title : {val.title} Job Location : {val.location}
            </Text>
          </View>
        );
      });

      return (
        <View style={styles.container}>
          <Text>{data}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingTop: 50,
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default App;

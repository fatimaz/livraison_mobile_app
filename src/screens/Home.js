import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text , TextInput} from 'react-native';
// import { List, Divider } from 'react-native-paper';
import {db} from './firebase';

import Loading from '../components/Loading';
import { ListItem, Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
// import useStatsBar from '../utils/useStatusBar';

export default function Home({ navigation }) {
//   useStatsBar('light-content');

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            // name: '',

            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        // ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen', { thread: item })}
          >
              <Text style={{marginBottom:100}}>jhjhjjhjhjhj</Text>
            <TextInput
              placeholder='{item.name}'
              description='{item.latestMessage.text}'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22,
    color:'red'
  },
  listDescription: {
    fontSize: 16
  }
});
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('./img/rembo.jpg')}
          style={styles.img}
        />
        <View style={styles.textContainer}>
          <Text style={styles.header}>Rembo</Text>
          <Text style={styles.secondHeader}>Last Blood</Text>
        </View>
        <View style={styles.btn}>
          <Button
            title={subscribed ? 'Unsubscribe' : 'Subscribe'}
            onPress={() => setSubscribed(!subscribed)}
            color={subscribed ? 'red' : 'blue'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '90%',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: '5%', 
    height: 90,
    shadowColor: '#000', 
    elevation: 5,
},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    borderRadius: 50,
    height: 60,
    width: 60,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondHeader: {
    fontSize: 16,
    color: 'gray',
  },
  btn: {
    width: 120,
    marginLeft: 70,
    borderRadius: 25,
    overflow: 'hidden', 
  },
});

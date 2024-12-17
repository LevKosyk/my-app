import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [subscribed, setSubscribed] = useState(false);
  const [data, setData] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')

  const addUser = () => {
    const newData = [
      ...data, 
      {
        id: data.length + 1,
        name: name,
        description: description,
        img: img,
        subscribed: false
      }
    ];
    setData(newData);  
  }

  const toggleSubscription = (id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, subscribed: !item.subscribed };
      }
      return item;
    });
    setData(newData);
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Enter name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.title}>Enter description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.title}>Enter img source:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter img"
          value={img}
          onChangeText={setImg}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={addUser}>
          <Text style={styles.btnText}>Add user</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.card}>
              <Image
                source={{ uri: item.img }}  
                style={styles.img}
              />
              <View>
                <Text style={styles.header}>{item.name}</Text>
                <Text style={styles.secondHeader}>{item.description}</Text>
              </View>
              <View style={styles.btn}>
                <Button
                  title={item.subscribed ? 'Unsubscribe' : 'Subscribe'}
                  onPress={() => toggleSubscription(item.id)} 
                  color={item.subscribed ? 'red' : 'blue'}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '90%',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: '5%',
    height: '92%',
    shadowColor: '#000',
    elevation: 5,
  },
  form: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
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
    marginLeft: 'auto',  
    borderRadius: 25,
    overflow: 'hidden',
    width: 110,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 14,
    marginBottom: 8,
  },
  btnAdd: {
    backgroundColor: '#007bff',  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',  
    marginBottom: 20,
  },
});

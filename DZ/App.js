import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [combWin, setCombWin] = useState([]);
  const [isXNext, setIsXNext] = useState(true);
  const [steps, setSteps] = useState([]);
  const [Xcount, setXCount] = useState(0);
  const [Ocount, setOCount] = useState(0);

  const calculateWinner = useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === 'X') {
          setXCount((prevCount) => prevCount + 1);
        } else {
          setOCount((prevCount) => prevCount + 1);
        }
        setCombWin(lines[i]);
        return board[a];
      }
    }
    return null;
  }, [board]);

  const winner = calculateWinner



  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setSteps([...steps, index])
  }

  const cleatAll = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setSteps([]);
    setCombWin([]);
  }

  const handleStepBack = () => {
    if (winner) {
      return;
    }
    const newBoard = board.slice();
    const newSteps = [...steps];
    newSteps.pop(); 
    newBoard[steps[steps.length - 1]] = null;
    setBoard(newBoard)
    setSteps(newSteps);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Хрестики-Нулики</Text>
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              combWin.includes(index) && { backgroundColor: 'aqua' }
            ]}
            onPress={() => handleClick(index)}
          >
            <Text style={styles.cellText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {winner
        ? (
          <View style={styles.count}>
            <Text>{winner} виграв!</Text>
          </View>)
        : (
          <Text style={styles.count}>
            Черга гравця: {isXNext ? 'Хрестики (Х)' : 'Нулики(O)'}
          </Text>)}
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btn} onPress={cleatAll}>
          <Text style={styles.btnText}>Сброс</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleStepBack}>
          <Text style={styles.btnText}>← Назад</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnGroup} ><Text style={styles.count}>(X) {Xcount}:{Ocount} (O)</Text></View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#ccbaba'
  },
  cellText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 20
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  count: {
    fontSize: 20,
    color: '#666',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});
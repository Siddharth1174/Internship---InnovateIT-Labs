import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';


const NewScreen = ({ navigation }: { navigation: any }) => {


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>New Screen</Text>

     
      <TextInput placeholder='Full Name'
        style={styles.inputs} />
      <TextInput placeholder='Email' style={styles.inputs} />
      <TextInput placeholder='Password' secureTextEntry={true} style={styles.inputs} />
      <Text style={styles.description}>
        This is just a new screen for Practicing purpose This is just a new screen for Practicing purposeThis is just a new screen for Practicing purposeThis is just a new screen for Practicing purpose
      </Text>

      <Text style={styles.footer}>
        All rights reserved &copy;
      </Text>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
    alignSelf: 'center',
  },
  footer: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: "#555",
  },
  inputs: {
    padding:20,
    backgroundColor: "white",
    marginHorizontal: 50,
    marginVertical: 10
  }
});


export default NewScreen;

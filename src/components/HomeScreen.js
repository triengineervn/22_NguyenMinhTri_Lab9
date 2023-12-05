import { connect } from "react-redux";
import {
  addNote,
  updateNote,
  deleteNote,
  loadNotes,
} from "../redux/todolist/actions";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = ({
  navigation,
  user,
  addNote,
  updateNote,
  deleteNote,
  loadNotes,
}) => {
  const [data, setData] = useState([]);
  const [note, setNote] = useState("");
  const [index, setIndex] = useState(-1);
  const apiUrl = "https://653f42fc9e8bd3be29e020f0.mockapi.io/api/v1/users";

  const handleAddNote = async () => {
    if (note) {
      if (index !== -1) {
        fetch(`${apiUrl}/${user.id}/notes/${index}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: note }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((updatednote) => {
            const newData = data.map((item) => {
              if (item.id === updatednote.id) {
                item.note = updatednote.note;
              }
              return item;
            });
            setData(newData);
            setIndex(-1);
          })
          .catch((error) => {
            console.log(error);
          });
        updateNote(index, note);
      } else {
        await fetch(`${apiUrl}/${user.id}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: note }),
        })
          .then((response) => response.json())
          .then((json) => {
            setData([...data, json]);
          })
          .catch((error) => console.error(error));
        addNote(json);
      }
      setNote("");
    }
  };
  console.log(user.id);

  const handleDeleteNote = async (id) => {
    await fetch(`${apiUrl}/${user.id}/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      })
      .catch((error) => console.error(error));
    deleteNote(id);
  };

  const handleEditNote = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${user.id}/notes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch note for editing");
      }

      const { note } = await response.json();
      setNote(note);
      setIndex(id);

      // Dispatch the existing action to update the Redux state
      updateNote(id, note);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`${apiUrl}/${user.id}/notes`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
    loadNotes(data);
  }, [data]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.note}</Text>
      <View style={styles.item}>
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={() => handleEditNote(item.id)}
        >
          <AntDesign name="edit" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.background}>
      <Text style={[styles.title, { color: "#F1B000" }]}>
        Welcome, {user ? user.username : "Guest"}!
      </Text>
      <Text style={styles.title}>Note App</Text>
      <TextInput
        label="Add Note"
        mode="outlined"
        textColor="black"
        onChangeText={(text) => {
          setNote(text);
        }}
        value={note}
        theme={styles.textInputOutlineStyle}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleAddNote()}>
        <Text style={styles.textBtn}>
          {index !== -1 ? "Update Note" : "Add Note"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textBtn}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  notes: state.notes.notes,
});

const mapDispatchToProps = {
  addNote,
  updateNote,
  deleteNote,
  loadNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    margin: 12,
    fontSize: 24,
    fontWeight: 700,
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 700,
  },
  textInput: {
    marginBottom: 8,
    width: 300,
    borderRadius: 3,
  },
  textInputOutlineStyle: {
    colors: {
      primary: "#F1B000",
      underlineColor: "transparent",
      background: "white",
    },
  },
  button: {
    alignItems: "center",
    padding: 12,
    margin: 12,
    width: 300,
    backgroundColor: "#F1B000",
    borderRadius: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
    alignItems: "center",
  },
});

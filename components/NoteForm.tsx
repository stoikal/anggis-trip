import React from "react";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { Note } from "@/types";

type NoteFormProps = {
  onSubmit: (note: Note) => void;
  onCancel: () => void;
}

export default function NoteForm (props: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const submit = async () => {
    setTitle("");
    setContent("");
    props.onSubmit({ title, content});
  }

  const cancel = () => {
    setTitle("");
    setContent("");
    props.onCancel();
  }

  return (
    <>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        cursorColor="plum"
        selectionColor="plum"
        outlineColor="white"
        activeOutlineColor="white"
        mode="outlined"
      />
      <TextInput
        mode="outlined"
        cursorColor="plum"
        selectionColor="plum"
        outlineColor="white"
        activeOutlineColor="white"
        multiline
        placeholder="Note"
        value={content}
        onChangeText={setContent}
        // numberOfLines={10}
        style={{
          height: 376, //392 Adjust the height as needed
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1}}>
          <Button onPress={cancel} style={{ borderRadius: 0 }}>
            <Text>Cancel</Text>
          </Button>
        </View>
        <View style={{ flex: 1 }}>

          <Button onPress={submit} style={{ borderRadius: 0 }}>
            <Text>Save</Text>
          </Button>
        </View>
      </View>
    </>
  )
}
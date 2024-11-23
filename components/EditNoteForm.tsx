import React from "react";
import { useState } from "react";
import { Button, Dialog, IconButton, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { Note } from "@/types";

type EditNoteFormProps = {
  initialData?: Note;
  onSubmit: (note: Note) => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function EditNoteForm (props: EditNoteFormProps) {
  const [title, setTitle] = useState(props.initialData?.title || "");
  const [content, setContent] = useState(props.initialData?.content || "");

  const submit = async () => {
    props.onSubmit({ title, content});
    setTitle("");
    setContent("");
  }

  const cancel = () => {
    props.onCancel();
    setTitle("");
    setContent("");
  }

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const hideDeleteDialog = () => {
    setIsDeleteDialogVisible(false);
  }

  const deleteNote = () => {
    hideDeleteDialog();
    props.onDelete();
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
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
        </View>
        <View style={{ padding: 8 }}>
          <IconButton icon="delete" size={24} onPress={() => setIsDeleteDialogVisible(true)} />
        </View>
      </View>
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

      <Dialog visible={isDeleteDialogVisible} onDismiss={hideDeleteDialog}>
        <Dialog.Title>Delete</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Are you sure you want to delete this item?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDeleteDialog}>Cancel</Button>
          <Button
            mode="contained"
            onPress={deleteNote}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
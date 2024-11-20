import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type Note = {
  title: string;
  content: string;
}

export default function useNotes (date: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem(date as string)
        if (!value) {
          return
        }
        setNotes(JSON.parse(value))
      } catch (error) {
        console.error(`useAsyncStorage getItem error:`, error);
      }
    }
    setNotes([]);
    fetchData();
  }, [date]);

  const pushNote = async (note: Note) => {
    try {
      const newNotes = [
        ...notes,
        note
      ]
      await AsyncStorage.setItem(date as string, JSON.stringify(newNotes))
      setNotes(newNotes)
    } catch (error) {
      console.error(`useAsyncStorage setItem error:`, error)
    }
  }

  const deleteByIndex = async (index: number) => {
    try {
      const newNotes = [
        ...notes.slice(0, index),
        ...notes.slice(index + 1),
      ];
      await AsyncStorage.setItem(date as string, JSON.stringify(newNotes))
      setNotes(newNotes)
    } catch (error) {
      console.error(`useAsyncStorage setItem error:`, error)
    }
  }

  const updateByIndex = async (index: number, note: Note) => {
    try {
      const newNotes = [
        ...notes.slice(0, index),
        note,
        ...notes.slice(index + 1),
      ];
      await AsyncStorage.setItem(date as string, JSON.stringify(newNotes))
      setNotes(newNotes)
    } catch (error) {
      console.error(`useAsyncStorage setItem error:`, error)
    }
  }

  return {
    notes,
    pushNote,
    deleteByIndex,
    updateByIndex
  }
}
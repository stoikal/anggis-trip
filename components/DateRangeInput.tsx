import DateTimePicker from 'react-native-ui-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import { Keyboard, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';

export type DateRange = {
  start: string;
  end: string;
}

type DateRangeInputProps = {
  value: DateRange;
  onChange: (e: DateRange) => void;
}


export default function DateRangeInput(props: DateRangeInputProps) {
  const [startDate, setStartDate] = useState(dayjs(props.value.start));
  const [endDate, setEndDate] = useState(dayjs(props.value.end));

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const cancel = () => {
    Keyboard.dismiss()
    setStartDate(dayjs(props.value.start));
    setEndDate(dayjs(props.value.end));

    closeModal();
  }

  const submit = () => {
    Keyboard.dismiss()
    props.onChange({
      start: startDate.format("YYYY-MM-DD"),
      end: endDate.format("YYYY-MM-DD")
    })

    closeModal();
  }

  const value = (() => {
    const start = dayjs(props.value.start).format("D MMM YYYY");
    const end = dayjs(props.value.end).format("D MMM YYYY");
    return `${start} – ${end}`;
  })();

  const isSubmitDisabled = !startDate || !endDate;

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Date Range"
        value={value}
        onPress={openModal}
        style={{ backgroundColor: "transparent"}}
      />

      <Portal>
        <Modal
          visible={isModalVisible}
          dismissable={false}
          contentContainerStyle={{ backgroundColor: "white", width: "90%", marginHorizontal: "auto"}}
        >
          <View
            style={{ backgroundColor: "white", padding: 16 }}
          >
            <DateTimePicker
              mode="range"
              startDate={startDate}
              endDate={endDate}
              onChange={({ startDate, endDate }) => {
                setStartDate(startDate as Dayjs);
                setEndDate(endDate as Dayjs);
              }}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1}}>
              <Button onPress={cancel} style={{ borderRadius: 0 }}>
                <Text>Cancel</Text>
              </Button>
            </View>
            <View style={{ flex: 1 }}>

              <Button
                disabled={isSubmitDisabled}
                onPress={submit}
                style={{ borderRadius: 0 }}
              >
                <Text
                  style={{
                    color: isSubmitDisabled ? "gray" : "black"
                  }}
                >
                  Save
                </Text>
              </Button>
            </View>
      </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
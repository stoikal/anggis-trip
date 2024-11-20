import React from 'react';
import { FAB } from 'react-native-paper';

type AgendaFabProps = {
  onPressNote: () => void;
  onPressExpense: () => void;
}

export default function AgendaFab (props: AgendaFabProps) {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    // <PaperProvider>
    //   <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'note',
              label: 'Note',
              onPress: props.onPressNote,
            },
            {
              icon: 'currency-jpy',
              label: 'Expense',
              onPress: props.onPressExpense,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
    //   </Portal> 
    // </PaperProvider>
  );
};

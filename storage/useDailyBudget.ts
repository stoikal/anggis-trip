import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export type Budget = {
  date: string;
  amount: number;
}

export default function useDailyBudget (date: string) {
  const [amount, setAmount] = useState(0);

  const db = useSQLiteContext();

  const load = async () => {
    try {
      const item = await db.getFirstAsync<Budget>("SELECT * FROM daily_budget WHERE date IS ?", date);

      setAmount(item?.amount || 0);
    } catch (e) {
      console.log('===~error~===', '👀', e);
    }
  }

  const set = async (amt: number) => {
    try {
      await db.runAsync('INSERT INTO daily_budget (date, amount) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET amount = excluded.amount', date, amt);
      await load();
    } catch (e) {
      console.log('===~error creating expense~===', '👀', e);
    }
  }

  useEffect(() => {
    load()
  }, [date])

  return {
    amount,
    set,
  }
}
// import useDayExpenses from "@/storage/useDayExpenses";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export type Expense = {
  id: number;
  name: string;
  date: string;
  amount: number;
  category: string;
}


type DayExpensesContextType = {
  expenses: Expense[];
  setExpenses: (e: Expense[]) => void;
}

const DayExpensesContext = createContext<DayExpensesContextType | null>(null);

export const DayExpensesProvider = (props: React.PropsWithChildren) => {
  // const expenses = useDayExpenses()
  const [expenses, setExpenses] = useState<Expense[]>([]);
  return (
    <DayExpensesContext.Provider value={{ expenses, setExpenses }}>
      {props.children}
    </DayExpensesContext.Provider>
  )
}

export const useDayExpenses = (date: string) => {
  const db = useSQLiteContext();
  const ctx = useContext(DayExpensesContext);

  const loadExpenses = useCallback(async (date: string) => {
    try {
      const result = await db.getAllAsync<Expense>("SELECT * FROM expenses WHERE date IS ?", date);

      ctx?.setExpenses(result);
    } catch (e) {
      console.log('===~error~===', '👀', e);
    }
  }, [])

  const createExpense = useCallback(async (e: Omit<Expense, 'id' | 'date'>) => {
    try {
      const expense = [date, e.name, e.category, e.amount];
      await db.runAsync('INSERT INTO expenses (date, name, category, amount) VALUES (?, ?, ?, ?)', ...expense);
      await loadExpenses(date);
    } catch (e) {
      console.log('===~error creating expense~===', '👀', e);
    }
  }, [date])

  useEffect(() => {
    ctx?.setExpenses([]);
    if (date) loadExpenses(date);
  }, [date, loadExpenses]);

  return {
    data: ctx?.expenses || [],
    createExpense
  }
}


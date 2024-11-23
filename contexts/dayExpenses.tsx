// import useDayExpenses from "@/storage/useDayExpenses";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Expense } from "@/types";

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

  const create = useCallback(async (e: Omit<Expense, 'id' | 'date'>) => {
    try {
      const expense = [date, e.name, e.category, e.amount];
      await db.runAsync('INSERT INTO expenses (date, name, category, amount) VALUES (?, ?, ?, ?)', ...expense);
      await loadExpenses(date);
    } catch (e) {
      console.log('===~error creating expense~===', '👀', e);
    }
  }, [date])

  const update = useCallback(async (e: Expense) => {
    try {
      await db.runAsync('UPDATE expenses SET name = ?, category = ?, amount = ? WHERE id = ?', e.name, e.category, e.amount, e.id);
      await loadExpenses(date);
    } catch (e) {
      console.log('===~error updating expense~===', '👀', e);
    }
  }, [date])

  const deleteById = useCallback(async (id: number) => {
    try {
      await db.runAsync('DELETE FROM expenses WHERE id = ?', id);
      await loadExpenses(date);
    } catch (e) {
      console.log('===~error updating expense~===', '👀', e);
    }
  }, [date])

  useEffect(() => {
    // ctx?.setExpenses([]);
    if (date) loadExpenses(date);
  }, [date, loadExpenses]);

  return {
    data: ctx?.expenses || [],
    create,
    update,
    deleteById,
  }
}

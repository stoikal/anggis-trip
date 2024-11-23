import { Budget, Expense } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useMemo, useState } from "react";

enum Status {
  Idle,
  Loading,
  Success,
  Error,
}

export type DailyData = {
  budget: number;
  expenses: Expense[];
}

export type UseExpensesData = {
  [key: string]: DailyData
}

export default function useExpenses () {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [status, setStatus] = useState<Status>(Status.Idle);

  const db = useSQLiteContext();

  const loadRange = async (from: string, to: string) => {
    try {
      setStatus(Status.Loading);
  
      const expenseItems = await db.getAllAsync<Expense>(
        "SELECT * FROM expenses WHERE date BETWEEN ? AND ?",
        [from, to]
      );

      const budgetItems = await db.getAllAsync<Expense>(
        "SELECT * FROM daily_budget WHERE date BETWEEN ? AND ?",
        [from, to]
      );

      setExpenses(expenseItems);
      setBudgets(budgetItems);
      setStatus(Status.Success)
    } catch (e) {
      console.log('===~error~===', '👀', e);
      setStatus(Status.Error)
    }
  }

  const data = useMemo<UseExpensesData>(() => {
    const result: UseExpensesData = {};

    const getInitialDaily = () => ({
      budget: 0,
      expenses: [],
    })
    
    expenses.forEach((e) => {
      if (!result[e.date]) {
        result[e.date] = getInitialDaily();
      }

      result[e.date].expenses.push(e);
    })
  
    budgets.forEach((b) => {
      if (!result[b.date]) {
        result[b.date] = getInitialDaily();
      }
    
      result[b.date].budget = b.amount;
    })


    return result
  }, [budgets, expenses])

  return {
    data,
    status,
    loadRange,
    isSuccess: status === Status.Success,
    isError: status === Status.Error,
    isLoading: status === Status.Loading,
  }
}

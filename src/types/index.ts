export type Expense = {
    id:string
    expenseAmount:number
    expenseCategory:string
    expenseDate:Date
    expenseDescription:string
}

export type DraftExpense = Omit<Expense, 'id'>

export type Category = {
    id:string
    name:string
    icon:string
}
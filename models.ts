class Expense {
  id: string;
  date: string;
  name: string;
  amount: number;

  constructor({
    date,
    name,
    amount,
  }: {
    date: string;
    name: string;
    amount: number;
  }) {
    this.id = Math.floor(Math.random() * 10000).toString();
    this.date = date;
    this.name = name;
    this.amount = amount;
  }
}

export { Expense }
class Expense {
  id: string;
  date: string;
  name: string;
  amount: number;

  constructor({
    date,
    name,
    amount,
    id
  }: {
    date: string | Date;
    name: string;
    amount: number;
    id?: string | undefined
  }) {
    if (!id) {
      this.id = Math.floor(Math.random() * 10000).toString();
    } else {
      this.id = id
    }
    if (date instanceof Date) {
      this.date = date.toISOString().split("T")[0]
    } else {
      this.date = date
    }
    this.name = name;
    this.amount = amount;
  }
}

export { Expense }
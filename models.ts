class Expense {
  id: string;
  date: Date;
  name: string;
  amount: number;

  constructor({
    date,
    name,
    amount,
    id
  }: {
    date: Date;
    name: string;
    amount: number;
    id?: string | undefined
  }) {
    if (!id) {
      this.id = Math.floor(Math.random() * 10000).toString();
    } else {
      this.id = id
    }
    this.date = date
    this.name = name;
    this.amount = amount;
  }
}

export { Expense }
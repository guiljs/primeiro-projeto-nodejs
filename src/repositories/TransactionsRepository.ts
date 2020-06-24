import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(item => {
        return item.type === 'income';
      })
      .map(transaction => {
        return transaction.value;
      })
      .reduce((prev, cur) => {
        return prev + cur;
      }, 0);

    const outcome = this.transactions
      .filter(item => {
        return item.type === 'outcome';
      })
      .map(transaction => {
        return transaction.value;
      })
      .reduce((prev, cur) => {
        return prev + cur;
      }, 0);
    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

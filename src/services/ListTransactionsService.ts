import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionsAndBalance {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class ListTransactionsService {
  private transactionRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): TransactionsAndBalance {
    const transactions = this.transactionRepository.all();

    const incomeTotal = transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        return total + transaction.value;
      }
      return total;
    }, 0);

    const outcomeTotal = transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        return total + transaction.value;
      }
      return total;
    }, 0);

    const transactionsAndBalance = {
      transactions,
      balance: {
        income: incomeTotal,
        outcome: outcomeTotal,
        total: incomeTotal - outcomeTotal,
      },
    };

    return transactionsAndBalance;
  }
}

export default ListTransactionsService;

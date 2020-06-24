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

    const balance = this.transactionRepository.getBalance();

    const transactionsAndBalance = {
      transactions,
      balance,
    };

    return transactionsAndBalance;
  }
}

export default ListTransactionsService;

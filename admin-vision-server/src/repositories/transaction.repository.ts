import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources';
import {
  Transaction,
  TransactionWithRelations,
  TransactionItem,
} from '../models';
import {TransactionItemRepository} from './transaction-item.repository';

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.id,
  TransactionWithRelations
> {
  public readonly transactionItems: HasManyRepositoryFactory<
    TransactionItem,
    typeof Transaction.prototype.id
  >;
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
    @repository.getter('TransactionItemRepository')
    protected transactionItemRepositoryGetter: Getter<TransactionItemRepository>,
  ) {
    super(Transaction, dataSource);
    this.transactionItems = this.createHasManyRepositoryFactoryFor(
      'transactionItems',
      transactionItemRepositoryGetter,
    );
    this.registerInclusionResolver(
      'transactionItems',
      this.transactionItems.inclusionResolver,
    );
  }
}

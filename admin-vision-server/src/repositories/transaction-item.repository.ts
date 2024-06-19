import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources';
import {
  TransactionItem,
  TransactionItemRelations,
  Item,
  Transaction,
} from '../models';
import {TransactionRepository} from './transaction.repository';
import {ItemRepository} from './item.repository';

export class TransactionItemRepository extends DefaultCrudRepository<
  TransactionItem,
  typeof TransactionItem.prototype.id,
  TransactionItemRelations
> {
  public readonly transaction: BelongsToAccessor<
    Transaction,
    typeof TransactionItem.prototype.id
  >;
  public readonly item: BelongsToAccessor<
    Item,
    typeof TransactionItem.prototype.id
  >;

  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
    @repository.getter('TransactionRepository')
    protected transactionRepositoryGetter: Getter<TransactionRepository>,
    @repository.getter('ItemRepository')
    protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(TransactionItem, dataSource);
    this.transaction = this.createBelongsToAccessorFor(
      'transaction',
      transactionRepositoryGetter,
    );
    this.registerInclusionResolver(
      'transaction',
      this.transaction.inclusionResolver,
    );

    this.item = this.createBelongsToAccessorFor('item', itemRepositoryGetter);
    this.registerInclusionResolver('item', this.item.inclusionResolver);
  }
}

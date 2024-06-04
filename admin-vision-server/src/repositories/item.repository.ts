import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources'
import {Item, ItemRelations} from '../models';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
  ) {
    super(Item, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources';
import {CartItems, CartItemsRelations} from '../models';

export class CartItemRepository extends DefaultCrudRepository<
  CartItems,
  typeof CartItems.prototype.id,
  CartItemsRelations
> {
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
  ) {
    super(CartItems, dataSource);
  }
}

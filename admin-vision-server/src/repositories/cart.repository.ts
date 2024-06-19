import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources';
import {Carts, CartsRelations} from '../models';

export class CartRepository extends DefaultCrudRepository<
  Carts,
  typeof Carts.prototype.id,
  CartsRelations
> {
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
  ) {
    super(Carts, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources'
import {Conversions, ConversionsRelations} from '../models';

export class ConversionRepository extends DefaultCrudRepository<
  Conversions,
  typeof Conversions.prototype.id,
  ConversionsRelations
> {
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
  ) {
    super(Conversions, dataSource);
  }
}

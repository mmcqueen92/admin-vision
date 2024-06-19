import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources';
import {TrafficSources, TrafficSourcesRelations} from '../models';

export class TrafficSourceRepository extends DefaultCrudRepository<
  TrafficSources,
  typeof TrafficSources.prototype.id,
  TrafficSourcesRelations
> {
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
  ) {
    super(TrafficSources, dataSource);
  }
}

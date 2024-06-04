import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import { AdminVisionMySqlDataSource } from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.adminVisionMySql')
    dataSource: AdminVisionMySqlDataSource,
  ) {
    super(User, dataSource);
  }
}

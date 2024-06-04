import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';
dotenv.config();

let singletonInstance: AdminVisionMySqlDataSource | null = null;

const config = {
  name: process.env.DB_NAME,
  connector: 'mysql',
  url: '',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DB,
  connectTimeout: 10000, // 10 seconds
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited number of queued connection requests
  waitForConnections: true, // Wait for connections when pool is full
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AdminVisionMySqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'adminVisionMySQL';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.adminVisionMySQL', {optional: true})
    dsConfig: object = config,
  ) {
    if (singletonInstance) {
      return singletonInstance;
    }
    super(dsConfig);
    singletonInstance = this;
  }
}

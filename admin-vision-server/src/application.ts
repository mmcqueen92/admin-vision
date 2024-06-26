import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
// import {TransactionService} from './repositories/transaction.service.repository';
import {AdminVisionMySqlDataSource} from './datasources';
import dotenv from 'dotenv';
dotenv.config();
export {ApplicationConfig};

export class AdminVisionServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.bind('datasources.config.adminVisionMySql').to({
      name: process.env.DB_NAME,
      connector: 'mysql',
      url: '',
      host: process.env.DDB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
    });
    this.bind('datasources.adminVisionMySql').toClass(
      AdminVisionMySqlDataSource,
    );

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    // this.bind('services.TransactionService').toClass(TransactionService);
    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}

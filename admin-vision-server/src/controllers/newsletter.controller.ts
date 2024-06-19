// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {UserRepository, ItemRepository} from '../repositories';
import {Item, User} from '../models';
import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export class NewsletterController {
  private transporter: nodemailer.Transporter;
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(ItemRepository) public itemRepository: ItemRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  @post('/send-newsletter')
  @response(200, {
    description: 'Send newsletter',
    content: {
      'application/json': {
        schema: {
          message: 'Newsletter sent successfully',
          sentTo: ['email1', 'email2'],
        },
      },
    },
  })
  @response(500, {
    description: 'Internal Server Error',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async sendNewsletter(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['message', 'subject'],
            properties: {
              message: {type: 'string'},
              subject: {type: 'string'},
            },
          },
        },
      },
    })
    request: {
      message: string;
      subject: string;
    },
  ) {
    try {
      console.log('MESSAGE: ', request.message);
      const subscribedUsers: User[] = await this.userRepository.find({
        where: {
          optIn: true,
        },
      });

      const sentTo: string[] = [];

      const templatePath = path.join(
        __dirname,
        '../../src/templates/newsletter-template.html',
      );
      const source = fs.readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(source);

      for (const user of subscribedUsers) {
        if (user.preferredCategories) {
          const prefCat = JSON.parse(user.preferredCategories);
          console.log('PREF CAT: ', prefCat);
          const filter = {
            where: {
              category: {inq: prefCat},
              onSale: true,
            },
          };

          const items: Item[] = await this.itemRepository.find(filter);
          console.log('Items for user', user.email, items);

          const emailContent = template({
            subject: request.subject,
            message: request.message,
            items: items,
          });

          await this.transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: request.subject,
            html: emailContent,
            attachments: [
              {
                filename: 'email-banner.png',
                path: path.join(__dirname, '../../src/assets/email-banner.png'),
                cid: 'logo',
              },
            ],
          });

          // Simulate sending the newsletter
          sentTo.push(user.email);
          // At this point, you have all the items for the user in the items array
        }
      }
      return {
        message: 'Newsletter sent successfully',
        sentTo: sentTo,
      };
    } catch (e) {
      console.error(e);
    }
  }
}

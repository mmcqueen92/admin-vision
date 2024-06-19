import {repository} from '@loopback/repository';
import {get, param, response, getModelSchemaRef} from '@loopback/rest';
import {
  UserRepository,
  ItemRepository,
  TransactionRepository,
  TransactionItemRepository,
  ConversionRepository,
  TrafficSourceRepository,
  CartRepository,
  CartItemRepository,
  AnalyticsRepository,
} from '../repositories';
import {TrafficSources, Item} from '../models';

export class AnalyticsController {
  constructor(
    @repository(AnalyticsRepository)
    public analyticsRepository: AnalyticsRepository,
    @repository(TrafficSourceRepository)
    public trafficSourceRepository: TrafficSourceRepository,
  ) {}

  // Define your custom routes here
  @get('/analytics/bestSellingItems')
  @response(200, {
    description: 'Array of best selling items',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              itemId: {type: 'number'},
              itemName: {type: 'string'},
              totalQuantitySold: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async bestSellingItems(): Promise<any> {
    return this.analyticsRepository.findBestSellingItems();
  }

  @get('/analytics/monthlySalesRevenue')
  @response(200, {
    description: 'Monthly sales revenue data',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {type: 'string'},
              totalSales: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async monthlySalesRevenue(): Promise<any> {
    return this.analyticsRepository.findMonthlySalesRevenue();
  }

  @get('/analytics/conversionRates')
  @response(200, {
    description: 'Conversion rate percentage',
    content: {
      'application/json': {
        schema: {
          type: 'number',
        },
      },
    },
  })
  async conversionRates(): Promise<any> {
    return this.analyticsRepository.findConversionRate();
  }

  @get('/analytics/monthlyConversionRates')
  @response(200, {
    description: 'Monthly conversion rates',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {
                type: 'string',
                description: 'Month in the format YYYY-MM',
              },
              conversionRate: {
                type: 'number',
                description: 'Conversion rate for the month',
              },
            },
            required: ['month', 'conversionRate'],
          },
        },
      },
    },
  })
  async findMonthlyConversionRates(): Promise<
    {month: string; conversionRate: number}[]
  > {
    return this.analyticsRepository.findMonthlyConversionRates();
  }

  @get('/analytics/cartAbandonmentRate')
  @response(200, {
    description: 'Cart abandonment rate percentage',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            abandonmentRate: {type: 'number'},
          },
        },
      },
    },
  })
  async cartAbandonmentRate(): Promise<any> {
    return this.analyticsRepository.findCartAbandonmentRate();
  }

  @get('/analytics/trafficSources')
  @response(200, {
    description: 'Traffic sources data',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TrafficSources),
        },
      },
    },
  })
  async trafficSources(): Promise<any> {
    return this.trafficSourceRepository.find();
  }

  @get('/analytics/customerRetention')
  @response(200, {
    description: 'Customer retention rate percentage',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            retentionRate: {type: 'number'},
          },
        },
      },
    },
  })
  async customerRetention(): Promise<any> {
    return this.analyticsRepository.findCustomerRetentionRate();
  }

  @get('/analytics/customerRetentionMonthly')
  @response(200, {
    description: 'Array of monthly customer retention rates',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {type: 'string'},
              retentionRate: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async customerRetentionMonthly(): Promise<any> {
    return this.analyticsRepository.findMonthlyCustomerRetentionRates();
  }

  @get('/analytics/averageOrderValue')
  @response(200, {
    description: 'Average order value',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            averageOrderValue: {type: 'number'},
          },
        },
      },
    },
  })
  async averageOrderValue(): Promise<any> {
    return this.analyticsRepository.findAverageOrderValue();
  }

  @get('/analytics/averageOrderValueByMonth')
  @response(200, {
    description: 'Average order value by month',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {
                type: 'string',
                description: 'Month in the format YYYY-MM',
              },
              averageOrderValue: {
                type: 'number',
                description: 'Average order value for the month',
              },
            },
            required: ['month', 'averageOrderValue'],
          },
        },
      },
    },
  })
  async averageOrderValueByMonth(): Promise<
    {month: string; averageOrderValue: number}[]
  > {
    return this.analyticsRepository.findAverageOrderValueByMonth();
  }

  @get('/analytics/newUsersByMonth')
  @response(200, {
    description: 'New users created by month',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              month: {
                type: 'string',
                description: 'Month in the format YYYY-MM',
              },
              newUserCount: {
                type: 'number',
                description: 'Number of new users created for the month',
              },
            },
            required: ['month', 'newUserCount'],
          },
        },
      },
    },
  })
  async newUsersByMonth(): Promise<{month: string; newUserCount: number}[]> {
    return this.analyticsRepository.findNewUsersByMonth();
  }

  @get('/analytics/customerDemographics')
  @response(200, {
    description: 'Customer demographics data',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            genderDistribution: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  gender: {type: 'string'},
                  count: {type: 'number'},
                },
              },
            },
            ageDistribution: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  age_group: {type: 'string'},
                  count: {type: 'number'},
                },
              },
            },
            locationDistribution: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  location: {type: 'string'},
                  count: {type: 'number'},
                },
              },
            },
          },
        },
      },
    },
  })
  async customerDemographics(): Promise<any> {
    return this.analyticsRepository.findCustomerDemographics();
  }

  @get('/analytics/productPerformance')
  @response(200, {
    description: 'Product performance data',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            salesTrends: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  month: {type: 'string'},
                  salesCount: {type: 'number'},
                },
              },
            },
            topSellingProducts: {
              type: 'array',
              items: getModelSchemaRef(Item),
            },
          },
        },
      },
    },
  })
  async productPerformance(): Promise<any> {
    return this.analyticsRepository.findProductPerformance();
  }

  @get('/analytics/monthlyPerformanceByCategory')
  @response(200, {
    description: 'Monthly performance by category',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            labels: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Month in the format YYYY-MM',
              },
              description: 'Array of months',
            },
            datasets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                    description: 'Category of the item',
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'number',
                      description:
                        'Total revenue for the category in the month',
                    },
                  },
                },
                required: ['label', 'data'],
              },
              description:
                'Array of datasets with revenue data for each category',
            },
          },
          required: ['labels', 'datasets'],
        },
      },
    },
  })
  async findMonthlyPerformanceByCategory(): Promise<{
    labels: string[];
    datasets: {label: string; data: number[]}[];
  }> {
    return this.analyticsRepository.findMonthlyPerformanceByCategory();
  }

  @get('/analytics/totalRevenueByCategory')
  @response(200, {
    description: 'Total revenue by category',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                description: 'Category of the item',
              },
              totalRevenue: {
                type: 'number',
                description: 'Total revenue generated by the category',
              },
            },
            required: ['category', 'totalRevenue'],
          },
        },
      },
    },
  })
  async findTotalRevenueByCategory(): Promise<
    {category: string; totalRevenue: number}[]
  > {
    return this.analyticsRepository.findTotalRevenueByCategory();
  }

  @get('analytics/findAllItemsTransactionData')
  @response(200, {})
  async findAllItemsTransactionData(
    @param.query.number('monthsBack') monthsBack: number = 3,
  ) {
    return this.analyticsRepository.findAllItemsTransactionData({
      limit: monthsBack,
    });
  }

  @get('/analytics/monthlyRevenueByItem')
  @response(200, {
    description: 'Monthly revenue by item',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            labels: {type: 'array', items: {type: 'string'}},
            datasets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  label: {type: 'string'},
                  data: {type: 'array', items: {type: 'number'}},
                },
              },
            },
          },
        },
      },
    },
  })
  async findMonthlyRevenueByItem(): Promise<{
    labels: string[];
    datasets: {label: string; data: number[]}[];
  }> {
    return this.analyticsRepository.findMonthlyRevenueByItem();
  }
}

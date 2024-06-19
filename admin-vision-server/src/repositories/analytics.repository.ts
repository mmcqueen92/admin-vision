import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {AdminVisionMySqlDataSource} from '../datasources';
import {ItemRepository} from './item.repository';
import { TransactionRepository } from './transaction.repository';
import { TransactionItemRepository } from './transaction-item.repository';

export class AnalyticsRepository {
  constructor(
    @inject('datasources.adminVisionMySql')
    public dataSource: AdminVisionMySqlDataSource,
    @repository(ItemRepository) protected itemsRepository: ItemRepository,
    @repository(TransactionRepository)
    protected transactionRepository: TransactionRepository,
    @repository(TransactionItemRepository)
    protected transactionItemsRepository: TransactionItemRepository,
  ) {}

  async findCartAbandonmentRate(): Promise<number> {
    const query = `
    SELECT (SELECT COUNT(*) FROM carts) AS totalCarts,
    (SELECT COUNT(*) FROM transactions) AS totalTransactions`;

    return this.dataSource.execute(query);
  }

  async findBestSellingItems(): Promise<any> {
    const query = `
    SELECT ti.itemId, SUM(ti.quantity) as totalQuantitySold, i.name as itemName
    FROM transaction_items ti
    JOIN items i ON ti.itemId = i.id
    GROUP BY ti.itemId, i.name
    ORDER BY totalQuantitySold DESC
    LIMIT 5`;

    return this.dataSource.execute(query);
  }

  async findProductPerformance(): Promise<any> {
    const transactionsPerMonthQuery = `SELECT date_format(createdAt, '%Y-%m') AS month, COUNT(*) AS salesCount FROM transactions GROUP BY month ORDER BY month`;

    const [transactionsPerMonth, topSellingProducts] = await Promise.all([
      this.dataSource.execute(transactionsPerMonthQuery),
      this.findBestSellingItems(),
    ]);

    return {
      transactionsPerMonth,
      topSellingProducts,
    };
  }

  async findMonthlySalesRevenue(): Promise<any> {
    const query = `
    SELECT
      DATE_FORMAT(createdAt, '%Y-%m') AS month,
      SUM(totalPrice) AS totalSales
    FROM transactions
    GROUP BY month
    ORDER BY month
  `;

    return this.dataSource.execute(query);
  }

  async findAverageOrderValue(): Promise<number> {
    const query = `
    SELECT AVG(totalPrice) AS averageOrderValue
    FROM transactions`;

    return this.dataSource.execute(query);
  }

  async findAverageOrderValueByMonth(): Promise<
    {month: string; averageOrderValue: number}[]
  > {
    const query = `
    SELECT 
      DATE_FORMAT(createdAt, '%Y-%m') AS month,
      AVG(totalPrice) AS averageOrderValue
    FROM 
      transactions
    GROUP BY 
      month
    ORDER BY 
      month`;

    return this.dataSource.execute(query);
  }

  async findNewUsersByMonth(): Promise<
    {month: string; newUserCount: number}[]
  > {
    const query = `
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m') AS month,
        COUNT(*) AS newUserCount
      FROM 
        users
      WHERE
        createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY 
        month
      ORDER BY 
        month`;

    return this.dataSource.execute(query);
  }

  async findCustomerRetentionRate(): Promise<number> {
    // Find users who made a purchase 6 months ago
    const querySixMonthsAgo = `
    SELECT DISTINCT userId
    FROM transactions
    WHERE createdAt BETWEEN NOW() - INTERVAL 12 MONTH AND NOW() - INTERVAL 6 MONTH`;

    // Find users who made a purchase in the last 6 months
    const queryRecentPurchases = `
    SELECT DISTINCT userId
    FROM transactions
    WHERE createdAt >= NOW() - INTERVAL 6 MONTH`;

    // Execute both queries
    const usersSixMonthsAgo: {userId: number}[] = await this.dataSource.execute(
      querySixMonthsAgo,
    );
    const recentPurchases: {userId: number}[] = await this.dataSource.execute(
      queryRecentPurchases,
    );

    // Convert results to sets for easy comparison
    const userSetSixMonthsAgo = new Set(
      usersSixMonthsAgo.map(user => user.userId),
    );
    const recentPurchaseSet = new Set(recentPurchases.map(user => user.userId));

    // Find the intersection of the two sets
    const retainedUsers = [...userSetSixMonthsAgo].filter(userId =>
      recentPurchaseSet.has(userId),
    );

    // Calculate retention rate
    const retentionRate =
      (retainedUsers.length / userSetSixMonthsAgo.size) * 100;

    return retentionRate;
  }

  async findMonthlyCustomerRetentionRates(): Promise<
    {month: string; retentionRate: number}[]
  > {
    // Fetch monthly user data for the last 12 months
    const queryMonthlyUsers = `
    SELECT DISTINCT userId, DATE_FORMAT(createdAt, '%Y-%m') as month
    FROM transactions
    WHERE createdAt >= NOW() - INTERVAL 12 MONTH
  `;

    // Execute the query
    const monthlyUsers: {userId: number; month: string}[] =
      await this.dataSource.execute(queryMonthlyUsers);

    // Group users by month
    const usersByMonth: {[month: string]: Set<number>} = {};
    monthlyUsers.forEach(user => {
      if (!usersByMonth[user.month]) {
        usersByMonth[user.month] = new Set();
      }
      usersByMonth[user.month].add(user.userId);
    });

    // Calculate retention rates
    const months = Object.keys(usersByMonth).sort();
    const retentionRates: {month: string; retentionRate: number}[] = [];

    for (let i = 3; i < months.length; i++) {
      const currentMonth = months[i];

      // Aggregate users from the last three months
      const previousThreeMonths = new Set<number>();
      for (let j = i - 3; j < i; j++) {
        const month = months[j];
        usersByMonth[month].forEach(userId => previousThreeMonths.add(userId));
      }

      const currentMonthUsers = usersByMonth[currentMonth];

      // Find the intersection of users between current month and previous three months
      const retainedUsers = [...currentMonthUsers].filter(userId =>
        previousThreeMonths.has(userId),
      );

      // Calculate retention rate
      const retentionRate =
        (retainedUsers.length / previousThreeMonths.size) * 100;

      retentionRates.push({month: currentMonth, retentionRate});
    }

    return retentionRates;
  }

  async findCustomerDemographics(): Promise<any> {
    const genderDistributionQuery = `SELECT gender, COUNT(*) AS count FROM users GROUP BY gender`;
    // const ageDistributionQuery = `SELECT age_group, COUNT(*) AS count FROM users GROUP BY age_group`;
    const locationDistributionQuery = `SELECT province, COUNT(*) AS count FROM users GROUP BY province`;

    const [genderDistribution, locationDistribution] = await Promise.all([
      this.dataSource.execute(genderDistributionQuery),
      // this.dataSource.execute(ageDistributionQuery),
      this.dataSource.execute(locationDistributionQuery),
    ]);

    return {
      genderDistribution,
      // ageDistribution,
      locationDistribution,
    };
  }

  async findConversionRate(): Promise<number> {
    const query = `
    SELECT (SELECT COUNT(*) FROM carts) AS totalCarts,
    (SELECT COUNT(*) FROM transactions) AS totalTransactions`;

    const {totalCarts, totalTransactions} = await this.dataSource.execute(
      query,
    );

    return totalTransactions / totalCarts;
  }

  async findMonthlyConversionRates(): Promise<
    {month: string; conversionRate: number}[]
  > {
    const cartsQuery = `
    SELECT 
      DATE_FORMAT(createdAt, '%Y-%m') AS month,
      COUNT(*) AS totalCarts
    FROM 
      carts
    WHERE
      createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY 
      DATE_FORMAT(createdAt, '%Y-%m')
  `;

    const transactionsQuery = `
    SELECT 
      DATE_FORMAT(createdAt, '%Y-%m') AS month,
      COUNT(*) AS totalTransactions
    FROM 
      transactions
    WHERE
      createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY 
      DATE_FORMAT(createdAt, '%Y-%m')
  `;

    const cartsData: {month: string; totalCarts: string}[] =
      await this.dataSource.execute(cartsQuery);
    const transactionsData: {month: string; totalTransactions: string}[] =
      await this.dataSource.execute(transactionsQuery);

    // Convert arrays to maps for easier lookup
    const cartsMap = new Map(
      cartsData.map(item => [item.month, parseInt(item.totalCarts)]),
    );
    const transactionsMap = new Map(
      transactionsData.map(item => [
        item.month,
        parseInt(item.totalTransactions),
      ]),
    );

    // Collect all months from both datasets
    const allMonths = new Set([...cartsMap.keys(), ...transactionsMap.keys()]);

    // Calculate conversion rates
    const monthlyConversionRates = Array.from(allMonths).map(month => {
      const totalCarts = cartsMap.get(month) || 0;
      const totalTransactions = transactionsMap.get(month) || 0;
      let conversionRate = 0;
      if (totalCarts !== 0) {
        conversionRate = totalTransactions / totalCarts;
      }
      return {month, conversionRate};
    });

    // Sort by month
    monthlyConversionRates.sort((a, b) => a.month.localeCompare(b.month));

    return monthlyConversionRates;
  }

  async findMonthlyPerformanceByCategory(): Promise<{
    labels: string[];
    datasets: {label: string; data: number[]}[];
  }> {
    const query = `
    SELECT 
      DATE_FORMAT(t.createdAt, '%Y-%m') AS month,
      i.category AS category,
      SUM(ti.quantity * ti.unitPrice) AS monthlyRevenue
    FROM 
      transactions t
      JOIN transaction_items ti ON t.id = ti.transactionId
      JOIN items i ON ti.itemId = i.id
    WHERE 
      t.createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY 
      DATE_FORMAT(t.createdAt, '%Y-%m'), i.category
    ORDER BY 
      month, category;
  `;

    const rawData: {month: string; category: string; monthlyRevenue: string}[] =
      await this.dataSource.execute(query);

    const categoriesQuery = `SELECT DISTINCT category FROM items`;
    const categoriesData: {category: string}[] = await this.dataSource.execute(
      categoriesQuery,
    );
    const uniqueCategories = categoriesData.map(item => item.category);

    // Get all months within the last 12 months
    const monthsQuery = `
    SELECT DISTINCT DATE_FORMAT(createdAt, '%Y-%m') AS month
    FROM transactions
    WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    ORDER BY month;
  `;
    const monthsData: {month: string}[] = await this.dataSource.execute(
      monthsQuery,
    );
    const allMonths = monthsData.map(item => item.month);

    // Initialize datasets map
    const datasetsMap = new Map<string, number[]>();

    uniqueCategories.forEach(category => {
      datasetsMap.set(category, Array(allMonths.length).fill(0));
    });

    // Populate the actual revenue
    rawData.forEach(row => {
      const month = row.month;
      const category = row.category;
      const monthlyRevenue = parseFloat(row.monthlyRevenue);

      const monthIndex = allMonths.indexOf(month);
      if (monthIndex !== -1) {
        const categoryData = datasetsMap.get(category);
        if (categoryData) {
          categoryData[monthIndex] = monthlyRevenue;
        }
      }
    });

    const datasets = Array.from(datasetsMap.entries()).map(([label, data]) => ({
      label,
      data,
    }));

    return {
      labels: allMonths,
      datasets,
    };
  }

  async findTotalRevenueByCategory(): Promise<
    {category: string; totalRevenue: number}[]
  > {
    const query = `
    SELECT 
      i.category AS category,
      SUM(ti.quantity * ti.unitPrice) AS totalRevenue
    FROM 
      transactions t
      JOIN transaction_items ti ON t.id = ti.transactionId
      JOIN items i ON ti.itemId = i.id
    WHERE 
      t.createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY 
      i.category
    ORDER BY 
      category;
  `;

    const rawData: {category: string; totalRevenue: string}[] =
      await this.dataSource.execute(query);

    return rawData.map(row => ({
      category: row.category,
      totalRevenue: parseFloat(row.totalRevenue),
    }));
  }

  async findAllItemsTransactionData({
    limit = 3,
  }: {
    limit?: number;
  }): Promise<any[]> {
    // Step 1: Retrieve all items and initialize totalRevenue and totalUnitsSold to 0
    const items = await this.itemsRepository.find();
    const itemsWithDetails = items.map(item => ({
      ...item,
      totalRevenue: 0,
      totalUnitsSold: 0,
    }));

    const dateLimit = new Date();
    dateLimit.setMonth(dateLimit.getMonth() - limit);

    // Step 2: Retrieve all transactions within the specified date range
    const transactions = await this.transactionRepository.find({
      where: {
        createdAt: {
          gte: dateLimit.toISOString().slice(0, 19).replace('T', ' '), // Formatting date to match your DB format
        },
      },
    });

    // If no transactions found, return the items with zeroed values
    if (transactions.length === 0) {
      return itemsWithDetails;
    }

    const transactionIds = transactions
      .map(transaction => transaction.id)
      .filter((id): id is number => id !== undefined);

    // Step 3: Retrieve all transaction_items for the found transactions
    const transactionItems = await this.transactionItemsRepository.find({
      where: {
        transactionId: {
          inq: transactionIds,
        },
      },
    });

    // Step 4: Update totalRevenue and totalUnitsSold for each item
    transactionItems.forEach(ti => {
      const item = itemsWithDetails.find(item => item.id === ti.itemId);
      if (item) {
        item.totalRevenue += ti.quantity * ti.unitPrice;
        item.totalUnitsSold += ti.quantity;
      }
    });

    return itemsWithDetails;
  }

  async findMonthlyRevenueByItem(): Promise<{
    labels: string[];
    datasets: {label: string; data: number[]}[];
  }> {
    // Query to fetch monthly revenue per item
    const query = `
        SELECT 
            DATE_FORMAT(t.createdAt, '%Y-%m') AS month,
            i.name AS item,
            COALESCE(SUM(ti.quantity * ti.unitPrice), 0) AS monthlyRevenue
        FROM 
            transactions t
            JOIN transaction_items ti ON t.id = ti.transactionId
            JOIN items i ON ti.itemId = i.id
        WHERE 
            t.createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY 
            DATE_FORMAT(t.createdAt, '%Y-%m'), i.name
        ORDER BY 
            month, item;
    `;

    // Execute query to fetch raw data
    const rawData: {month: string; item: string; monthlyRevenue: string}[] =
      await this.dataSource.execute(query);

    // Query to fetch all months within the last 12 months
    const monthsQuery = `
        SELECT DISTINCT DATE_FORMAT(createdAt, '%Y-%m') AS month
        FROM transactions
        WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        ORDER BY month;
    `;
    const monthsData: {month: string}[] = await this.dataSource.execute(
      monthsQuery,
    );
    const allMonths = monthsData.map(item => item.month);

    // Initialize datasets map
    const datasetsMap = new Map<string, number[]>();

    // Populate the datasets map with item names and initialize data arrays
    const uniqueItems = [...new Set(rawData.map(row => row.item))];
    uniqueItems.forEach(item => {
      datasetsMap.set(item, Array(allMonths.length).fill(0));
    });

    // Populate the actual revenue data into datasetsMap
    rawData.forEach(row => {
      const month = row.month;
      const item = row.item;
      const monthlyRevenue = parseFloat(row.monthlyRevenue);

      const monthIndex = allMonths.indexOf(month);
      if (monthIndex !== -1) {
        const itemData = datasetsMap.get(item);
        if (itemData) {
          itemData[monthIndex] = monthlyRevenue;
        }
      }
    });

    // Convert datasetsMap to the required format for Chart.js
    const datasets = Array.from(datasetsMap.entries()).map(([label, data]) => ({
      label,
      data,
    }));

    // Return labels (months) and datasets (monthly revenues per item)
    return {
      labels: allMonths,
      datasets,
    };
  }
}

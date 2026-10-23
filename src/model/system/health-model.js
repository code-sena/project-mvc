import pool from '@/assets/library/database';

export default class HealthModel {
  static async checkDatabase() {
    await pool.query('SELECT 1');
  }
}

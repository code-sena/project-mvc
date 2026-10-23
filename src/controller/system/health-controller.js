import HealthModel from '@/model/system/health-model';

export default class HealthController {
  static async check() {
    await HealthModel.checkDatabase();
    return { status: 'ok', database: 'up' };
  }
}

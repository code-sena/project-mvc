import HealthController from '@/controller/system/health-controller';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return Response.json(await HealthController.check());
  } catch {
    return Response.json({ status: 'error', database: 'down' }, { status: 503 });
  }
}

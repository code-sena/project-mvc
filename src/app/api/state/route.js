import * as stateController from "../../../controller/location/state-controller.js";

export async function GET() {
  const result = await stateController.getAll();
  return Response.json(result.body, { status: result.status });
}

export async function POST(request) {
  const data = await request.json();
  const result = await stateController.create(data);
  return Response.json(result.body, { status: result.status });
}

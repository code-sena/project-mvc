import * as stateController from "../../../../controller/location/state-controller.js";

export async function GET(request, { params }) {
  const { id } = await params;
  const result = await stateController.getById(Number(id));
  return Response.json(result.body, { status: result.status });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  const result = await stateController.update(Number(id), data);
  return Response.json(result.body, { status: result.status });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const result = await stateController.remove(Number(id));
  return Response.json(result.body, { status: result.status });
}

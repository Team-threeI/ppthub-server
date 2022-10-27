require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const {
  saveMockData,
  slideOrderList,
  originalPptId,
  comparablePptId,
  mergeData,
  mergedPptId,
} = require("../__mocks__/mock");

let agent;

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(process.env.MONGODB_URL);

  agent = request.agent(app);
});

afterAll(async () => {
  await mongoose.disconnect();
});

it("Post /ppts/save 요청을 확인합니다.", async () => {
  await agent.post("/ppts/save").send(saveMockData).expect(200);
});

it("Post /ppts/compare 요청을 확인합니다.", async () => {
  await agent
    .post("/ppts/compare")
    .send({ originalPptId, comparablePptId })
    .expect(200);
});

it("Post /ppts/merge 요청을 확인합니다.", async () => {
  await agent
    .post("/ppts/merge")
    .send({ originalPptId, comparablePptId, mergeData, slideOrderList })
    .expect(200);
});

it("Get /:ppt_id/download 요청을 확인합니다", async () => {
  await agent
    .get(`/${mergedPptId}/download`)
    .query({ mergedPptId })
    .expect(200);
});

import register from "../../pages/api/register";

describe("/api/register", () => {
  test("creates user profile with data provided", () => {
    jest.mock("firebase-admin", () => {
      return {
        apps: [
          "testAppId",
        ] /** this array should not be empty, so firebase-admin won't try to load a certificate when running unit tests */,
        firestore: jest.fn(),
      };
    });

    const req = {
      body: {
        uid: "random_uid",
      },
    };
    // const set = jest.fn();
    // const doc = jest.fn(() => ({ set }));
    // // const collection = jest.mockReturnValue({ doc });
    // const update = jest.fn()

    const status = jest.fn(() => {
      return "lol"
    });

    const res = {
      status,
    };

    register(req, res);
    console.log(res)
    expect(res.status).toBe(201);
  });
});

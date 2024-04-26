import { ServerApp } from "./presentation/server-app";

describe("Test App.ts", () => {
  test("should be true", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "5",
      "-l",
      "20",
      "-s",
      "-n",
      "multiplication-table",
      "-d",
      "outputs",
    ];
    await import("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 20,
      showTable: true,
      fileName: "multiplication-table",
      fileDestination: "outputs",
    });
  });
});

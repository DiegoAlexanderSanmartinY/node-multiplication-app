import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { ServerApp } from "./server-app";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe("TEst server-app.ts", () => {
  const options = {
    base: 3,
    limit: 20,
    showTable: true,
    fileDestination: "test-destination",
    fileName: "test-fileName",
  };
  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with opcions", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    const options = {
      base: 3,
      limit: 20,
      showTable: true,
      fileDestination: "test-destination",
      fileName: "test-fileName",
    };
    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });
  test("should run with custom values mocked", () => {
    const createMock = jest.fn().mockReturnValue(" 1 x 1 = 1");
    const saveFileMock = jest.fn().mockReturnValue(true);
    const logMock = jest.fn();
    const logErrorMock = jest.fn();

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: " 1 x 1 = 1",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });

    expect(logMock).toHaveBeenCalledWith("File created!");
    expect(logErrorMock).not.toBeCalledWith();
  });
});

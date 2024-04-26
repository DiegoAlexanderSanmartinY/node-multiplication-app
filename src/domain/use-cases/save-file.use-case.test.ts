import { SaveFile } from "./save-file.use-case";
import { rimraf } from "rimraf";
import file, { mkdir } from "fs";

describe("SaveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "customs-outputs/file-destination",
    fileName: "custom-table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
  afterEach(() => {
    const outputFolderExist = file.existsSync("outputs");
    if (outputFolderExist) rimraf("outputs"); //file.rmSync("outputs", { recursive: true });

    const customOutputFolderExist = file.existsSync(
      customOptions.fileDestination
    );
    if (customOutputFolderExist) rimraf(customOptions.fileDestination); //file.rmSync(customOptions.fileDestination, { recursive: true });
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const option = { fileContent: "test content" };
    const filePath = `outputs/table.txt`;

    const result = saveFile.execute(option);
    const fileExist = file.existsSync(filePath);
    const fileContent = file.readFileSync(filePath, "utf-8");

    expect(result).toBe(true);
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(option.fileContent);
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();

    const result = saveFile.execute(customOptions);
    const fileExist = file.existsSync(customFilePath);
    const fileContent = file.readFileSync(customFilePath, "utf-8");

    expect(result).toBe(true);
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(file, "mkdirSync").mockImplementation(() => {
      throw new Error("Error custom msg for testing");
    });
    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
    expect(mkdirSpy).toHaveBeenCalled();

    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(file, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("Error custom msg writting error message");
      });
    const result = saveFile.execute({ fileContent: "holaaaa" });

    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});

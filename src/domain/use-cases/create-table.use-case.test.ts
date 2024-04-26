import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 3 });
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("3 x 1 = 3");
    expect(rows).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };
    const table = new CreateTable().execute(options);
    const rows = table.split("\n").length;

    expect(table).toContain("3 x 20 = 60");
    expect(rows).toBe(20);
  });
});

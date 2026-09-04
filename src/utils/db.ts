import postgres from "postgres";

type QueryResult = Record<string, unknown>[];

export type SqlClient = {
  (strings: TemplateStringsArray | string, ...values: unknown[]): Promise<QueryResult>;
  safeQuery: (
    strings: TemplateStringsArray | string,
    ...values: unknown[]
  ) => Promise<QueryResult>;
};

const runMockQuery = async (
  _strings?: TemplateStringsArray | string,
  ..._values: unknown[]
): Promise<QueryResult> => {
  return [];
};

function createMockSql(): SqlClient {
  const sql = ((strings: TemplateStringsArray | string, ...values: unknown[]) => {
    return runMockQuery(strings, ...values);
  }) as SqlClient;

  sql.safeQuery = async (strings: TemplateStringsArray | string, ...values: unknown[]) => {
    return runMockQuery(strings, ...values);
  };

  return sql;
}

function createPostgresSql(databaseUrl: string): SqlClient {
  const client = postgres(databaseUrl, {
    ssl: "require",
    max: 1,
    idle_timeout: 20,
    connect_timeout: 8,
  });

  const query = async (
    strings: TemplateStringsArray | string,
    ...values: unknown[]
  ): Promise<QueryResult> => {
    if (typeof strings === "string") return [];
    const rows = await (client as unknown as (
      strings: TemplateStringsArray,
      ...values: unknown[]
    ) => Promise<QueryResult>)(strings, ...values);
    return rows;
  };

  const sql = ((strings: TemplateStringsArray | string, ...values: unknown[]) => {
    return query(strings, ...values);
  }) as SqlClient;

  sql.safeQuery = async (strings: TemplateStringsArray | string, ...values: unknown[]) => {
    try {
      return await query(strings, ...values);
    } catch {
      console.error("Database query failed");
      return [];
    }
  };

  return sql;
}

const sql: SqlClient = process.env.DATABASE_URL
  ? createPostgresSql(process.env.DATABASE_URL)
  : createMockSql();

export default sql;

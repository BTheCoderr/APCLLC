type QueryResult = Record<string, unknown>[];

type SqlClient = {
  (strings: TemplateStringsArray | string, ...values: unknown[]): Promise<QueryResult>;
  safeQuery: (
    strings: TemplateStringsArray | string,
    ...values: unknown[]
  ) => Promise<QueryResult>;
};

const runMockQuery = async (
  strings: TemplateStringsArray | string
): Promise<QueryResult> => {
  const query = typeof strings === 'object' ? strings[0] || '' : strings;
  if (typeof query === 'string' && query.toLowerCase().includes('insert')) {
    return [{ id: `mock-${Date.now()}` }];
  }
  return [];
};

const sql = ((strings: TemplateStringsArray | string, ..._values: unknown[]) => {
  return runMockQuery(strings);
}) as SqlClient;

sql.safeQuery = async (strings: TemplateStringsArray | string, ..._values: unknown[]) => {
  return runMockQuery(strings);
};

export default sql;

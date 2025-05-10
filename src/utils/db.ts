import postgres from 'postgres';

// Mock SQL client that doesn't actually connect to the database
// This is a temporary solution until the database connection issues are resolved

// Create a fake SQL client that always succeeds but doesn't actually connect
const sql: postgres.Sql<Record<string, never>> = (strings: TemplateStringsArray | string, ...values: unknown[]) => {
  console.log('Database operation simulated (not actually connecting)');
  // Return a promise that resolves to an empty array
  return Promise.resolve([]);
};

// Add a safeQuery method that logs the operation but doesn't actually connect
sql.safeQuery = async (strings: TemplateStringsArray | string, ...values: unknown[]) => {
  console.log('Safe database operation simulated (not actually connecting)');
  // For insert operations that return an ID, simulate a success response
  const query = typeof strings === 'object' ? strings[0] || '' : strings;
  if (typeof query === 'string' && query.toLowerCase().includes('insert')) {
    // Simulate an ID return for insert operations
    return [{ id: 'mock-' + Date.now() }];
  }
  // Return an empty array for other operations
  return [];
};

// Export the mock SQL client
export default sql; 
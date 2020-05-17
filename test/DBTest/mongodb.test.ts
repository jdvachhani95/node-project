import { mongoDbProvider } from '../../src/mongodb.provider';
test('Test Mongodb client created successfully with credential', () => {
  expect(mongoDbProvider).toBeDefined();
});

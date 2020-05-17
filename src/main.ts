import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import resolvers from './API/resolvers/dataConversion.resolver';
import typeDefs from './API/schemas/dataConversion.graphql';
import { mongoDbProvider } from './mongodb.provider';

(async function bootstrapAsync(): Promise<void> {
  await mongoDbProvider.connectAsync(environment.mongoDb.databaseName);

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: environment.apollo.introspection,
    playground: environment.apollo.playground,
  });

  server
    .listen(environment.port)
    .then(({ url }) => console.log(`Server ready at ${url}. `));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      server.stop();
      await mongoDbProvider.closeAsync();
    });
  }
})();

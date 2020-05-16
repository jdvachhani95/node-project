import { mongoDbProvider } from './../../mongodb.provider';
const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
export default {
  Query: {
    // testMessage: (): string => 'Hello World!',
    async xmlToJson(_: any, args: any, context: any) {
      try {
        const response = await axios.get(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml'
        );
        await xml2js.parseString(
          response.data,
          { mergeAttrs: true },
          async (err: any, res: any) => {
            if (err) {
              throw err;
            }
            await mongoDbProvider
              .getCollection('users')
              .insert(res.Response.Results);
            const json = JSON.stringify(res.Response.Results, null, 4);
            fs.writeFileSync('user.json', json);
            // console.log(json);
          }
        );
        // console.log(response);
        return 'hello world';
      } catch (error) {
        console.log(error);
      }
    },
  },
};

import { mongoDbProvider } from './../../mongodb.provider';
import { DataConversion } from '../data/dataConversion';
const axios = require('axios');
const fs = require('fs');
export default {
  Query: {
    async GetVehicleMakes(_: any, args: any, context: any) {
      try {
        const response = await axios.get(
          'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML'
        );
        const fetchedData = await DataConversion.concatVehicleType(
          response.data
        );
        const vehicleMakes = {
          AllVehicleMakes: fetchedData,
          LastUpdated: Math.floor(new Date().getTime() / 1000),
        };
        await mongoDbProvider
          .getCollection('VehicleMakesDocs')
          .insertOne(vehicleMakes);
        const json = JSON.stringify(vehicleMakes, null, 4);
        fs.writeFileSync('AllVehicleMakes.json', json);
        return vehicleMakes;
      } catch (error) {
        console.log(error);
      }
    },
    async GetLastUpdatedMakesDoc(_: any, args: any, context: any) {
      try {
        const refDoc = await mongoDbProvider
          .getCollection('VehicleMakesDocs')
          .findOne({}, { sort: { $natural: -1 } });
        return refDoc;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

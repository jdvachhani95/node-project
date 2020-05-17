import { ApolloError } from 'apollo-server-express';
const axios = require('axios');
const xml2js = require('xml2js');

export class DataConversion {
  /**
   * Function return the combined information of vehicle types and makes
   */
  static async concatVehicleType(data: any) {
    try {
      let ConcatenatedVehicleInfo: any[] = [];
      // Convert Vehicle makes info to js object
      const rawData = this.xml2JsObject(data);

      // Concate Vehicle types with vehicle makes
      if (rawData[0].AllVehicleMakes !== undefined) {
        const vehicleMakeData = rawData[0].AllVehicleMakes;

        await this.asyncForEach(vehicleMakeData, async (vehicleMake: any) => {
          let concatedMakeType: any = {};
          Object.keys(vehicleMake).forEach((key: any) => {
            concatedMakeType[key] = vehicleMake[key][0];
          });

          if (vehicleMake['Make_ID'] !== undefined) {
            // Fetch vehicle types
            const vehicleTypes: any = await this.getVehicleType(
              vehicleMake['Make_ID'][0]
            );
            concatedMakeType['VehicleTypesForMakeIds'] =
              vehicleTypes[0]['VehicleTypesForMakeIds'];
          }
          ConcatenatedVehicleInfo.push(concatedMakeType);
        });
      }
      return ConcatenatedVehicleInfo;
    } catch (err) {
      throw new ApolloError(err);
    }
  }
  /**
   * Function get the vehicle types for particular MakeId
   */
  static async getVehicleType(makeId: string) {
    try {
      // Fetch rawdata from the api
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`
      );
      // Convert XML data to js object
      const data = this.xml2JsObject(response.data);
      // Extract data and return simplified data
      if (
        data[0]['VehicleTypesForMakeIds'] !== undefined &&
        data[0]['VehicleTypesForMakeIds'].length !== 0
      ) {
        data[0]['VehicleTypesForMakeIds'].forEach((element: any) => {
          Object.keys(element).forEach((key: any) => {
            element[key] = element[key][0];
          });
        });
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Function converts xml data into javascript object
   */
  static xml2JsObject(xmlData: any) {
    try {
      let jsObject: any = {};
      xml2js.parseString(
        xmlData,
        { mergeAttrs: true },
        async (err: any, res: any) => {
          if (err) {
            throw err;
          }
          jsObject = res.Response.Results;
        }
      );
      return jsObject;
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * Function to call Asynchronous function in for each loop
   */
  static async asyncForEach(array: any[], callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

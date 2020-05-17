import { DataConversion } from '../../src/API/data/dataConversion';
const axios = require('axios');

test('Test fetching vehicle types data for particular vehicle makeId', async () => {
  const response = await DataConversion.getVehicleType('442');
  const VehicleTypesForMakeIds = response[0]['VehicleTypesForMakeIds'];
  expect(VehicleTypesForMakeIds).not.toBeNull();

  VehicleTypesForMakeIds.forEach((element: any) => {
    expect(element.VehicleTypeId).not.toBeNull();
    expect(element.VehicleTypeName).not.toBeNull();
  });
});

test('Test all vehicle makes must have Make_ID', async () => {
  const response = await axios.get(
    'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML'
  );
  expect(response.data).not.toBeNull();
  const testData = DataConversion.xml2JsObject(response.data);
  expect(testData[0].AllVehicleMakes).not.toBeNull();
  testData[0].AllVehicleMakes.forEach((element: any) => {
    expect(element.Make_ID).toBeDefined();
  });
});

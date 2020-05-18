import { gql } from 'apollo-server';

export default gql`
  type AllVehicleMakesInfo {
    """
    It's a Unix timestamp
    """
    LastUpdated: Int
    """
    AllVehicleMake is a array of all vehicle makes
    """
    AllVehicleMakes: [VehicleMakeInfo]
  }
  type VehicleMakeInfo {
    Make_ID: String
    Make_Name: String
    """
    VehicleTypesForMakeIds is a array of all types of vehicle for the particular MakeId
    """
    VehicleTypesForMakeIds: [VehicleTypesInfo]
  }
  type VehicleTypesInfo {
    VehicleTypeId: String
    VehicleTypeName: String
  }
  type Query {
    """
    Query return Array of all vehicle make objects provided from this
    link: https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML and
    update full document on mondoDB database
    *Note: Mutation take approx 30 min to fetch all vehicle types for makeIds and combine complete doc
    """
    GetVehicleMakes: AllVehicleMakesInfo!

    """
    Query return the last updated Vehicle makes document from the collection
    """
    GetLastUpdatedMakesDoc: AllVehicleMakesInfo!
  }
`;

import AWS from 'aws-sdk';
import { COLORS } from '../config';

AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:1056edee-e9e2-4c61-8f7e-45d31a5ab8a4',
});

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = 'cyclog';

export function fetchRides() {
  return new Promise((resolve, reject) => {
    dynamo.scan({ TableName }, (err, data) => {
      if (err) {
        reject('ride list cannot be retrieved');
      } else {
        resolve(data.Items.map(ride => ({
          ...ride,
          color: COLORS.black,
        })));
      }
    });
  });
}

export function putRide(ride) {
  return new Promise((resolve, reject) => {
    dynamo.put({ Item: ride, TableName }, (err, data) => {
      if (err) {
        reject('ride was not saved');
      } else {
        resolve();
      }
    });
  });
}

export function deleteRide(ride) {
  return new Promise((resolve, reject) => {
    dynamo.delete({ TableName, Key: { id: ride.id } }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

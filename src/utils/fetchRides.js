import AWS from 'aws-sdk';

AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:1056edee-e9e2-4c61-8f7e-45d31a5ab8a4',
});

const dynamo = new AWS.DynamoDB.DocumentClient();

export function fetchRides() {
  return new Promise((resolve, reject) => {
    dynamo.scan({ TableName: 'cyclog' }, (err, data) => {
      if (err) reject('paths cannot be retrieved');
      resolve(data.Items);
    });
  });
}

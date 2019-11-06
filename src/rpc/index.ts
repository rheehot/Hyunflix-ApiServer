import * as jayson from 'jayson';

// TODO from config
const client = jayson.Client.http({
  host: 'home.hyunsub.kim',
  port: 8123,
});

export function call(functionName, args): Promise<any> {
  return new Promise((resolve, reject) => {
    client.request(functionName, args, (err, error, response) => {
      if (err) {
        reject(err);
      } else if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export * from './ffprobe';
export * from './fs';
export * from './subtitle';

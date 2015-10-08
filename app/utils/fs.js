import fs from 'fs';
import {Promise} from 'rsvp';

export function stat(fileName) {
  return new Promise((resolve, reject) => {
    fs.stat(fileName, (err, stat) => {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}

export function readFile(fileName, options={encoding:'utf8'}) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, options, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

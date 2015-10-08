//This file contains wrappers around nodejs fs methods that return a rsvp.Promise instead of using a callback.
import fs from 'fs';
import {Promise} from 'rsvp';

let pFs = {
  /**
    Takes fileName and returns a promise for fs.stat
    @param {string} fileName - String file name to stat
    @return (Promise) - A rsvp.Promise that will yield the stat data or an error
  */
  stat(fileName) {
    return new Promise((resolve, reject) => {
      fs.stat(fileName, (err, stat) => {
        if (err) {
          reject(err);
        } else {
          resolve(stat);
        }
      });
    });
  },

  /**
    Takes a fileName and options and returns a promise for fs.readFile
    @param {string} fileName - String file name to read data from
    @param {object} options - Object for fs.readFile. By default it will use encoding='utf8'
    @return (Promise) - A rsvp.Promise that will yield the read file data or an error
  */
  readFile(fileName, options={encoding: 'utf8'}) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, options, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  /**
    Takes a fileName a promise that checks if the file exists or not
    @param {string} fileName - String file name to read data from
    @return (Promise) - A rsvp.Promise that will yield the true if the file exists or false otherwise
  */
  fileExists(fileName) {
    return new Promise((resolve, reject) => {
      fs.stat(fileName, function(err, stat) {
        resolve(err === null);
      });
    });
  },

  writeFile(fileName, data, options) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, options, err => err ? reject(err) : resolve());
    });
  }
};

export default pFs;

jest.dontMock('../main');
jest.dontMock('path');
jest.dontMock('fs');

var processConDump = require('../main').processConDump;

describe('processConDump', function() {
  it('finds abaddon', function() {
    processConDump(path.join('sample-condumps', `condump000.txt`))
      .then(hero => expect(hero).toBe('abaddon'));
      // .catch(reason => console.log(reason));
  });
});

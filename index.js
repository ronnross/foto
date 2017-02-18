const fs = require('fs')
const path = require('path')
const { pipe } = require('pico-lambda')

const walkSync = (dir, filelist = []) => fs.readdirSync(dir)
                                           .map(file => fs.statSync(path.join(dir, file)).isDirectory()
                                                        ? walkSync(path.join(dir, file), filelist)
                                                        : filelist.concat(path.join(dir, file))[0])

const createFotoDb = (content) => {
  fs.writeFile('fotodb.json', content, function (err) {
    if (err) return logger(err);
    console.log('Fötödb generated');
  });
}

function logger(l) {
  console.log('~~~~~', l)
}

pipe(
  walkSync,
  createFotoDb
)('images')

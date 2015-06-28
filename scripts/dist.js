var archiver  = require('archiver');
var fs        = require('fs.extra');
var path      = require('path');
var rimraf    = require('rimraf');

var indexPath = path.resolve(__dirname, '../index.js');
var distPath  = path.resolve(__dirname, '/../dist');
var binPath   = path.resolve(__dirname, '/../lib');
var zipPath   = path.resolve(__dirname, '/../thumbnailer.zip');

// Create dist Path
if (fs.existsSync(distPath)) {
  rimraf.sync(distPath);
}

// Remove Zip
if (fs.existsSync(zipPath)) {
  rimraf.sync(zipPath);
}

fs.mkdirSync(distPath);

// Copy index.js.
fs.writeFileSync(dist_path + 'index.js', fs.readFileSync(indexPath);

// Copy bin files.
fs.readdirSync(binPath).forEach(function (path) {
  fs.writeFileSync(distPath + '/bin' + path, fs.readFileSync(binPath + '/' + path));
});

var finalZip = fs.createWriteStream(zipPath);
var archive = archiver.create('zip');

finalZip.on('close', function () {
  console.log('Done Zipping');
  process.exit(0);
});

archive.pipe(finalZip);
archive.directory('./dist', '.').finalize();

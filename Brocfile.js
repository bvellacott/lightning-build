const pickFiles = require('broccoli-funnel');
const mergeNodes = require('broccoli-merge-trees');
const debug = require('broccoli-stew').debug;
const concat = require('broccoli-concat');
const fs = require('fs');
const path = require('path');

const BrowserSync = require('broccoli-browser-sync');
const proxy = require('http-proxy-middleware');

const buldBundle = require('./buildTools/bundleBuilder');

const isProduction = process.env.BROCCOLI_ENV === 'production';
var allNodes = [];

const bundlesDir = './resource-bundles/aura';

var bundleNodes = [];
var bundleDirectories = fs.readdirSync(bundlesDir).filter(function(file) {
	return fs.statSync(path.join(bundlesDir, file)).isDirectory();
});

bundleDirectories.forEach(function(bundleDir) {
	var bundleName = path.basename(bundleDir);
	var bundleNode = buldBundle(bundlesDir, bundleName, node_modules, getbundleBuildOptions(bundleName));
	bundleNodes.push(bundleNode);
});

var bundles = mergeNodes(bundleNodes);

// browsersync options 
var bsOptions = {
  browserSync: {
    open: false,
    middleware: [
      proxy('/api/**', {
        target: 'http://localhost:8080/',
        pathRewrite: {
          '^/api': ''
        }
      }),
      proxy('/live', {
        target: 'http://localhost:8080/',
        pathRewrite: {
          '^/live': ''
        },
        ws: true})
    ]
  }
};
var browserSync = new BrowserSync([bundles], bsOptions);

allNodes = allNodes.concat([bundles, browserSync]);

const staticTestFiles = pickFiles(
	mergeNodes(['./node_modules/qunitjs/qunit', 'shared']), {
  include: ['qunit.js', 'qunit.css', 'allTests.html', 'testLogger.js'],
  destDir: '.'
});
allNodes.push(staticTestFiles);

var all = mergeNodes(allNodes);

module.exports = all;

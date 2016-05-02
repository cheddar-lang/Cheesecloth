#!/usr/bin/env node
const ARGS = require('./args.json');
;(function() {
    
    const npm = require('../lib/npm');
    const nopt = require('nopt');
    
    process.title = "cpm";
    
    console.log(process.argv);
    
})();
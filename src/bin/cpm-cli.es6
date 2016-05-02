#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const nopt = require('nopt');


import ARGS from './args';

(function() {

    process.title = "cpm";

    const ERR = Message => console.warn('cpm: ' + Message);
    
    // Command script path
    const SCRIPT_SRC = path.join(
        __dirname,
        '../lib/' + process.argv[2] + '.js'
    );
    
    fs.stat(SCRIPT_SRC, function(ERROR, STATUS) {
        if (ERROR === null) {
            
            const SCRIPT = require(SCRIPT_SRC);
            console.log(SCRIPT);
            process.exit(0);
            
        }
        else {
            console.log(STATUS, ERROR);
            ERR(`'${process.argv[2]}' is not a Cheesecloth command. See 'cpm help'`);
            process.exit(1);
        }
    });

    console.log(nopt(ARGS.OPTS, ARGS.SHORTHAND, process.argv));

})();
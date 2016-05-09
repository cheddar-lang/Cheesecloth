#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const nopt = require('nopt');

import CPM from '../conf/cpm';

(function() {

    process.title = "cpm";

    const ERR = Message => console.warn('cpm: ' + Message);
    
    const NAME = process.argv[2] || 'help';
    // Command script path
    const SCRIPT_SRC = path.join(
        __dirname,
        '../lib/' + NAME + '.js'
    );
    
    fs.stat(SCRIPT_SRC, function(ERROR, STATUS) {
        if (ERROR === null) {
            
            const {
                ARGS: {OPTS = {}, SHORTHAND = {}} = {},
                
                default: SCRIPT
            } = require(SCRIPT_SRC);
            
            process.title = `cpm: ${NAME}`;
            
            SCRIPT(nopt(OPTS, SHORTHAND, process.argv, 3), new CPM(NAME), process.argv);
            
        }
        else {
            ERR(`'${process.argv[2]||""}' is not a Cheesecloth command. See 'cpm help'`);
            process.exit(1);
        }
    });

})();
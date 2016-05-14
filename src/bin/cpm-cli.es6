#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const nopt = require('nopt');

import CPM from '../conf/cpm';

const EXEC = function(NAME, CLIARGS, FATAL) {

    process.title = "cpm";

    const ERR = Message => console.warn('cpm: ' + Message);
    
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
            
            SCRIPT(nopt(OPTS, SHORTHAND, CLIARGS, 3), new CPM(NAME, FATAL), CLIARGS);
            
        }
        else {
            ERR(`'${NAME||""}' is not a Cheesecloth command. See 'cpm help'`);
            if (FATAL) process.exit(1);
        }
    });

};

if (require.main === module) {
    EXEC(process.argv[2] || 'help', process.argv, true);
}

export default EXEC;
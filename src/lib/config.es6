const fs = require('fs');
const touch = require('touch');
const colors = require('colors');

import INI from '../utils/ini';

export default function(ARGS, CPM, RAW_ARGS) {

    const ROUTINES = ['get'];
    const MATCH = /^(.+):(.+)=(.+)$/;
    
    const HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    
    if (ARGS === true) {
        // Called from app
        let TARGET = CPM;
        let [K,V] = CPM.split(":");
        
        try {
            return INI.parse(fs.readFileSync(`${HOME}/.cpmrc`, "utf-8"))[K][V];
        } catch (e) {
            return false;
        }
    }
    else {
        let RUNNER = ARGS.argv.remain[0] || "";
        
        if (!MATCH.test(RUNNER))
            CPM.die(`No, or an invalid 'SEC:key=val' trio was provided`);

        let [,
            SEC, KEY, VAL
        ] = RUNNER.match(MATCH);
        
        function MODIFY() {
            fs.readFile(`${HOME}/.cpmrc`, "utf-8", (ERROR, DATA) => {
                if (ERROR) {
                    CPM.die(`Error reading '~/.cpmrc':
    ${(ERROR.message || "[unknown]").red.bold}`);
                } else {
                    
                    const CONFIG = INI.parse(DATA);
                    
                    if (!CONFIG.hasOwnProperty(SEC))
                        CONFIG[SEC] = {};
                    
                    // Parse item
                    const ARRAY = /^(.+)\[\s*\]$/;
                    const OBJECT = /^(.+)\[.+\]$/;
                    if (ARRAY.test(KEY)) {
                        [, KEY] = KEY.match(ARRAY);
                        
                        if (Array.isArray(CONFIG[SEC][KEY]))
                            CONFIG[SEC][KEY].push(VAL);
                        else if (CONFIG[SEC][KEY])
                            CONFIG[SEC] = [VAL];
                    } else if (OBJECT.test(KEY)) {
                        let [,K, V] = KEY.match(OBJECT);
                        if (Object.prototype.toString.call(CONFIG[SEC][K]) === "[object Object]") {
                            CONFIG[SEC][K][V] = VAL;
                        } else {
                            CONFIG[SEC][K] = {};
                            CONFIG[SEC][K][V] = VAL;
                        }
                    } else {
                        CONFIG[SEC][KEY] = VAL;
                    }
                    
                    fs.writeFile(`${HOME}/.cpmrc`, INI.stringify(CONFIG), {
                        encoding: 'utf-8',
                        flag: 'w'
                    }, () => process.exit(0));
                    
                }
            });
        }

        fs.access(`${HOME}/.cpmrc`, fs.F_OK, function(ERROR) {
            if (ERROR) {
                console.log("No '~/.cpmrc', creating...");
                touch(`${HOME}/.cpmrc`, (ERROR) => {
                    if (ERROR) {
                        CPM.die(`Error creating '~/.cpmrc':
    ${(ERROR.message || "[unknown]").red.bold}`);
                    } else {
                        MODIFY();
                    }
                });
            } else {
                MODIFY();
            }
        });

    }
}
const fs = require('fs');
const PROCESS = require('child_process');
const seedrand = require('seedrandom');
const colors = require('colors');

// Dependencies
import INIParser from '../utils/iniparser';

export const ARGS = {
    OPTS: {
        "info": Boolean
    },
    SHORTHAND: {
        "i": ["--info"]
    }
};

export default function(ARGS, CPM) {

    const PACKAGE_NAME = ARGS.argv.remain[0];

    // die if no package name provided.
    if (!PACKAGE_NAME)
        CPM.die('no package name provided');

    const UUID_GEN = () => (~~(seedrand(process.hrtime()[1]) * 1e8)).toString(36);

    // Determine what to do
    if (ARGS.info) {
        // get info on package
    }
    else {
        // == PREFORM INSTALL ==

        console.log(`Attempting to install ${PACKAGE_NAME.yellow.bold.underline}...`);

        // config.ini is located at:
        //  svn export https://github.com/cheddar-lang/cheddar-libs/trunk/<Package>/config.ini
        const PATH = `https://github.com/cheddar-lang/cheddar-libs/trunk/${PACKAGE_NAME}/config.ini`;

        console.log(`Attempting to install from ${PATH.underline}...`);

        PROCESS.execFile('svn', [
            'cat', // make sure this goes to STDOUT
            PATH
        ], (ERROR, STDOUT, STDERR) => {
            if (ERROR !== null) {
                console.log(`Could not obtain config:`);
                console.error(
                    // indent the error
                    STDERR.replace(/^/gm, '    ')
                );

                // Die after failing to find a config
                CPM.die(`Failed to locate config, aborting...`);
            }

            console.log(); // Empty line

            // Read config
            const {
                desc: {
                    name = "package_" + UUID_GEN(),
                        desc = "",
                        deps = []
                } = {}
            } = INIParser(STDOUT);

            console.log(`Retrieved package:
${name.yellow.bold.underline}, ${desc.underline}`);

            const INIT_DIR = '/usr/local/lib';

            function InitializePackage(...args) {
                console.log(args)
                fs.mkdir(`${INIT_DIR}/cpml/${name}`, 777, function() {
                    fs.writeFile(
                        `${INIT_DIR}/cpml/${name}/conf.ini`,
                        `[ins]
src=${PATH}
tim=${Date.now()}
[data]
nam=${name}
`,
                    (ERROR) => {
                        console.log(ERROR);
                    });
                });
            }

            // Check for cpml
            fs.access(`${INIT_DIR}/cpml`, fs.F_OK, (ERROR) => {
                if (ERROR) {
                    fs.access(INIT_DIR, fs.F_OK, (ERROR) => {
                        if (ERROR) {
                            CPM.die(`Could not locate ${
                                INIT_DIR.grey.underline
                            }, ${'aborting'.red}.`);
                        }
                        else {
                            fs.mkdir(`${INIT_DIR}/cpml`, 777, InitializePackage)
                        }
                    });
                }
                else {
                    InitializePackage();
                }
            });

            // loc: /usr/local/lib/cpml
            // if /usr/local/lib
            //    mkdir cpml
            // else
            //    error
        });
    }

}
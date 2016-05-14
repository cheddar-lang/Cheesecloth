const fs = require('fs');
const os = require('os');
const PROCESS = require('child_process');
const seedrand = require('seedrandom');
const colors = require('colors');

// Dependencies
import INI from '../utils/ini';
import CONFIG from './config';

export const ARGS = {
    OPTS: {
        "info": Boolean,
        "aidep": Boolean,
        "global": Boolean
    },
    SHORTHAND: {
        "i": ["--info"],
        "d": ["--idep"],
        "g": ["--global"]
    }
};

const INDENT = "    ";

export default function(ARGS, CPM) {
    
    colors; // just ignore this
    
    const PACKAGE_NAME = ARGS.argv.remain[0];

    // die if no package name provided.
    if (!PACKAGE_NAME)
        CPM.die('no package name provided');

    const UUID_GEN = () => (~~(seedrand(process.hrtime()[1]) * 1e8)).toString(36);

    // Determine what to do
    if (ARGS.info) {
        // get info on package
    }
    else if (ARGS.global) {
        // == PREFORM GLOBAL INSTALL ==

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
                console.error(`Could not obtain config:`);
                console.error(
                    // indent the error
                    STDERR.replace(/^/gm, "    ")
                );

                // Die after failing to find a config
                CPM.die(`Failed to locate package, aborting.`);
            }

            console.log(); // Empty line

            // Read config
            const {
                desc: {
                    name = "package_" + UUID_GEN(),
                        desc = "",
                        deps = []
                } = {}
            } = INI.parse(STDOUT);

            console.log(`${"Successfully".green.bold} located package:
${name.yellow.bold.underline}, ${desc.underline}\n`);
            
            const INIT_DIR = CONFIG(true, "CPM:INIT_DIR") || '/usr/share'; // DO NOT ADD A `/` at the end
            const DIR_NAME = CONFIG(true, "CPM:DIR_NAME") || 'cpmlibs';
            
            function InitializePackage(ERROR) {
                if (ERROR) {
                    CPM.die(`Error during package initalization:
An error occured creating the ${DIR_NAME.underline} directory:
    ${(ERROR.code || "[unknown]").red.bold}
Perhaps attempt running this script with '${"sudo".bold}'?` + 
// Check for SIP
(os.platform() === "darwin" && +os.release().split('.')[0] >= 15
    ? `

${"WARNING:".yellow.bold} Your system has been detected as runing ${"OS X 10.11 or above".bold}.
 these OS X versions have "${"System Integrity Protection".underline}",
  which prevents access to various system directories.
 This includes the ${`${INIT_DIR}/`.underline} directory,
  in which this script was provided with insufficient permisisons to modify
 Attempt to fix this by modifying the initalization directory by running"
  'cpm config CPM:INIT_DIR=/usr/local/share'` : ""));
                }
                 
                process.umask(0)   
                fs.mkdir(`${INIT_DIR}/${DIR_NAME}/${name}`, 0o777, function() {
                    fs.writeFile(
                        `${INIT_DIR}/${DIR_NAME}/${name}/inf.ini`,
                        `[ins]
src=${PATH}
tim=${Date.now()}
[data]
nam=${name}
`, (ERROR) => {
                            if (ERROR) {
                                CPM.die(`Error during inf initialization
    ${(ERROR.code || "[unknown]").red.bold}
Perhaps attempt running this script with '${"sudo".bold}'?`);
                            }
                            else {
                                console.log(`${"Successfully".green} initalized package`);
                                fs.writeFile(
                                    `${INIT_DIR}/${DIR_NAME}/${name}/config.ini`, STDOUT,
                                    function() {
                                        console.log(`${"Successfully".green} initalized configuration`);
                                });
                            }
                        });
                });
            }
            
            

            // Check for cpmlibs
            fs.access(`${INIT_DIR}/${DIR_NAME}`, fs.F_OK, (ERROR) => {
                if (ERROR) {
                    console.log(`Could not find ${DIR_NAME.underline} directory`);
                    fs.access(INIT_DIR, fs.F_OK, (ERROR) => {
                        if (ERROR) {
                            CPM.die(`Could not locate ${
                                INIT_DIR.grey.underline
                            }, ${'aborting'.red}.`);
                        }
                        else {
                            console.log(`Atempting to create ${DIR_NAME.underline} directory...`);
                            process.umask(0);
                            
                            // permission all the things
                            fs.mkdir(`${INIT_DIR}/${DIR_NAME}`, 0o775, InitializePackage);
                        }
                    });
                }
                else {
                    InitializePackage();
                }
            });

        });
    } else {
        console.log("will code later")
    }

}
const CLI = require('../dist/bin/cpm-cli').default;
const TESTSUITE = {
    "config": ["CPM:INIT_DIR=/usr/local/share"],
    "help": [],
    "install": ["avocad"]
};

for (const ITEM in TESTSUITE) if (TESTSUITE.hasOwnProperty(ITEM)) {
        CLI(ITEM, ["node", "cpm", ITEM].concat(TESTSUITE[ITEM]));
}
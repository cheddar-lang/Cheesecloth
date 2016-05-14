const _CLI = require('../dist/bin/cpm-cli').default;
const CLI = function (NAME, ARG) {
    _CLI(NAME, ["node", "cpm", NAME].concat(ARG), false);
};
/* const TESTSUITE = {
    "config": ["CPM:INIT_DIR=/usr/local/share"],
    "help": [],
    "install": ["avocad"]
};

for (const ITEM in TESTSUITE) if (TESTSUITE.hasOwnProperty(ITEM)) {
    CLI(ITEM, ["node", "cpm", ITEM].concat(TESTSUITE[ITEM]));
}*/

CLI("config", ["CPM:INIT_DIR=/usr/local/share"]);
CLI("config", ["--read CPM:INIT_DIR"]);

// Help
CLI("", []);
CLI("help", []);
CLI("NON_EXISTENT_COMMAND", []);

// global installs
CLI("install", [""]);
CLI("install", ["-g", "NON_EXISTENT_PACKAGE"]);
CLI("install", ["-g", "avocad"]);
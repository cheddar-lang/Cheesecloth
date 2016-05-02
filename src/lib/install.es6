const SVN = require('node.svn');

export const ARGS = {
    OPTS: {
        "info": Boolean
    },
    SHORTHAND: {
        "i": ["--info"]
    }
};

export default function(ARGS, CPM) {
    console.log(ARGS);
    
    const PACKAGE_NAME = ARGS.argv.remain[0];
    
    // die if no package name provided.
    if (!PACKAGE_NAME)
        CPM.die('no package name provided');
    
    // Determine what to do
    if (ARGS.info) {
        // get info on package
    } else {
        // == PREFORM INSTALL ==
        
        // config.ini is located at:
        //  svn export https://github.com/cheddar-lang/cheddar-libs/trunk/<Package>/config.ini
        const PATH = `https://github.com/cheddar-lang/cheddar-libs/trunk/${PACKAGE_NAME}/config.ini`;
        
        // Hosts the download
        let MANAGER = new SVN();
        
        MANAGER.export(``)
        
        PACKAGE_NAME;
        
    }
    
}
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
    
}
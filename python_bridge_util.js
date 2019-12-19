let {PythonShell} = require('python-shell');
let py_bridge = {
    set_options:(mode,pyPath,args)=>{
        py_bridge.options = {
            mode: mode,
            pythonPath: pyPath,
            args: args
        };
    },

    start_script: (script_path) => new PythonShell(script_path, py_bridge.options),

    set_listener: (shell,event,fun) => {
        shell.on(event,fun);
    },

    terminate: (shell) => shell.terminate()
};

module.exports = py_bridge;
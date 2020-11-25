/*
* This function is not intended to be invoked directly. Instead it will be
* triggered by a client function.
* 
* Before running this sample, please:
* - create a Durable entity HTTP function
* - run 'npm install durable-functions' from the root of your app
*/

const df = require("durable-functions");

module.exports = df.entity(function (context) {
    const currentValue = context.df.getState(() => 0);
    switch (context.df.operationName) {
        case "add":
            const amount = context.df.getInput();
            const newValue = currentValue + amount;
            context.df.setState(newValue);
            context.bindings.count = { target: 'newCount', arguments: [ newValue ] };
            break;
        case "reset":
            context.df.setState(0);
            context.bindings.count = { target: 'newCount', arguments: [ 0 ] };
            break;
        case "get":
            context.df.return(currentValue);
            break;
    }
});
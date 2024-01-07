function getCurrentTime() {
    let date = new Date();
    let dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "." +
        ("00" + date.getDate()).slice(-2) + "." +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr;
}

function logging_actions(user, task, related_data, target, res_data) {

    let logText = `Timestamp: ${getCurrentTime()}\n`;
    logText += `User name: ${user}\n`;
    logText += `Task: ${task}\n`;
    logText += `Related data user sent to server: ${related_data}\n`;
    logText += `Destination service: ${target}\n`;
    logText += `Service response: ${res_data}\n`;

    return logText;
}

let a = logging_actions('Mike', 'Create Object', 'SomeJSON', '/objects/create', 'server sent back STATUS 200');
// console.log(a);


module.exports = logging_actions;
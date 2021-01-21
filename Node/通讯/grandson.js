process.send('GS to S: Hello, Papa');

process.on('message', msg => {
    console.log(`S to GS: ${msg}`);
});
setTimeout(() => {
    process.exit();
}, 2000);

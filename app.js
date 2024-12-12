import { spawn } from 'child_process';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process PID: ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    const child = spawn('node', ['index.js'], { stdio: 'inherit' });
    child.on('close', (code) => console.log(`Child process exited with code ${code}`));
    console.log(`Worker process PID: ${process.pid}`);
}

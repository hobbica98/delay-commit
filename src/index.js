#!/usr/bin/env node

const os = require("os")


const opts = require("minimist")(process.argv.slice(2), {
        boolean: ["help", "version", "push"],
        alias: {help: "h", message: "m", version: "v", time: "t", push: "p"},
        string: ["message", "time"],
    })


;(async function main() {
    if (opts.version) {
        console.log(require("../package.json").version)
        return

    }
    if (opts.help) {
        console.log(usage.join(os.EOL))
        return
    }
    if (!opts.message) {
        console.log('No message')
        return
    }
    if (!opts.time) {
        console.log('No time')
        return
    }
    if (opts.message && opts.time) {
        const {spawn} = require("child_process")
        const time = new Date().setHours(opts.time.split(":")[0], opts.time.split(":")[1], 0, 0) - new Date().getTime()
        const path = require('path')
        setTimeout(() => {
            const subprocess = spawn(
                'bash',
                [
                    '-c',
                    `git add . && git commit -m "${opts.message}"${opts.push ? ' && git push' : ''}`,
                ], {
                    stdio: ['inherit', 'inherit', 'inherit']
                }
            );
        }, time)

    }


})().catch((err) =>
    console.error(
        [red(opts.verbose ? err.trace : String(err)), os.EOL, ...usage].join(os.EOL)
    )
)

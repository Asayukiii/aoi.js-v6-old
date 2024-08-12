var createNativeFunction = require("../../dist/util/functions/createNativeFunction").default
// var { Return, ReturnType } = require("../../dist")

/**
 * Represents the executor for this function.
 * @this {import("../../dist/structures/ThisArg").ThisArg}
 * @param {import("../../dist/structures/Function").Function} fn - The compiled function.
 */
async function execute(fn) {
    return this.manage(await fn.resolveArray(this), async ([url, name]) => {
        const request = await fetch(url, {
            method: "GET"
        });

        this.setEnvironmentValue(name, await request.json())

        return this.ok(request.status);
    })
}

module.exports = createNativeFunction({
    name: "$httpGet",
    description: "Performs an http get request.",
    brackets: true,
    fields: [
        {
            name: 'URL',
            description: 'The URL to request to.',
            type: 'STRING',
            required: true
        },
        {
            name: 'Variable',
            description: 'The variable name to load the response to.',
            type: 'STRING',
            required: false,
            default: function() {
                return "res";
            }
        }
    ],
    execute
})
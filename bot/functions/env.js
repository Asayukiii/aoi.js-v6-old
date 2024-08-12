var createNativeFunction = require("../../dist/util/functions/createNativeFunction").default
var { Return, ReturnType } = require("../../dist")

/**
 * Represents the executor for this function.
 * @this {import("../../dist/structures/ThisArg").ThisArg}
 * @param {import("../../dist/structures/Function").Function} fn - The compiled function.
 */
async function execute(fn) {
    return this.manage(await fn.resolveArray(this), async ([name]) => {
        return new Return(
            ReturnType.Success,
            this.getEnvironmentValue(name)
        );
    })
}

module.exports = createNativeFunction({
    name: "$env",
    description: "Retrieves an environment value.",
    brackets: true,
    fields: [
        {
            name: 'Name',
            description: 'The environment variable name to be retrieved.',
            type: 'STRING',
            required: true
        }
    ],
    execute
})
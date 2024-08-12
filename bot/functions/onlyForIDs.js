var createNativeFunction = require("../../dist/util/functions/createNativeFunction").default
var { Return, ReturnType } = require("../../dist")

/**
 * Represents the executor for this function.
 * @this {import("../../dist/structures/ThisArg").ThisArg}
 * @param {import("../../dist/structures/Function").Function} fn - The compiled function.
 */
async function execute(fn) {
    return await this.manage(await fn.resolveArray(this), ([...ids]) => {
        const userId = this.context.getUser().id;
        if (!ids.includes(userId)) {
            return new Return(ReturnType.Break, null);
        } else return new Return(ReturnType.Success, null);
    })
}

module.exports = createNativeFunction({
    name: "$onlyForIDs",
    description: "Allows the execution of code for the given IDs.",
    brackets: true,
    fields: [
        {
            name: 'IDs',
            description: 'The Ids to allow.',
            type: 'STRING',
            required: true,
            rest: true
        }
    ],
    execute
})
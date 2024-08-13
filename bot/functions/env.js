var createNativeFunction = require("../../dist/util/functions/createNativeFunction").default
var createRuntimeError = require("../../dist/util/functions/createRuntimeError").default
var { Return, RuntimeErrorType } = require("../../dist")
var hjson = require("hjson");

/**
 * Parses a value safely.
 * @param {string} arg - The arg to be parsed.
 * @returns {unknown}
 */
const safeParse = (arg) => {
    try {
        return hjson.parse(arg)
    } catch {
        return arg
    }
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
            required: true,
            rest: true
        }
    ],
    nullable: true,
    async execute(fn) {
        return this.manage(await fn.resolveArray(this), async (properties) => {
            let data = safeParse(this.getEnvironmentValue(properties.shift()));
            
            if (typeof data !== "object" && properties.length === 0) {
                return Return.string(data);
            }

            for (const property of properties) {
                if (!Object.prototype.hasOwnProperty.call(data, property)) {
                    createRuntimeError(this, fn, RuntimeErrorType.OTHER, `Invalid property "${property}"`);
                }

                data = data?.[property];
            }

            if (typeof data !== "string") data = JSON.stringify(data);

            return Return.string(data);
        })
    }
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Return_1 = require("../structures/Return");
const createNativeFunction_1 = __importDefault(require("../util/functions/createNativeFunction"));
exports.default = (0, createNativeFunction_1.default)({
    name: '$isServerWidgetEnabled',
    description: 'Returns if the server widget images are enabled or not of a guild.',
    returns: 'BOOLEAN',
    nullable: true,
    fields: [
        {
            name: 'guildID',
            type: 'GUILD',
            required: true,
            description: 'the guild ID to check its widget images.'
        }
    ],
    brackets: true,
    optional: true,
    execute: async function (fn) {
        if (fn.hasFields()) {
            return this.manage(await fn.resolveArray(this), async (s) => {
                return Return_1.Return.string(s[0].widgetEnabled);
            });
        }
        return Return_1.Return.string(this.context.getGuild()?.widgetEnabled);
    }
});
//# sourceMappingURL=isServerWidgetEnabled.js.map
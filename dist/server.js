"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SuperDoraemonClient_1 = __importDefault(require("./SuperDoraemonClient"));
const client = new SuperDoraemonClient_1.default();
const app = (0, express_1.default)();
const PORT = 3001;
const CHANNEL_ID = '1134812036673572889';
/**
 * Sets up an Express endpoint to handle notifications and send messages to a Discord channel.
 *
 * @param {string} endpoint - The URL endpoint to listen for (e.g., '/sleep-notification').
 * @param {string} messagePrefix - The prefix for the message to be sent to Discord (e.g., 'User has fallen asleep').
 */
function handleNotification(endpoint, messagePrefix) {
    app.get(`${endpoint}`, (req, res) => {
        // Get the current time in HH:mm:ss format.
        const currentTime = new Date().toLocaleTimeString();
        // Fetch the specified Discord text channel using its ID.
        const textChannel = client.channels.cache.get(CHANNEL_ID);
        if (textChannel?.isTextBased()) {
            textChannel.send(`${messagePrefix} at ${currentTime}!`);
        }
        // Respond to the HTTP request indicating that the notification was sent to Discord.
        res.send(`${messagePrefix}. Notification sent to Discord!`);
        console.log(`!${messagePrefix}. Notification sent to Discord! ${currentTime}`);
        // User ID of the user you want to send a DM to
        const userID = '678385374195613706';
        // Fetch the user using the provided user ID
        client.users
            .fetch(userID)
            .then((user) => {
            // Send a direct message to the fetched user
            return user.send(`${messagePrefix} at ${currentTime}!`);
        })
            .then(() => {
            console.log(`${messagePrefix} at ${currentTime}!`);
        })
            .catch((error) => {
            console.error('Error sending the direct message:', error);
        });
    });
}
handleNotification('/open-notes', 'User has open notes app');
handleNotification('/open-instagram', 'User has open Instagram');
handleNotification('/sleep-notification', 'User has fallen asleep');
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
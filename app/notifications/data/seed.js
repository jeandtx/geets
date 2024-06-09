"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var faker_1 = require("@faker-js/faker");
var types = ["like", "comment", "follow", "join"];
var generateNotification = function () {
    var type = faker_1.faker.helpers.arrayElement(types);
    var notification = {
        id: faker_1.faker.string.uuid(),
        time: faker_1.faker.date.recent().toISOString(),
        userId: faker_1.faker.string.uuid(),
        userAvatar: faker_1.faker.image.avatar(),
        type: type,
    };
    switch (type) {
        case "like":
            notification.like = {
                postId: faker_1.faker.string.uuid(),
                postContent: faker_1.faker.lorem.sentence(),
            };
            break;
        case "comment":
            notification.comment = {
                postId: faker_1.faker.string.uuid(),
                commentId: faker_1.faker.string.uuid(),
                content: faker_1.faker.lorem.sentence(),
            };
            break;
        case "follow":
            notification.follow = {
                followerId: faker_1.faker.string.uuid(),
                followerName: faker_1.faker.hacker.phrase(),
                followerAvatar: faker_1.faker.image.avatar(),
            };
            break;
        case "join":
            notification.join = {
                projectId: faker_1.faker.string.uuid(),
                projectName: faker_1.faker.hacker.phrase(),
                projectAvatar: faker_1.faker.image.avatar(),
                projectOwner: faker_1.faker.hacker.phrase(),
            };
            break;
    }
    return notification;
};
var notifications = Array.from({ length: 100 }, generateNotification);
fs.writeFileSync(path.join(__dirname, "notifications.json"), JSON.stringify(notifications, null, 2));
console.log("✅ notifications data generated.");
// to run this script, run 
// npm i -g typescript
// tsc app/notifications/data/seed.ts       
// node app/notifications/data/seed.js

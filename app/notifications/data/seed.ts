import * as fs from 'fs';
import * as path from 'path';

import { faker } from '@faker-js/faker';

interface Notification {
  id: string;
  time: string;
  userId: string;
  userAvatar: string;
  type: "like" | "comment" | "follow" | "join";
  like?: {
    postId: string;
    postContent: string;
  };
  comment?: {
    postId: string;
    commentId: string;
    content: string;
  };
  follow?: {
    followerId: string;
    followerName: string;
    followerAvatar: string;
  };
  join?: {
    projectId: string;
    projectName: string;
    projectAvatar: string;
    projectOwner: string;
  };
}

const types = ["like", "comment", "follow", "join"];

const generateNotification = (): Notification => {
  const type = faker.helpers.arrayElement(types);
  const notification: Notification = {
    id: faker.string.uuid(),
    time: faker.date.recent().toISOString(),
    userId: faker.string.uuid(),
    userAvatar: faker.image.avatar(),
    type: type as Notification['type'],
  };

  switch (type) {
    case "like":
      notification.like = {
        postId: faker.string.uuid(),
        postContent: faker.lorem.sentence(),
      };
      break;
    case "comment":
      notification.comment = {
        postId: faker.string.uuid(),
        commentId: faker.string.uuid(),
        content: faker.lorem.sentence(),
      };
      break;
    case "follow":
      notification.follow = {
        followerId: faker.string.uuid(),
        followerName: faker.hacker.phrase(),
        followerAvatar: faker.image.avatar(),
      };
      break;
    case "join":
      notification.join = {
        projectId: faker.string.uuid(),
        projectName: faker.hacker.phrase(),
        projectAvatar: faker.image.avatar(),
        projectOwner: faker.hacker.phrase(),
      };
      break;
  }

  return notification;
};

const notifications = Array.from({ length: 100 }, generateNotification);

fs.writeFileSync(
  path.join(__dirname, "notifications.json"),
  JSON.stringify(notifications, null, 2)
);

console.log("✅ notifications data generated.");
// to run this script, run 
// npm i -g typescript
// tsc app/notifications/data/seed.ts       
// node app/notifications/data/seed.js
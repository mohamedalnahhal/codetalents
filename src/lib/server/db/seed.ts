import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema });

async function main() {
  console.log("Seeding Database");

  const UNI_PASS = await hash("123");

  const NUM_USERS = 100;
  const NUM_CONTESTS = 15;
  const NUM_PROBLEMS = 50;
  const NUM_TAGS = 30;
  const NUM_POSTS = 643;

  db.delete(schema.sessions);
  db.delete(schema.attachments);
  db.delete(schema.comments);
  db.delete(schema.contests);
  db.delete(schema.posts);
  db.delete(schema.problems);
  db.delete(schema.contestProblems);
  db.delete(schema.problemTags);
  db.delete(schema.tags);
  db.delete(schema.users);
  db.delete(schema.userContests);
  db.delete(schema.userLikedPosts);
  db.delete(schema.userSubmissions);
  db.delete(schema.userContestSubmissions);

  // ===== USERS =====
  const users = Array.from({ length: NUM_USERS }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.username() + faker.number.int({min: 1, max: 999999}),
    passwordHash: UNI_PASS,
    email: faker.internet.email(),
    dob: faker.date.birthdate(),
    emailVerified: faker.datatype.boolean({probability: 0.95}),
    rating: faker.number.int({ min: 0, max: 10000 }),
    theme: faker.helpers.arrayElement(['dark', 'light', 'sys']),
    ui_settings: JSON.stringify({ show_sidebar: faker.datatype.boolean() }),
    signUpMethod: "creds" as "creds",
    otherInfo: JSON.stringify({ bio: faker.lorem.sentence(), country: faker.location.country() }),
  }));
  await db.insert(schema.users).values(users);

  // ===== CONTESTS =====
  const contests = Array.from({ length: NUM_CONTESTS }).map(() => ({
    name: faker.company.name() + " Contest",
    startDate: faker.date.past({years: 1}),
    endDate: faker.date.future({years: 0.5}),
    details: faker.lorem.paragraph(),
  }));
  const insertedContests = await db.insert(schema.contests).values(contests).returning();
  
  // ===== USER ↔ CONTEST =====
  const userContests = [];
  for (const u of users) {
    const registeredContests = faker.helpers.arrayElements(insertedContests, faker.number.int({ min: 1, max: 8 }));
    for (const c of registeredContests) {
      userContests.push({
        userId: u.id,
        contestId: c.id,
        registerDate: faker.date.between({ from: c.startDate, to: c.endDate}),
        diffRating: faker.number.int({ min: -256, max: 256 }),
        rank: faker.number.int({ min: 1, max: 100 }),
      });
    }
  }
  await db.insert(schema.userContests).values(userContests);

  // ===== TAGS =====
  const tagList = Array.from({ length: NUM_TAGS }).map(() => ({
    name: faker.word.noun() + faker.number.int(),
    description: faker.lorem.sentence(),
    category: faker.word.adjective(),
  }));
  await db.insert(schema.tags).values(tagList);

  // ===== PROBLEMS =====
  const problems = Array.from({ length: NUM_PROBLEMS }).map(() => ({
    title: faker.lorem.words(5),
    problemUrl: faker.internet.url()
  }));
  const insertedProblems = await db.insert(schema.problems).values(problems).returning();

  // ===== CONTEST PROBLEMS =====


  // ===== PROBLEM ↔ TAGS =====
  const problemTagsData = [];
  for (const p of insertedProblems) {
    const tagsForProblem = faker.helpers.arrayElements(tagList, faker.number.int({ min: 1, max: 5 }));
    for (const t of tagsForProblem) {
      problemTagsData.push({ problemId: p.id, tag: t.name });
    }
  }
  await db.insert(schema.problemTags).values(problemTagsData);

  // ===== USER SUBMISSIONS =====
  const submissions = [];
  for (const p of insertedProblems) {
    const submittingUsers = faker.datatype.boolean({ probability: 0.9 }) ?
      faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 250 })) : 
      faker.helpers.arrayElements(users, faker.number.int({ min: 250, max: 650 }));
    for (const u of submittingUsers) {
      submissions.push({
        problemId: p.id,
        userId: u.id,
        verdict: faker.helpers.arrayElement(['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error']),
        submissionUrl: faker.internet.url() + faker.number.int({min: 1, max: 999999}),
      });
    }
  }
  await db.insert(schema.userSubmissions).values(submissions);

  // ===== POSTS =====
  const posts = Array.from({ length: NUM_POSTS }).map(() => ({
    userId: faker.helpers.arrayElement(users).id,
    timestamp: faker.date.recent({days: 60}),
    content: faker.lorem.paragraphs(1)
  }));
  const insertedPosts = await db.insert(schema.posts).values(posts).returning();

  // ===== ATTACHMENTS =====
  const attachments = [];
  for (const p of insertedPosts) {
    if (faker.datatype.boolean()) {
      attachments.push({
        postId: p.id,
        attachmentUrl: faker.image.url(),
      });
    }
  }
  await db.insert(schema.attachments).values(attachments);

  // ===== COMMENTS =====
  const commentsData = [];
  for (const p of insertedPosts) {
    const numComments = faker.number.int({ min: 0, max: 8 });
    for (let i = 0; i < numComments; i++) {
      commentsData.push({
        userId: faker.helpers.arrayElement(users).id,
        postId: p.id,
        content: faker.lorem.sentence()
      });
    }
  }
  const insertedComments = await db.insert(schema.comments).values(commentsData).returning();;

  // ===== USER LIKED POSTS =====
  const likedPosts = [];
  for (const p of insertedPosts) {
    const likers = faker.helpers.arrayElements(users, faker.number.int({ min: 0, max: 20 }));
    for (const u of likers) {
      likedPosts.push({ postId: p.id, userId: u.id });
    }
  }
  await db.insert(schema.userLikedPosts).values(likedPosts);

  // ===== USER LIKED COMMENTS =====
  const likedComments = [];
  for (const c of insertedComments) {
    const likers = faker.helpers.arrayElements(users, faker.number.int({ min: 0, max: 20 }));
    for (const u of likers) {
      likedComments.push({ commentId: c.id, userId: u.id });
    }
  }
  await db.insert(schema.userLikedComments).values(likedComments);

  console.log("Database seeded successfully!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

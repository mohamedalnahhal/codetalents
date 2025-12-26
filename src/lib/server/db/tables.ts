import {
  pgTable,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
  primaryKey,
  jsonb,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", [
  "user",
  "admin"
]);

export const userSignUpMethode = pgEnum("user_sign_up_method", [
  "creds",
  "google"
]);

export const uiTheme = pgEnum("ui_theme", [
  "dark",
  "light",
  "sys"
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  passwordHash: text("password_hash"),
  role: userRole("role").default("user").notNull(),
  dob: timestamp("dob").notNull(),
  rating: integer("rating").default(0).notNull(),
  theme: uiTheme("theme").default("sys").notNull(),
  generalSettings: jsonb("general_settings"),
  uiSettings: jsonb("ui_settings"),
  signUpMethod: userSignUpMethode("sign_up_method").notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  emailNotifications: boolean("email_notifications").default(true).notNull(),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
  otherInfo: jsonb("other_info"),
});

// TODO: create notifications & dms (direct messages) tables

export const sessions = pgTable("sessions", {
  // TODO: is postgres random uuid secure random
  id: text("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  secretHash: text("secret_hash").notNull(),
  lastVerifiedAt: timestamp("last_verified_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const contests = pgTable("contests", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isFinished: boolean("is_finished").default(false).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userContests = pgTable("user_contests",
  {
    userId: uuid("user_id").references(() => users.id).notNull(),
    contestId: uuid("contest_id").references(() => contests.id).notNull(),
    registerDate: timestamp("register_date").notNull(),
    diffRating: integer("diff_rating"),
    rank: integer("rank"),
  },
  (table) => ([primaryKey({ columns: [table.userId, table.contestId] })])
);

export const contestProblems = pgTable("contest_problems", {
  id: uuid("id").primaryKey().defaultRandom(),
  problemId: uuid("problem_id").references(() => problems.id).notNull(),
  contestId: uuid("contest_id").references(() => contests.id).notNull(),
  points: integer("points").notNull(),
  contestAttemptCount: integer("contest_attempt_count").notNull().default(0),
  contestSolvedCount: integer("contest_solved_count").notNull().default(0)
});

export const problems = pgTable("problems", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  attemptCount: integer("attempt_count").notNull().default(0),
  solvedCount: integer("solved_count").notNull().default(0),
  problemUrl: varchar("problem_url", { length: 500 }).notNull().unique(),
  isPublic: boolean("is_public").default(false).notNull(),
  originContestId: uuid("origin_contest_id").references(() => contests.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const tags = pgTable("tags", {
  name: varchar("name", { length: 50 }).primaryKey(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
});

export const problemTags = pgTable("problem_tags",
  {
    problemId: uuid("problem_id").references(() => problems.id).notNull(),
    tag: varchar("tag", { length: 50 }).references(() => tags.name).notNull(),
  },
  (table) => ([primaryKey({ columns: [table.problemId, table.tag] })])
);

export const userContestSubmissions = pgTable("user_contest_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  contestProblemId: uuid("contest_problem_id").references(() => contestProblems.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  verdict: varchar("verdict", { length: 20 }).notNull(),
  timeTaken: integer("time_taken").notNull(),
  diffPoints: integer("diff_points").notNull(),
  submissionUrl: varchar("submission_url", { length: 500 }).notNull().unique(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});

export const userSubmissions = pgTable("user_submissions",{
  id: uuid("id").primaryKey().defaultRandom(),
  problemId: uuid("problem_id").references(() => problems.id).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  verdict: varchar("verdict", { length: 20 }).notNull(),
  submissionUrl: varchar("submission_url", { length: 500 }).notNull().unique(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  content: text("content").notNull(),
  likeCounter: integer("like_counter").notNull().default(0),
});

export const attachments = pgTable("attachments", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id").references(() => posts.id).notNull(),
  attachmentUrl: varchar("attachment_url", { length: 500 }).notNull().unique(),
});

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  postId: uuid("post_id").references(() => posts.id).notNull(),
  content: text("content").notNull(),
  // TODO: fix this
  // replyTo: uuid("reply_to").references(()=>comments.id),
  likeCounter: integer("like_counter").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userLikedPosts = pgTable("user_liked_posts",
  {
    postId: uuid("post_id").references(() => posts.id).notNull(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    timestamp: timestamp("timestamp").defaultNow().notNull()
  },
  (table) => ([primaryKey({ columns: [table.postId, table.userId] })])
);

export const userLikedComments = pgTable("user_liked_comments",
  {
    commentId: uuid("comment_id").references(() => comments.id).notNull(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    timestamp: timestamp("timestamp").defaultNow().notNull()
  },
  (table) => ([primaryKey({ columns: [table.commentId, table.userId] })])
);
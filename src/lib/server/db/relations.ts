// src/lib/server/db/relations.ts
import { relations } from "drizzle-orm";
import {
  users,
  contests,
  userContests,
  problems,
  tags,
  problemTags,
  userSubmissions,
  posts,
  attachments,
  comments,
  userLikedPosts,
  contestProblems,
  userContestSubmissions,
  userLikedComments,
  sessions,
} from "./tables";

/**
 * USER relations
 */
export const usersRelations = relations(users, ({ many }) => ({
  contests: many(userContests),
  submissions: many(userSubmissions),
  contestSubmissions: many(userContestSubmissions),
  posts: many(posts),
  comments: many(comments),
  likedPosts: many(userLikedPosts),
  likedComments: many(userLikedComments),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  })
}));

/**
 * CONTEST relations
 */
export const contestsRelations = relations(contests, ({ many }) => ({
  participants: many(userContests),
  contestProblems: many(contestProblems),
  problems: many(problems),
}));

/**
 * USER_CONTEST (pivot) relations
 */
export const userContestsRelations = relations(userContests, ({ one }) => ({
  user: one(users, {
    fields: [userContests.userId],
    references: [users.id],
  }),
  contest: one(contests, {
    fields: [userContests.contestId],
    references: [contests.id],
  }),
}));

export const contestProblemsRelations = relations(contestProblems, ({ one, many }) => ({
  submissions: many(userContestSubmissions),
  contest: one(contests, {
    fields: [contestProblems.contestId],
    references: [contests.id],
  }),
  problem: one(problems, {
    fields: [contestProblems.problemId],
    references: [problems.id],
  }),
}))

/**
 * PROBLEM relations
 */
export const problemsRelations = relations(problems, ({ one, many }) => ({
  // problem -> problem_tags pivot (many)
  tags: many(problemTags),
  // problem -> user_submission (many submissions for a problem)
  submissions: many(userSubmissions),
  orignContest: one(contests, {
    fields: [problems.originContestId],
    references: [contests.id],
  }),
}));

/**
 * TAGS relations
 */
export const tagsRelations = relations(tags, ({ many }) => ({
  // tag -> problem_tags (many)
  problemTags: many(problemTags),
}));

/**
 * PROBLEM_TAGS (pivot) relations
 */
export const problemTagsRelations = relations(problemTags, ({ one }) => ({
  problem: one(problems, {
    fields: [problemTags.problemId],
    references: [problems.id],
  }),
  tag: one(tags, {
    fields: [problemTags.tag],
    references: [tags.name],
  }),
}));

/**
 * USER_SUBMISSION relations
 */
export const userContestSubmissionsRelations = relations(userContestSubmissions, ({ one }) => ({
  contestProblem: one(contestProblems, {
    fields: [userContestSubmissions.contestProblemId],
    references: [contestProblems.id],
  }),
  user: one(users, {
    fields: [userContestSubmissions.userId],
    references: [users.id],
  }),
}));

/**
 * USER_SUBMISSION relations
 */
export const userSubmissionsRelations = relations(userSubmissions, ({ one }) => ({
  problem: one(problems, {
    fields: [userSubmissions.problemId],
    references: [problems.id],
  }),
  user: one(users, {
    fields: [userSubmissions.userId],
    references: [users.id],
  }),
}));

/**
 * POST relations
 */
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  attachments: many(attachments),
  comments: many(comments),
  likedBy: many(userLikedPosts),
}));

/**
 * ATTACHMENT relations
 */
export const attachmentsRelations = relations(attachments, ({ one }) => ({
  post: one(posts, {
    fields: [attachments.postId],
    references: [posts.id],
  }),
}));

/**
 * COMMENTS relations
 */
export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  likedBy: many(userLikedComments),
}));

/**
 * USER_LIKED_POST relations (pivot)
 */
export const userLikedPostsRelations = relations(userLikedPosts, ({ one }) => ({
  post: one(posts, {
    fields: [userLikedPosts.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [userLikedPosts.userId],
    references: [users.id],
  }),
}));

export const userLikedCommentsRelations = relations(userLikedComments, ({ one }) => ({
  comment: one(comments, {
    fields: [userLikedComments.commentId],
    references: [comments.id],
  }),
  user: one(users, {
    fields: [userLikedComments.userId],
    references: [users.id],
  }),
}));
import { pgTable, text, serial, integer, boolean, timestamp, json, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema - base for both freelancers and clients
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  userType: text("user_type").notNull(), // 'freelancer' or 'client'
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Freelancer profile schema
export const freelancerProfiles = pgTable("freelancer_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(), // e.g., "UI/UX Designer"
  bio: text("bio"),
  skills: text("skills").array(), // Array of skills
  experience: text("experience"),
  hourlyRate: integer("hourly_rate"),
  portfolio: text("portfolio").array(), // Array of portfolio URLs
  availability: text("availability"), // e.g., "Full-time", "Part-time"
  averageRating: doublePrecision("average_rating").default(0),
  totalReviews: integer("total_reviews").default(0),
});

export const insertFreelancerProfileSchema = createInsertSchema(freelancerProfiles).omit({
  id: true,
  averageRating: true,
  totalReviews: true,
});

// Client profile schema
export const clientProfiles = pgTable("client_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  companyName: text("company_name"),
  industry: text("industry"),
  description: text("description"),
  websiteUrl: text("website_url"),
});

export const insertClientProfileSchema = createInsertSchema(clientProfiles).omit({
  id: true,
});

// Job posting schema
export const jobPostings = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredSkills: text("required_skills").array(),
  budget: integer("budget"),
  duration: text("duration"), // e.g., "2-3 months", "Ongoing"
  location: text("location"), // e.g., "Remote", "Flexible", "On-site"
  status: text("status").default("open"), // "open", "in-progress", "closed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobPostingSchema = createInsertSchema(jobPostings).omit({
  id: true,
  createdAt: true,
});

// Project schema (when a job is assigned to a freelancer)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull().references(() => jobPostings.id),
  freelancerId: integer("freelancer_id").notNull().references(() => users.id),
  clientId: integer("client_id").notNull().references(() => users.id),
  status: text("status").default("in-progress"), // "in-progress", "review", "completed"
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"),
  budget: integer("budget").notNull(),
  paymentStatus: text("payment_status").default("pending"), // "pending", "paid"
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

// Messages between users
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

// Reviews for freelancers
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  reviewerId: integer("reviewer_id").notNull().references(() => users.id), // Client id
  freelancerId: integer("freelancer_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

// Types for frontend use
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFreelancerProfile = z.infer<typeof insertFreelancerProfileSchema>;
export type FreelancerProfile = typeof freelancerProfiles.$inferSelect;

export type InsertClientProfile = z.infer<typeof insertClientProfileSchema>;
export type ClientProfile = typeof clientProfiles.$inferSelect;

export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;
export type JobPosting = typeof jobPostings.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

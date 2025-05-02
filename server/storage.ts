import { users, User, InsertUser, freelancerProfiles, FreelancerProfile, InsertFreelancerProfile, clientProfiles, ClientProfile, InsertClientProfile, jobPostings, JobPosting, InsertJobPosting, projects, Project, InsertProject, messages, Message, InsertMessage, reviews, Review, InsertReview } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db, pool } from "./db";
import { eq, and, or, desc } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Freelancer profile operations
  getFreelancerProfile(userId: number): Promise<FreelancerProfile | undefined>;
  createFreelancerProfile(profile: InsertFreelancerProfile): Promise<FreelancerProfile>;
  updateFreelancerProfile(userId: number, profile: Partial<FreelancerProfile>): Promise<FreelancerProfile | undefined>;
  getAllFreelancers(): Promise<(User & { profile?: FreelancerProfile })[]>;
  
  // Client profile operations
  getClientProfile(userId: number): Promise<ClientProfile | undefined>;
  createClientProfile(profile: InsertClientProfile): Promise<ClientProfile>;
  updateClientProfile(userId: number, profile: Partial<ClientProfile>): Promise<ClientProfile | undefined>;
  
  // Job posting operations
  getJobPosting(id: number): Promise<JobPosting | undefined>;
  createJobPosting(posting: InsertJobPosting): Promise<JobPosting>;
  updateJobPosting(id: number, posting: Partial<JobPosting>): Promise<JobPosting | undefined>;
  getAllJobPostings(): Promise<JobPosting[]>;
  getClientJobPostings(clientId: number): Promise<JobPosting[]>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | undefined>;
  getClientProjects(clientId: number): Promise<(Project & { job?: JobPosting })[]>;
  getFreelancerProjects(freelancerId: number): Promise<(Project & { job?: JobPosting })[]>;
  
  // Message operations
  getMessages(senderId: number, receiverId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  getFreelancerReviews(freelancerId: number): Promise<Review[]>;
  
  // Session store for authentication
  sessionStore: any; // Using any type to avoid SessionStore type issues
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private freelancerProfilesMap: Map<number, FreelancerProfile>;
  private clientProfilesMap: Map<number, ClientProfile>;
  private jobPostingsMap: Map<number, JobPosting>;
  private projectsMap: Map<number, Project>;
  private messagesMap: Map<number, Message>;
  private reviewsMap: Map<number, Review>;
  
  private userIdCounter: number;
  private freelancerProfileIdCounter: number;
  private clientProfileIdCounter: number;
  private jobPostingIdCounter: number;
  private projectIdCounter: number;
  private messageIdCounter: number;
  private reviewIdCounter: number;
  
  sessionStore: any;

  constructor() {
    this.usersMap = new Map();
    this.freelancerProfilesMap = new Map();
    this.clientProfilesMap = new Map();
    this.jobPostingsMap = new Map();
    this.projectsMap = new Map();
    this.messagesMap = new Map();
    this.reviewsMap = new Map();
    
    this.userIdCounter = 1;
    this.freelancerProfileIdCounter = 1;
    this.clientProfileIdCounter = 1;
    this.jobPostingIdCounter = 1;
    this.projectIdCounter = 1;
    this.messageIdCounter = 1;
    this.reviewIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.usersMap.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.usersMap.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...userData, id, createdAt: now };
    this.usersMap.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.usersMap.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = { ...user, ...userData };
    this.usersMap.set(id, updatedUser);
    return updatedUser;
  }

  // Freelancer profile operations
  async getFreelancerProfile(userId: number): Promise<FreelancerProfile | undefined> {
    for (const profile of this.freelancerProfilesMap.values()) {
      if (profile.userId === userId) {
        return profile;
      }
    }
    return undefined;
  }

  async createFreelancerProfile(profileData: InsertFreelancerProfile): Promise<FreelancerProfile> {
    const id = this.freelancerProfileIdCounter++;
    const profile: FreelancerProfile = { 
      ...profileData, 
      id,
      averageRating: 0,
      totalReviews: 0
    };
    this.freelancerProfilesMap.set(id, profile);
    return profile;
  }

  async updateFreelancerProfile(userId: number, profileData: Partial<FreelancerProfile>): Promise<FreelancerProfile | undefined> {
    for (const [id, profile] of this.freelancerProfilesMap.entries()) {
      if (profile.userId === userId) {
        const updatedProfile: FreelancerProfile = { ...profile, ...profileData };
        this.freelancerProfilesMap.set(id, updatedProfile);
        return updatedProfile;
      }
    }
    return undefined;
  }

  async getAllFreelancers(): Promise<(User & { profile?: FreelancerProfile })[]> {
    const freelancers: (User & { profile?: FreelancerProfile })[] = [];
    
    for (const user of this.usersMap.values()) {
      if (user.userType === 'freelancer') {
        const profile = await this.getFreelancerProfile(user.id);
        freelancers.push({ ...user, profile });
      }
    }
    
    return freelancers;
  }

  // Client profile operations
  async getClientProfile(userId: number): Promise<ClientProfile | undefined> {
    for (const profile of this.clientProfilesMap.values()) {
      if (profile.userId === userId) {
        return profile;
      }
    }
    return undefined;
  }

  async createClientProfile(profileData: InsertClientProfile): Promise<ClientProfile> {
    const id = this.clientProfileIdCounter++;
    const profile: ClientProfile = { ...profileData, id };
    this.clientProfilesMap.set(id, profile);
    return profile;
  }

  async updateClientProfile(userId: number, profileData: Partial<ClientProfile>): Promise<ClientProfile | undefined> {
    for (const [id, profile] of this.clientProfilesMap.entries()) {
      if (profile.userId === userId) {
        const updatedProfile: ClientProfile = { ...profile, ...profileData };
        this.clientProfilesMap.set(id, updatedProfile);
        return updatedProfile;
      }
    }
    return undefined;
  }

  // Job posting operations
  async getJobPosting(id: number): Promise<JobPosting | undefined> {
    return this.jobPostingsMap.get(id);
  }

  async createJobPosting(postingData: InsertJobPosting): Promise<JobPosting> {
    const id = this.jobPostingIdCounter++;
    const now = new Date();
    const posting: JobPosting = { ...postingData, id, createdAt: now };
    this.jobPostingsMap.set(id, posting);
    return posting;
  }

  async updateJobPosting(id: number, postingData: Partial<JobPosting>): Promise<JobPosting | undefined> {
    const posting = this.jobPostingsMap.get(id);
    if (!posting) return undefined;
    
    const updatedPosting: JobPosting = { ...posting, ...postingData };
    this.jobPostingsMap.set(id, updatedPosting);
    return updatedPosting;
  }

  async getAllJobPostings(): Promise<JobPosting[]> {
    return Array.from(this.jobPostingsMap.values());
  }

  async getClientJobPostings(clientId: number): Promise<JobPosting[]> {
    return Array.from(this.jobPostingsMap.values())
      .filter(posting => posting.clientId === clientId);
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsMap.get(id);
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const now = new Date();
    const project: Project = { 
      ...projectData, 
      id, 
      startDate: now,
      endDate: null
    };
    this.projectsMap.set(id, project);
    return project;
  }

  async updateProject(id: number, projectData: Partial<Project>): Promise<Project | undefined> {
    const project = this.projectsMap.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = { ...project, ...projectData };
    this.projectsMap.set(id, updatedProject);
    return updatedProject;
  }

  async getClientProjects(clientId: number): Promise<(Project & { job?: JobPosting })[]> {
    return Array.from(this.projectsMap.values())
      .filter(project => project.clientId === clientId)
      .map(project => {
        const job = this.jobPostingsMap.get(project.jobId);
        return { ...project, job };
      });
  }

  async getFreelancerProjects(freelancerId: number): Promise<(Project & { job?: JobPosting })[]> {
    return Array.from(this.projectsMap.values())
      .filter(project => project.freelancerId === freelancerId)
      .map(project => {
        const job = this.jobPostingsMap.get(project.jobId);
        return { ...project, job };
      });
  }

  // Message operations
  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return Array.from(this.messagesMap.values())
      .filter(message => 
        (message.senderId === senderId && message.receiverId === receiverId) || 
        (message.senderId === receiverId && message.receiverId === senderId)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const now = new Date();
    const message: Message = { ...messageData, id, createdAt: now };
    this.messagesMap.set(id, message);
    return message;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messagesMap.get(id);
    if (!message) return undefined;
    
    const updatedMessage: Message = { ...message, read: true };
    this.messagesMap.set(id, updatedMessage);
    return updatedMessage;
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviewsMap.get(id);
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const now = new Date();
    const review: Review = { ...reviewData, id, createdAt: now };
    this.reviewsMap.set(id, review);
    
    // Update freelancer's average rating
    const freelancerProfile = await this.getFreelancerProfile(reviewData.freelancerId);
    if (freelancerProfile) {
      const reviews = await this.getFreelancerReviews(reviewData.freelancerId);
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      
      await this.updateFreelancerProfile(reviewData.freelancerId, {
        averageRating,
        totalReviews: reviews.length
      });
    }
    
    return review;
  }

  async getFreelancerReviews(freelancerId: number): Promise<Review[]> {
    return Array.from(this.reviewsMap.values())
      .filter(review => review.freelancerId === freelancerId);
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Freelancer profile operations
  async getFreelancerProfile(userId: number): Promise<FreelancerProfile | undefined> {
    const [profile] = await db
      .select()
      .from(freelancerProfiles)
      .where(eq(freelancerProfiles.userId, userId));
    return profile;
  }

  async createFreelancerProfile(profileData: InsertFreelancerProfile): Promise<FreelancerProfile> {
    const [profile] = await db
      .insert(freelancerProfiles)
      .values({
        ...profileData,
        averageRating: 0,
        totalReviews: 0
      })
      .returning();
    return profile;
  }

  async updateFreelancerProfile(userId: number, profileData: Partial<FreelancerProfile>): Promise<FreelancerProfile | undefined> {
    const [updatedProfile] = await db
      .update(freelancerProfiles)
      .set(profileData)
      .where(eq(freelancerProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }

  async getAllFreelancers(): Promise<(User & { profile?: FreelancerProfile })[]> {
    const freelancerUsers = await db
      .select()
      .from(users)
      .where(eq(users.userType, 'freelancer'));
    
    const result: (User & { profile?: FreelancerProfile })[] = [];
    
    for (const user of freelancerUsers) {
      const profile = await this.getFreelancerProfile(user.id);
      result.push({ ...user, profile });
    }
    
    return result;
  }

  // Client profile operations
  async getClientProfile(userId: number): Promise<ClientProfile | undefined> {
    const [profile] = await db
      .select()
      .from(clientProfiles)
      .where(eq(clientProfiles.userId, userId));
    return profile;
  }

  async createClientProfile(profileData: InsertClientProfile): Promise<ClientProfile> {
    const [profile] = await db
      .insert(clientProfiles)
      .values(profileData)
      .returning();
    return profile;
  }

  async updateClientProfile(userId: number, profileData: Partial<ClientProfile>): Promise<ClientProfile | undefined> {
    const [updatedProfile] = await db
      .update(clientProfiles)
      .set(profileData)
      .where(eq(clientProfiles.userId, userId))
      .returning();
    return updatedProfile;
  }

  // Job posting operations
  async getJobPosting(id: number): Promise<JobPosting | undefined> {
    const [jobPosting] = await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.id, id));
    return jobPosting;
  }

  async createJobPosting(postingData: InsertJobPosting): Promise<JobPosting> {
    const [jobPosting] = await db
      .insert(jobPostings)
      .values(postingData)
      .returning();
    return jobPosting;
  }

  async updateJobPosting(id: number, postingData: Partial<JobPosting>): Promise<JobPosting | undefined> {
    const [updatedJobPosting] = await db
      .update(jobPostings)
      .set(postingData)
      .where(eq(jobPostings.id, id))
      .returning();
    return updatedJobPosting;
  }

  async getAllJobPostings(): Promise<JobPosting[]> {
    return db.select().from(jobPostings);
  }

  async getClientJobPostings(clientId: number): Promise<JobPosting[]> {
    return db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.clientId, clientId));
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project;
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(projectData)
      .returning();
    return project;
  }

  async updateProject(id: number, projectData: Partial<Project>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(projectData)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async getClientProjects(clientId: number): Promise<(Project & { job?: JobPosting })[]> {
    const clientProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.clientId, clientId));
    
    const result: (Project & { job?: JobPosting })[] = [];
    
    for (const project of clientProjects) {
      const job = await this.getJobPosting(project.jobId);
      result.push({ ...project, job });
    }
    
    return result;
  }

  async getFreelancerProjects(freelancerId: number): Promise<(Project & { job?: JobPosting })[]> {
    const freelancerProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.freelancerId, freelancerId));
    
    const result: (Project & { job?: JobPosting })[] = [];
    
    for (const project of freelancerProjects) {
      const job = await this.getJobPosting(project.jobId);
      result.push({ ...project, job });
    }
    
    return result;
  }

  // Message operations
  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return db
      .select()
      .from(messages)
      .where(
        or(
          and(
            eq(messages.senderId, senderId),
            eq(messages.receiverId, receiverId)
          ),
          and(
            eq(messages.senderId, receiverId),
            eq(messages.receiverId, senderId)
          )
        )
      )
      .orderBy(messages.createdAt);
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(messageData)
      .returning();
    return message;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [updatedMessage] = await db
      .update(messages)
      .set({ read: true })
      .where(eq(messages.id, id))
      .returning();
    return updatedMessage;
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    const [review] = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, id));
    return review;
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const [review] = await db
      .insert(reviews)
      .values(reviewData)
      .returning();
    
    // Update freelancer's average rating
    const freelancerReviews = await this.getFreelancerReviews(reviewData.freelancerId);
    if (freelancerReviews.length > 0) {
      const totalRating = freelancerReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / freelancerReviews.length;
      
      await this.updateFreelancerProfile(reviewData.freelancerId, {
        averageRating,
        totalReviews: freelancerReviews.length
      });
    }
    
    return review;
  }

  async getFreelancerReviews(freelancerId: number): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(eq(reviews.freelancerId, freelancerId));
  }
}

// Use the DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertJobPostingSchema, insertMessageSchema, insertProjectSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Freelancer routes
  app.get("/api/freelancers", async (req, res, next) => {
    try {
      const freelancers = await storage.getAllFreelancers();
      res.json(freelancers);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/freelancers/:id/profile", async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user || user.userType !== 'freelancer') {
        return res.status(404).json({ message: "Freelancer not found" });
      }

      const profile = await storage.getFreelancerProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Freelancer profile not found" });
      }

      res.json({ user, profile });
    } catch (error) {
      next(error);
    }
  });

  // Client routes
  app.get("/api/clients/:id/profile", async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(userId);
      if (!user || user.userType !== 'client') {
        return res.status(404).json({ message: "Client not found" });
      }

      const profile = await storage.getClientProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Client profile not found" });
      }

      res.json({ user, profile });
    } catch (error) {
      next(error);
    }
  });

  // Job posting routes
  app.get("/api/jobs", async (req, res, next) => {
    try {
      const jobs = await storage.getAllJobPostings();
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/jobs/:id", async (req, res, next) => {
    try {
      const jobId = parseInt(req.params.id);
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }

      const job = await storage.getJobPosting(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/jobs", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as any;
      if (user.userType !== 'client') {
        return res.status(403).json({ message: "Only clients can post jobs" });
      }

      // Validate request body
      const result = insertJobPostingSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid job posting data", errors: result.error.format() });
      }

      const jobPosting = await storage.createJobPosting({
        ...result.data,
        clientId: user.id,
      });

      res.status(201).json(jobPosting);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/clients/:id/jobs", async (req, res, next) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({ message: "Invalid client ID" });
      }

      const jobs = await storage.getClientJobPostings(clientId);
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  });

  // Project routes
  app.get("/api/projects/:id", async (req, res, next) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/projects", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as any;
      if (user.userType !== 'client') {
        return res.status(403).json({ message: "Only clients can create projects" });
      }

      // Validate request body
      const result = insertProjectSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid project data", errors: result.error.format() });
      }

      // Make sure the job exists and belongs to this client
      const job = await storage.getJobPosting(result.data.jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      if (job.clientId !== user.id) {
        return res.status(403).json({ message: "You do not own this job" });
      }

      // Create the project
      const project = await storage.createProject({
        ...result.data,
        clientId: user.id,
      });

      // Update the job status to in-progress
      await storage.updateJobPosting(job.id, { status: "in-progress" });

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/clients/:id/projects", async (req, res, next) => {
    try {
      const clientId = parseInt(req.params.id);
      if (isNaN(clientId)) {
        return res.status(400).json({ message: "Invalid client ID" });
      }

      const projects = await storage.getClientProjects(clientId);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/freelancers/:id/projects", async (req, res, next) => {
    try {
      const freelancerId = parseInt(req.params.id);
      if (isNaN(freelancerId)) {
        return res.status(400).json({ message: "Invalid freelancer ID" });
      }

      const projects = await storage.getFreelancerProjects(freelancerId);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/projects/:id", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const user = req.user as any;
      if (user.id !== project.clientId && user.id !== project.freelancerId) {
        return res.status(403).json({ message: "You do not have permission to update this project" });
      }

      // Update the project
      const updatedProject = await storage.updateProject(projectId, req.body);
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  });

  // Message routes
  app.get("/api/messages/:userId", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const currentUserId = (req.user as any).id;
      const otherUserId = parseInt(req.params.userId);
      if (isNaN(otherUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const messages = await storage.getMessages(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/messages", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const sender = req.user as any;

      // Validate request body
      const result = insertMessageSchema.safeParse({
        ...req.body,
        senderId: sender.id
      });
      if (!result.success) {
        return res.status(400).json({ message: "Invalid message data", errors: result.error.format() });
      }

      // Make sure the receiver exists
      const receiver = await storage.getUser(result.data.receiverId);
      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found" });
      }

      const message = await storage.createMessage(result.data);
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  });

  // Review routes
  app.get("/api/freelancers/:id/reviews", async (req, res, next) => {
    try {
      const freelancerId = parseInt(req.params.id);
      if (isNaN(freelancerId)) {
        return res.status(400).json({ message: "Invalid freelancer ID" });
      }

      const reviews = await storage.getFreelancerReviews(freelancerId);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/reviews", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as any;
      if (user.userType !== 'client') {
        return res.status(403).json({ message: "Only clients can leave reviews" });
      }

      // Validate request body
      const result = insertReviewSchema.safeParse({
        ...req.body,
        reviewerId: user.id
      });
      if (!result.success) {
        return res.status(400).json({ message: "Invalid review data", errors: result.error.format() });
      }

      // Make sure the project exists and belongs to this client
      const project = await storage.getProject(result.data.projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      if (project.clientId !== user.id) {
        return res.status(403).json({ message: "You do not own this project" });
      }
      if (project.freelancerId !== result.data.freelancerId) {
        return res.status(400).json({ message: "Freelancer ID does not match project's freelancer" });
      }

      const review = await storage.createReview(result.data);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  });

  // Dashboard data
  app.get("/api/dashboard", async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as any;
      let data: any = { user };

      if (user.userType === 'freelancer') {
        const profile = await storage.getFreelancerProfile(user.id);
        const projects = await storage.getFreelancerProjects(user.id);
        const activeProjects = projects.filter(project => project.status !== 'completed');
        const completedProjects = projects.filter(project => project.status === 'completed');
        const reviews = await storage.getFreelancerReviews(user.id);
        
        // Get available jobs that match freelancer's skills
        const jobs = await storage.getAllJobPostings();
        const matchingJobs = jobs.filter(job => 
          job.status === 'open' && 
          profile?.skills?.some(skill => 
            job.requiredSkills?.includes(skill) || false
          )
        );

        data = {
          ...data,
          profile,
          stats: {
            totalMatches: matchingJobs.length,
            activeProjects: activeProjects.length,
            completedJobs: completedProjects.length,
            averageRating: profile?.averageRating || 0
          },
          activeProjects,
          matchingJobs,
          reviews
        };
      } else if (user.userType === 'client') {
        const profile = await storage.getClientProfile(user.id);
        const projects = await storage.getClientProjects(user.id);
        const activeProjects = projects.filter(project => project.status !== 'completed');
        const completedProjects = projects.filter(project => project.status === 'completed');
        const jobPostings = await storage.getClientJobPostings(user.id);
        
        // Get freelancers that match client's job requirements
        const freelancers = await storage.getAllFreelancers();
        const matchingFreelancers = freelancers.filter(freelancer => 
          freelancer.profile?.skills?.some(skill => 
            jobPostings.some(job => 
              job.requiredSkills?.includes(skill) || false
            )
          )
        );

        data = {
          ...data,
          profile,
          stats: {
            totalMatches: matchingFreelancers.length,
            activeProjects: activeProjects.length,
            completedJobs: completedProjects.length,
            postedJobs: jobPostings.length
          },
          activeProjects,
          jobPostings,
          matchingFreelancers
        };
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

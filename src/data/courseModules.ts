export interface CourseContent {
  id: string;
  type: 'video' | 'reading' | 'quiz' | 'assessment' | 'project';
  title: string;
  description: string;
  duration?: string;
  url?: string;
  content?: string;
  questions?: QuizQuestion[];
  requirements?: string[];
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  status: "locked" | "available" | "in-progress" | "completed";
  hasVideo: boolean;
  hasQuiz: boolean;
  hasAssessment: boolean;
  hasProject: boolean;
  xp: number;
  estimatedTime: string;
  prerequisites: number[];
  content: CourseContent[];
  progress: number;
  week: number;
}

export const courseModules: CourseModule[] = [
  // WEEK 1 - Foundation (3 modules)
  {
    id: 1,
    title: "Introduction & Setup",
    description: "Get started with the fundamentals of backend development",
    status: "available",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: false,
    hasProject: false,
    xp: 100,
    estimatedTime: "2-3 hours",
    prerequisites: [],
    progress: 0,
    week: 1,
    content: [
      {
        id: "intro-video",
        type: "video",
        title: "Welcome to Backend Development",
        description: "Introduction to backend development concepts and career paths",
        duration: "15 minutes",
        url: "https://www.youtube.com/watch?v=Z1qyvQsjK5Y",
        completed: false
      },
      {
        id: "setup-reading",
        type: "reading",
        title: "Development Environment Setup",
        description: "Learn how to set up your development environment",
        content: `
# Development Environment Setup

## Prerequisites
- Node.js (v18 or higher)
- Git
- VS Code or your preferred editor
- MongoDB (for database)

## Installation Steps

### 1. Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### 2. Install Git
Download Git from [git-scm.com](https://git-scm.com/)

### 3. Install VS Code
Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)

### 4. Install MongoDB
Follow the installation guide for your operating system at [mongodb.com](https://www.mongodb.com/)

## Verification
Run these commands to verify your installation:
\`\`\`bash
node --version
npm --version
git --version
\`\`\`

All commands should return version numbers without errors.
        `,
        completed: false
      },
      {
        id: "intro-quiz",
        type: "quiz",
        title: "Introduction Quiz",
        description: "Test your understanding of backend development basics",
        questions: [
          {
            id: "q1",
            question: "What is backend development?",
            options: [
              "Creating user interfaces",
              "Building server-side applications and APIs",
              "Designing websites",
              "Managing databases only"
            ],
            correctAnswer: 1,
            explanation: "Backend development involves building server-side applications, APIs, and managing data processing."
          },
          {
            id: "q2",
            question: "Which of the following is NOT a backend technology?",
            options: [
              "Node.js",
              "Express.js",
              "React",
              "MongoDB"
            ],
            correctAnswer: 2,
            explanation: "React is a frontend library, while Node.js, Express.js, and MongoDB are backend technologies."
          },
          {
            id: "q3",
            question: "What does API stand for?",
            options: [
              "Application Programming Interface",
              "Advanced Programming Integration",
              "Automated Process Interface",
              "Application Process Integration"
            ],
            correctAnswer: 0,
            explanation: "API stands for Application Programming Interface, which allows different software applications to communicate."
          }
        ],
        completed: false
      }
    ]
  },
  {
    id: 2,
    title: "Core Concepts",
    description: "Master the essential concepts of backend development",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 150,
    estimatedTime: "4-5 hours",
    prerequisites: [1],
    progress: 0,
    week: 1,
    content: [
      {
        id: "http-video",
        type: "video",
        title: "HTTP Protocol Fundamentals",
        description: "Understanding HTTP methods, status codes, and headers",
        duration: "25 minutes",
        url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0",
        completed: false
      },
      {
        id: "rest-reading",
        type: "reading",
        title: "REST API Design Principles",
        description: "Learn the principles of designing RESTful APIs",
        content: `
# REST API Design Principles

## What is REST?
REST (Representational State Transfer) is an architectural style for designing networked applications.

## Key Principles

### 1. Stateless
Each request from client to server must contain all information needed to understand the request.

### 2. Client-Server Architecture
The client and server are separate concerns, allowing them to evolve independently.

### 3. Cacheable
Responses must define themselves as cacheable or non-cacheable.

### 4. Uniform Interface
A uniform interface between components simplifies the architecture.

### 5. Layered System
The system is composed of hierarchical layers with specific responsibilities.

## HTTP Methods
- GET: Retrieve data
- POST: Create new resources
- PUT: Update existing resources
- DELETE: Remove resources
- PATCH: Partial updates

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
        `,
        completed: false
      },
      {
        id: "core-quiz",
        type: "quiz",
        title: "Core Concepts Quiz",
        description: "Test your understanding of HTTP and REST principles",
        questions: [
          {
            id: "q1",
            question: "Which HTTP method is used to retrieve data?",
            options: ["POST", "GET", "PUT", "DELETE"],
            correctAnswer: 1,
            explanation: "GET is used to retrieve data from a server."
          },
          {
            id: "q2",
            question: "What does the HTTP status code 404 mean?",
            options: [
              "Success",
              "Bad Request",
              "Not Found",
              "Internal Server Error"
            ],
            correctAnswer: 2,
            explanation: "404 means the requested resource was not found."
          }
        ],
        completed: false
      },
      {
        id: "core-assessment",
        type: "assessment",
        title: "Core Concepts Assessment",
        description: "Comprehensive assessment of core backend concepts",
        requirements: [
          "Complete all videos and readings",
          "Score at least 70% on the quiz",
          "Answer all assessment questions correctly"
        ],
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Advanced Patterns",
    description: "Deep dive into advanced backend development patterns",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 200,
    estimatedTime: "6-8 hours",
    prerequisites: [2],
    progress: 0,
    week: 1,
    content: [
      {
        id: "middleware-video",
        type: "video",
        title: "Middleware Patterns",
        description: "Understanding middleware in Express.js applications",
        duration: "30 minutes",
        url: "https://www.youtube.com/watch?v=9HZxKjA1t5g",
        completed: false
      },
      {
        id: "async-video",
        type: "video",
        title: "Async/Await Patterns",
        description: "Master asynchronous programming in Node.js",
        duration: "35 minutes",
        url: "https://www.youtube.com/watch?v=vn3tm0quoqE",
        completed: false
      },
      {
        id: "patterns-reading",
        type: "reading",
        title: "Design Patterns in Backend Development",
        description: "Common design patterns used in backend applications",
        content: `
# Design Patterns in Backend Development

## Singleton Pattern
Ensures a class has only one instance and provides global access to it.

## Factory Pattern
Creates objects without specifying their exact class.

## Observer Pattern
Defines a one-to-many dependency between objects.

## Middleware Pattern
Allows you to add functionality to your application in a modular way.

## Repository Pattern
Abstracts the data access layer.
        `,
        completed: false
      },
      {
        id: "advanced-quiz",
        type: "quiz",
        title: "Advanced Patterns Quiz",
        description: "Test your understanding of advanced patterns",
        questions: [
          {
            id: "q1",
            question: "What is middleware in Express.js?",
            options: [
              "A database connection",
              "Functions that execute during the request-response cycle",
              "A type of route handler",
              "A template engine"
            ],
            correctAnswer: 1,
            explanation: "Middleware functions execute during the request-response cycle and can modify the request and response objects."
          }
        ],
        completed: false
      },
      {
        id: "advanced-assessment",
        type: "assessment",
        title: "Advanced Patterns Assessment",
        description: "Comprehensive assessment of advanced patterns",
        requirements: [
          "Complete all videos and readings",
          "Score at least 80% on the quiz",
          "Demonstrate understanding of design patterns"
        ],
        completed: false
      }
    ]
  },
  
  // WEEK 2 - Application Development (3 modules)
  {
    id: 4,
    title: "Real-World Projects",
    description: "Build practical applications using backend technologies",
    status: "locked",
    hasVideo: true,
    hasQuiz: false,
    hasAssessment: false,
    hasProject: true,
    xp: 250,
    estimatedTime: "10-12 hours",
    prerequisites: [3],
    progress: 0,
    week: 2,
    content: [
      {
        id: "project-video",
        type: "video",
        title: "Building a REST API",
        description: "Step-by-step guide to building a complete REST API",
        duration: "45 minutes",
        url: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
        completed: false
      },
      {
        id: "project-guide",
        type: "reading",
        title: "Project Requirements",
        description: "Detailed requirements for the real-world project",
        content: `
# Real-World Project: Task Management API

## Project Overview
Build a complete task management API with user authentication, CRUD operations, and data validation.

## Requirements

### 1. User Management
- User registration and login
- JWT token authentication
- Password hashing
- User profile management

### 2. Task Management
- Create, read, update, delete tasks
- Task categories and priorities
- Due dates and reminders
- Task status tracking

### 3. API Features
- Input validation
- Error handling
- Rate limiting
- API documentation

### 4. Database
- MongoDB integration
- Data modeling
- Indexing for performance

## Deliverables
- Complete source code
- API documentation
- Test cases
- Deployment guide
        `,
        completed: false
      },
      {
        id: "project-submission",
        type: "project",
        title: "Task Management API Project",
        description: "Submit your completed task management API",
        requirements: [
          "Complete API implementation",
          "Include authentication",
          "Add proper error handling",
          "Write comprehensive tests",
          "Deploy to a cloud platform"
        ],
        completed: false
      }
    ]
  },
  {
    id: 5,
    title: "Best Practices",
    description: "Learn industry standards and best practices",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 150,
    estimatedTime: "3-4 hours",
    prerequisites: [4],
    progress: 0,
    week: 2,
    content: [
      {
        id: "security-video",
        type: "video",
        title: "Security Best Practices",
        description: "Essential security practices for backend applications",
        duration: "25 minutes",
        url: "https://www.youtube.com/watch?v=2bVAoVlYf4Q",
        completed: false
      },
      {
        id: "testing-video",
        type: "video",
        title: "Testing Strategies",
        description: "Unit testing, integration testing, and test-driven development",
        duration: "30 minutes",
        url: "https://www.youtube.com/watch?v=r9HdJ8P6GQI",
        completed: false
      },
      {
        id: "best-practices-reading",
        type: "reading",
        title: "Code Quality and Documentation",
        description: "Writing maintainable and well-documented code",
        content: `
# Code Quality and Documentation

## Code Quality Principles

### 1. Clean Code
- Use meaningful variable names
- Write small, focused functions
- Avoid code duplication
- Follow consistent formatting

### 2. Error Handling
- Use try-catch blocks appropriately
- Provide meaningful error messages
- Log errors for debugging
- Handle edge cases

### 3. Performance
- Optimize database queries
- Use caching strategies
- Implement proper indexing
- Monitor application performance

## Documentation Standards

### 1. API Documentation
- Document all endpoints
- Include request/response examples
- Specify error codes
- Provide authentication details

### 2. Code Documentation
- Write clear comments
- Document complex algorithms
- Include usage examples
- Maintain README files
        `,
        completed: false
      },
      {
        id: "best-practices-quiz",
        type: "quiz",
        title: "Best Practices Quiz",
        description: "Test your understanding of best practices",
        questions: [
          {
            id: "q1",
            question: "What is the most important aspect of code quality?",
            options: [
              "Speed of execution",
              "Readability and maintainability",
              "Shortest code possible",
              "Using latest technologies"
            ],
            correctAnswer: 1,
            explanation: "Readability and maintainability are crucial for long-term code quality."
          }
        ],
        completed: false
      },
      {
        id: "best-practices-assessment",
        type: "assessment",
        title: "Best Practices Assessment",
        description: "Assessment of best practices knowledge",
        requirements: [
          "Complete all videos and readings",
          "Score at least 75% on the quiz",
          "Demonstrate understanding of security practices"
        ],
        completed: false
      }
    ]
  },
  {
    id: 6,
    title: "Testing & Debugging",
    description: "Quality assurance techniques for backend applications",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 200,
    estimatedTime: "5-6 hours",
    prerequisites: [5],
    progress: 0,
    week: 2,
    content: [
      {
        id: "testing-video",
        type: "video",
        title: "Unit Testing with Jest",
        description: "Writing effective unit tests for Node.js applications",
        duration: "35 minutes",
        url: "https://www.youtube.com/watch?v=8Xwq35cPwYg",
        completed: false
      },
      {
        id: "debugging-video",
        type: "video",
        title: "Debugging Techniques",
        description: "Effective debugging strategies and tools",
        duration: "25 minutes",
        url: "https://www.youtube.com/watch?v=AX7xn1lO8sI",
        completed: false
      },
      {
        id: "testing-reading",
        type: "reading",
        title: "Testing Strategies",
        description: "Comprehensive guide to testing backend applications",
        content: `
# Testing Strategies for Backend Applications

## Types of Testing

### 1. Unit Testing
- Test individual functions and methods
- Mock external dependencies
- Aim for high code coverage
- Use descriptive test names

### 2. Integration Testing
- Test interactions between components
- Test database connections
- Test API endpoints
- Use test databases

### 3. End-to-End Testing
- Test complete user workflows
- Test in production-like environments
- Automate critical paths
- Monitor test results

## Testing Tools
- Jest: JavaScript testing framework
- Supertest: HTTP assertion library
- Mocha: Test framework
- Chai: Assertion library
        `,
        completed: false
      },
      {
        id: "testing-quiz",
        type: "quiz",
        title: "Testing & Debugging Quiz",
        description: "Test your understanding of testing concepts",
        questions: [
          {
            id: "q1",
            question: "What is the purpose of unit testing?",
            options: [
              "Test the entire application",
              "Test individual functions in isolation",
              "Test user interfaces",
              "Test database performance"
            ],
            correctAnswer: 1,
            explanation: "Unit testing focuses on testing individual functions or methods in isolation."
          }
        ],
        completed: false
      },
      {
        id: "testing-assessment",
        type: "assessment",
        title: "Testing & Debugging Assessment",
        description: "Assessment of testing and debugging knowledge",
        requirements: [
          "Complete all videos and readings",
          "Score at least 80% on the quiz",
          "Write sample unit tests"
        ],
        completed: false
      }
    ]
  },
  
  // WEEK 3 - Optimization & Deployment (2 modules)
  {
    id: 7,
    title: "Performance Optimization",
    description: "Optimize your applications for better performance",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 200,
    estimatedTime: "4-5 hours",
    prerequisites: [6],
    progress: 0,
    week: 3,
    content: [
      {
        id: "performance-video",
        type: "video",
        title: "Performance Monitoring",
        description: "Tools and techniques for monitoring application performance",
        duration: "30 minutes",
        url: "https://www.youtube.com/watch?v=0oZyKpVxS8s",
        completed: false
      },
      {
        id: "optimization-video",
        type: "video",
        title: "Database Optimization",
        description: "Optimizing database queries and performance",
        duration: "35 minutes",
        url: "https://www.youtube.com/watch?v=HubezKbFL7E",
        completed: false
      },
      {
        id: "performance-reading",
        type: "reading",
        title: "Performance Optimization Techniques",
        description: "Comprehensive guide to optimizing backend performance",
        content: `
# Performance Optimization Techniques

## Database Optimization

### 1. Indexing
- Create appropriate indexes
- Monitor index usage
- Remove unused indexes
- Consider composite indexes

### 2. Query Optimization
- Use EXPLAIN to analyze queries
- Optimize JOIN operations
- Limit result sets
- Use pagination

## Caching Strategies

### 1. Application-Level Caching
- Cache frequently accessed data
- Implement cache invalidation
- Use appropriate cache TTL
- Monitor cache hit rates

### 2. Database Caching
- Enable query result caching
- Use connection pooling
- Implement read replicas
- Consider database sharding

## Code Optimization
- Profile your application
- Optimize hot paths
- Use efficient algorithms
- Minimize memory usage
        `,
        completed: false
      },
      {
        id: "performance-quiz",
        type: "quiz",
        title: "Performance Optimization Quiz",
        description: "Test your understanding of performance optimization",
        questions: [
          {
            id: "q1",
            question: "What is the primary purpose of database indexing?",
            options: [
              "Reduce storage space",
              "Improve query performance",
              "Increase security",
              "Simplify queries"
            ],
            correctAnswer: 1,
            explanation: "Database indexing primarily improves query performance by creating efficient data structures for quick lookups."
          }
        ],
        completed: false
      },
      {
        id: "performance-assessment",
        type: "assessment",
        title: "Performance Optimization Assessment",
        description: "Assessment of performance optimization knowledge",
        requirements: [
          "Complete all videos and readings",
          "Score at least 75% on the quiz",
          "Demonstrate optimization techniques"
        ],
        completed: false
      }
    ]
  },
  {
    id: 8,
    title: "Deployment",
    description: "Ship your applications to production",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: false,
    hasProject: false,
    xp: 150,
    estimatedTime: "3-4 hours",
    prerequisites: [7],
    progress: 0,
    week: 3,
    content: [
      {
        id: "deployment-video",
        type: "video",
        title: "Docker Containerization",
        description: "Containerizing applications with Docker",
        duration: "30 minutes",
        url: "https://www.youtube.com/watch?v=pTFZFxd4hOI",
        completed: false
      },
      {
        id: "cloud-video",
        type: "video",
        title: "Cloud Deployment",
        description: "Deploying applications to cloud platforms",
        duration: "25 minutes",
        url: "https://www.youtube.com/watch?v=Z7BoF-1sJYg",
        completed: false
      },
      {
        id: "deployment-reading",
        type: "reading",
        title: "Deployment Strategies",
        description: "Best practices for deploying backend applications",
        content: `
# Deployment Strategies

## Containerization with Docker

### 1. Dockerfile Best Practices
- Use multi-stage builds
- Minimize image size
- Use specific base images
- Optimize layer caching

### 2. Docker Compose
- Define multi-container applications
- Set up development environments
- Configure networking
- Manage volumes

## Cloud Deployment

### 1. Platform Options
- AWS (EC2, ECS, Lambda)
- Google Cloud Platform
- Microsoft Azure
- Heroku
- DigitalOcean

### 2. CI/CD Pipeline
- Automated testing
- Code quality checks
- Automated deployment
- Rollback strategies

## Environment Management
- Development environment
- Staging environment
- Production environment
- Environment variables
- Configuration management
        `,
        completed: false
      },
      {
        id: "deployment-quiz",
        type: "quiz",
        title: "Deployment Quiz",
        description: "Test your understanding of deployment concepts",
        questions: [
          {
            id: "q1",
            question: "What is the primary benefit of containerization?",
            options: [
              "Reduced development time",
              "Consistent deployment environments",
              "Lower costs",
              "Better security"
            ],
            correctAnswer: 1,
            explanation: "Containerization ensures consistent deployment environments across development, staging, and production."
          }
        ],
        completed: false
      }
    ]
  },
  
  // WEEK 4 - Final Project & Assessment (2 modules)
  {
    id: 9,
    title: "Capstone Project",
    description: "Build your final comprehensive project",
    status: "locked",
    hasVideo: false,
    hasQuiz: false,
    hasAssessment: true,
    hasProject: true,
    xp: 500,
    estimatedTime: "20-25 hours",
    prerequisites: [8],
    progress: 0,
    week: 4,
    content: [
      {
        id: "capstone-guide",
        type: "reading",
        title: "Capstone Project Guidelines",
        description: "Comprehensive guidelines for your final project",
        content: `
# Capstone Project: E-Commerce Backend API

## Project Overview
Build a complete e-commerce backend API that demonstrates all the skills you've learned throughout the course.

## Requirements

### 1. Core Features
- User authentication and authorization
- Product catalog management
- Shopping cart functionality
- Order processing system
- Payment integration (mock)
- Admin dashboard API

### 2. Technical Requirements
- RESTful API design
- Database design and optimization
- Input validation and error handling
- Security best practices
- Comprehensive testing
- API documentation
- Performance optimization

### 3. Advanced Features
- Real-time notifications
- Search and filtering
- Recommendation system
- Analytics and reporting
- Caching implementation
- Rate limiting

## Deliverables
- Complete source code repository
- API documentation (Swagger/OpenAPI)
- Test suite with >80% coverage
- Deployment guide
- Performance benchmarks
- Project presentation

## Evaluation Criteria
- Code quality and organization
- API design and documentation
- Security implementation
- Testing coverage
- Performance optimization
- Deployment readiness
        `,
        completed: false
      },
      {
        id: "capstone-assessment",
        type: "assessment",
        title: "Capstone Project Assessment",
        description: "Final assessment of your comprehensive project",
        requirements: [
          "Complete e-commerce API implementation",
          "Include all required features",
          "Achieve >80% test coverage",
          "Deploy to production",
          "Submit project documentation",
          "Present your project"
        ],
        completed: false
      },
      {
        id: "capstone-project",
        type: "project",
        title: "E-Commerce Backend API",
        description: "Submit your completed capstone project",
        requirements: [
          "Full-featured e-commerce API",
          "Comprehensive documentation",
          "Complete test suite",
          "Production deployment",
          "Performance optimization",
          "Security implementation"
        ],
        completed: false
      }
    ]
  },
  {
    id: 10,
    title: "Final Assessment",
    description: "Complete your internship with a comprehensive assessment",
    status: "locked",
    hasVideo: false,
    hasQuiz: false,
    hasAssessment: true,
    hasProject: false,
    xp: 300,
    estimatedTime: "2-3 hours",
    prerequisites: [9],
    progress: 0,
    week: 4,
    content: [
      {
        id: "final-assessment",
        type: "assessment",
        title: "Final Comprehensive Assessment",
        description: "Complete assessment covering all course topics",
        requirements: [
          "Complete all previous modules",
          "Score at least 85% on the assessment",
          "Demonstrate mastery of all concepts",
          "Submit portfolio of work"
        ],
        completed: false
      }
    ]
  }
];

export const getUserProgress = (): { [key: number]: number } => {
  const progress = localStorage.getItem('courseProgress');
  return progress ? JSON.parse(progress) : {};
};

export const updateUserProgress = (moduleId: number, progress: number) => {
  const currentProgress = getUserProgress();
  currentProgress[moduleId] = progress;
  localStorage.setItem('courseProgress', JSON.stringify(currentProgress));
};

export const getCompletedModules = (): number[] => {
  const progress = getUserProgress();
  return Object.keys(progress)
    .map(Number)
    .filter(moduleId => progress[moduleId] === 100);
};

export const getAvailableModules = (): number[] => {
  const completedModules = getCompletedModules();
  const availableModules: number[] = [];
  
  courseModules.forEach(module => {
    if (module.prerequisites.length === 0 || 
        module.prerequisites.every(prereq => completedModules.includes(prereq))) {
      availableModules.push(module.id);
    }
  });
  
  return availableModules;
};

export const updateModuleStatus = (moduleId: number, status: CourseModule['status']) => {
  const module = courseModules.find(m => m.id === moduleId);
  if (module) {
    module.status = status;
  }
};

export const markModuleInProgress = (moduleId: number) => {
  const module = courseModules.find(m => m.id === moduleId);
  if (module && module.status === 'available') {
    module.status = 'in-progress';
  }
};

export const completeModule = (moduleId: number) => {
  const module = courseModules.find(m => m.id === moduleId);
  if (module) {
    module.status = 'completed';
    updateUserProgress(moduleId, 100);
    
    // Unlock next module
    const nextModule = courseModules.find(m => m.id === moduleId + 1);
    if (nextModule && nextModule.status === 'locked') {
      nextModule.status = 'available';
    }
  }
};

export const getModuleById = (moduleId: number): CourseModule | undefined => {
  return courseModules.find(m => m.id === moduleId);
};

export const updateContentProgress = (moduleId: number, contentId: string, completed: boolean) => {
  const module = courseModules.find(m => m.id === moduleId);
  if (module) {
    const content = module.content.find(c => c.id === contentId);
    if (content) {
      content.completed = completed;
      
      // Calculate module progress
      const completedContent = module.content.filter(c => c.completed).length;
      const progress = Math.round((completedContent / module.content.length) * 100);
      
      updateUserProgress(moduleId, progress);
      
      // If module is completed, unlock next module
      if (progress === 100) {
        completeModule(moduleId);
      }
    }
  }
};

// Weekly structure helper functions
export const getModulesByWeek = (week: number): CourseModule[] => {
  return courseModules.filter(module => module.week === week);
};

export const getWeekProgress = (week: number): number => {
  const weekModules = getModulesByWeek(week);
  if (weekModules.length === 0) return 0;
  
  const completedModules = weekModules.filter(module => module.status === 'completed').length;
  return Math.round((completedModules / weekModules.length) * 100);
};

export const getTotalWeekProgress = (): { week: number; progress: number; modules: CourseModule[] }[] => {
  return [1, 2, 3, 4].map(week => ({
    week,
    progress: getWeekProgress(week),
    modules: getModulesByWeek(week)
  }));
};

export const getCurrentWeek = (): number => {
  const completedModules = getCompletedModules();
  const lastCompletedModule = completedModules.length > 0 
    ? Math.max(...completedModules) 
    : 0;
  
  const currentModule = courseModules.find(m => m.id === lastCompletedModule + 1);
  return currentModule ? currentModule.week : 1;
};

export const getWeekStatus = (week: number): 'locked' | 'available' | 'in-progress' | 'completed' => {
  const weekModules = getModulesByWeek(week);
  if (weekModules.length === 0) return 'locked';
  
  const completedCount = weekModules.filter(m => m.status === 'completed').length;
  const inProgressCount = weekModules.filter(m => m.status === 'in-progress').length;
  const availableCount = weekModules.filter(m => m.status === 'available').length;
  
  if (completedCount === weekModules.length) return 'completed';
  if (inProgressCount > 0 || availableCount > 0) return 'in-progress';
  return 'locked';
};
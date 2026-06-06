# AI Resume Builder - Server

A modern Express.js backend server for the AI Resume Builder application. Built with TypeScript, Prisma ORM, and ready for Vercel deployment.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npm run prisma:migrate:dev

# Start development server (http://localhost:5000)
npm run dev
```

### Vercel Deployment

```bash
# Push to GitHub
git push origin main

# Deploy to Vercel (auto-deploys from GitHub)
# Visit: https://vercel.com/new and connect your repository
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 📋 Features

- ✅ Express.js server with TypeScript
- ✅ Prisma ORM with PostgreSQL
- ✅ JWT authentication (access & refresh tokens)
- ✅ Secure password hashing with bcrypt
- ✅ CORS configuration for local & production
- ✅ Environment-based configuration
- ✅ Error handling middleware
- ✅ File upload support (Multer)
- ✅ Input validation (Zod)
- ✅ Request logging (Morgan)
- ✅ Security headers (Helmet)
- ✅ Groq API integration for AI features
- ✅ PDF parsing capabilities
- ✅ **Vercel serverless ready** 🎯
- ✅ **Works with both localhost and Vercel** 🎯

---

## 📦 Tech Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript
- **Framework:** Express.js 5.x
- **Database:** PostgreSQL (with Prisma ORM)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer
- **Validation:** Zod
- **Logging:** Morgan
- **Security:** Helmet, CORS
- **Deployment:** Vercel (Serverless Functions)

---

## 🛠️ Development

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run start` | Run production server |
| `npm run vercel-build` | Build for Vercel deployment |
| `npm run prisma:migrate:dev` | Create & run migrations (dev) |
| `npm run prisma:migrate` | Deploy migrations (prod) |
| `npm run prisma:studio` | Open Prisma Studio GUI |
| `npm run prisma:generate` | Generate Prisma Client |

### Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point (localhost)
├── config/
│   ├── corsOptions.ts    # CORS configuration
│   └── env.ts            # Environment variables with Zod
├── middleware/
│   ├── auth.middleware.ts    # JWT authentication
│   ├── error.middleware.ts   # Global error handler
│   ├── upload.middleware.ts  # File upload handling
│   └── validate.middleware.ts # Request validation
├── modules/
│   └── auth/
│       ├── auth.controller.ts  # Route handlers
│       ├── auth.routes.ts      # Route definitions
│       ├── auth.service.ts     # Business logic
│       └── auth.validation.ts  # Input validation schemas
├── prisma/
│   └── prisma.ts          # Prisma client instance
├── types/
│   └── index.ts           # TypeScript type definitions
└── utils/
    ├── AppError.ts        # Custom error class
    ├── catchAsync.ts      # Async error wrapper
    ├── generateToken.ts   # JWT token generation
    ├── groq.ts            # Groq API client
    └── sendResponse.ts    # Standardized responses

api/
└── index.ts              # Vercel serverless handler

prisma/
├── schema.prisma         # Database schema
└── migrations/           # Migration history

vercel.json              # Vercel configuration
```

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=7d

# APIs
GROQ_API_KEY=your_groq_api_key_here

# Client
CLIENT_URL=http://localhost:3000
```

---

## 🗄️ Database Setup

### Using PostgreSQL Locally

```bash
# Install PostgreSQL (if not already installed)
# macOS: brew install postgresql
# Windows: Download from https://www.postgresql.org/download/windows/
# Linux: sudo apt-get install postgresql

# Create database
createdb resume_builder

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder

# Run migrations
npm run prisma:migrate:dev

# View database (optional)
npm run prisma:studio
```

### Using Managed Database for Production

- **Neon** (PostgreSQL): https://neon.tech
- **Supabase** (PostgreSQL): https://supabase.com
- **PlanetScale** (MySQL): https://planetscale.com
- **AWS RDS**: https://aws.amazon.com/rds/

---

## 🚀 API Endpoints

### Health Check
```
GET /health
Response: { success: true, message: "Server is running" }
```

### Authentication Routes (`/api/v1/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

### Resume Routes (Coming Soon)
```
/api/v1/resume
```

### AI Routes (Coming Soon)
```
/api/v1/ai
```

---

## 🔄 Deployment

### Localhost
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### Vercel Production
```bash
git push origin main
# Auto-deploys to Vercel
```
API available at `https://<project-name>.vercel.app`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

---

## 📝 API Response Format

All API responses follow a standard format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "stack": "Error stack (development only)"
}
```

---

## 🛡️ Security Features

- ✅ JWT authentication with access & refresh tokens
- ✅ Secure password hashing with bcryptjs
- ✅ CORS protection with configurable origins
- ✅ Helmet security headers
- ✅ Input validation with Zod
- ✅ Environment-based configuration
- ✅ Error handling with sanitized messages
- ✅ Request logging with Morgan

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Ensure database is running
- Check firewall settings
- Test connection: `npx prisma db push`

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist .next
npm install
npm run build
```

### Prisma Issues
```bash
# Regenerate Prisma Client
npm run prisma:generate

# Reset database (dev only!)
npx prisma migrate reset
```

---

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Express.js Docs](https://expressjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [JWT Guide](https://jwt.io/introduction)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test: `npm run dev`
4. Commit: `git commit -m 'Add your feature'`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

---

## 📄 License

ISC

---

## 📞 Support

For issues and questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review error logs in Vercel dashboard
- Check Prisma Studio: `npm run prisma:studio`

# Resume Builder Server - Deployment & Setup Guide

## Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (or your preferred database)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
# Edit .env with your local database URL and API keys
```

3. **Setup database:**
```bash
# Run Prisma migrations
npm run prisma:migrate:dev

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

4. **Run development server:**
```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with this code pushed

### Deployment Steps

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select "Continue"

3. **Configure Environment Variables in Vercel:**
   - Go to your project settings → Environment Variables
   - Add the following variables:
     ```
     NODE_ENV=production
     PORT=3000
     DATABASE_URL=<your-production-database-url>
     JWT_SECRET=<your-jwt-secret>
     JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
     JWT_EXPIRES_IN=15m
     JWT_REFRESH_EXPIRES_IN=7d
     GROQ_API_KEY=<your-groq-api-key>
     CLIENT_URL=<your-frontend-domain>
     ```

4. **Database Setup:**
   - Use a managed PostgreSQL service (Neon, Supabase, AWS RDS, etc.)
   - Get the connection string and add it as `DATABASE_URL`

5. **Run Prisma Migrations in Production:**
   ```bash
   # Before first deployment, run migrations locally or use Vercel CLI
   # You can also add a build command to auto-run migrations
   ```

6. **Deploy:**
   - Click "Deploy" on Vercel
   - Vercel will automatically build and deploy your app
   - Your API will be available at `https://<project-name>.vercel.app`

---

## Key Files for Deployment

- **`vercel.json`** - Vercel configuration with rewrites and functions setup
- **`api/index.ts`** - Serverless handler for Vercel
- **`src/server.ts`** - Local development server (still used for `npm run dev`)
- **`package.json`** - Updated with build scripts for Vercel

---

## Available Scripts

```bash
npm run dev              # Start development server (localhost:5000)
npm run build           # Build TypeScript to JavaScript
npm run start           # Start production server
npm run vercel-build    # Build command for Vercel (includes Prisma generate)
npm run prisma:migrate  # Deploy existing migrations (production)
npm run prisma:migrate:dev  # Create and apply new migrations (development)
npm run prisma:studio   # Open Prisma Studio
npm run prisma:generate # Generate Prisma Client
```

---

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure database is accessible from Vercel IPs
- Check firewall/network rules on your database provider

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Run `npm run build` locally to test

### CORS Issues
- Update `CLIENT_URL` environment variable
- Verify CORS configuration in `src/config/corsOptions.ts`

### Prisma Issues
- Run migrations before deploying: `npm run prisma:migrate`
- Generated Prisma Client is included in build process

---

## Project Structure

```
resume-builder-server/
├── api/                 # Vercel serverless function
│   └── index.ts        # Serverless handler
├── prisma/             # Database schema & migrations
│   ├── schema.prisma   # Prisma data model
│   └── migrations/     # Migration files
├── src/
│   ├── app.ts          # Express app setup
│   ├── server.ts       # Local server entry point
│   ├── config/         # Configuration files
│   ├── middleware/     # Express middleware
│   ├── modules/        # Feature modules (auth, resume, etc.)
│   ├── prisma/         # Prisma client instance
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── vercel.json         # Vercel configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies & scripts
└── .env.example        # Environment variables template
```

---

## Production Best Practices

1. **Use environment variables** for all sensitive data (never hardcode)
2. **Set `NODE_ENV=production`** in production
3. **Use a managed database** with backups
4. **Monitor logs** in Vercel dashboard
5. **Test API endpoints** after deployment
6. **Keep dependencies updated** for security patches
7. **Implement proper error handling** and logging

---

## Getting Help

- Vercel Docs: https://vercel.com/docs
- Express Docs: https://expressjs.com
- Prisma Docs: https://www.prisma.io/docs
- Node.js Docs: https://nodejs.org/docs

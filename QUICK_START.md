# 🚀 Quick Setup Guide

## ✅ Your project is now ready for both localhost and Vercel deployment!

### **For Local Development** (Localhost)

#### Step 1: Install Dependencies
```bash
npm install
```

#### Step 2: Setup Environment
```bash
cp .env.example .env
# Edit .env with your local database details
```

#### Step 3: Setup Database
```bash
# Create your PostgreSQL database first, then run:
npm run prisma:migrate:dev
```

#### Step 4: Run Development Server
```bash
npm run dev
```
✅ Server starts at `http://localhost:5000`

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

---

### **For Vercel Deployment** (Production)

#### Step 1: Prepare Your Code
```bash
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects the configuration

#### Step 3: Add Environment Variables
In Vercel Project Settings → Environment Variables, add:
- `NODE_ENV` = `production`
- `DATABASE_URL` = Your production database connection string
- `JWT_SECRET` = Your JWT secret key
- `JWT_REFRESH_SECRET` = Your refresh token secret
- `JWT_EXPIRES_IN` = `15m`
- `JWT_REFRESH_EXPIRES_IN` = `7d`
- `GROQ_API_KEY` = Your Groq API key
- `CLIENT_URL` = Your frontend URL (e.g., https://yoursite.com)

#### Step 4: Deploy
Click "Deploy" - Vercel will automatically build and deploy!

✅ Your API will be live at: `https://<your-project-name>.vercel.app`

---

## 📁 What Was Added/Modified

### New Files Created:
- ✅ `api/index.ts` - Vercel serverless function handler
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to exclude from Vercel build
- ✅ `DEPLOYMENT.md` - Detailed deployment guide
- ✅ `README.md` - Complete project documentation

### Files Modified:
- ✅ `package.json` - Added Vercel build scripts and @vercel/node dependency
- ✅ `tsconfig.json` - Updated to include api folder
- ✅ `.gitignore` - Enhanced for better file exclusion
- ✅ `.env.example` - Updated with better comments

---

## 🔧 Important Configuration Files

### `vercel.json`
Controls how Vercel builds and deploys your app. Includes:
- Build command configuration
- Function memory allocation (1GB)
- Request rewrites to the serverless function
- Environment variables setup

### `api/index.ts`
Serverless function that:
- Ensures database connection
- Handles CORS for production
- Routes all requests through Express app
- Manages database connection pooling

### `src/server.ts`
Still used for local development with `npm run dev`
Remains unchanged - your Express app still starts normally locally.

---

## 📊 How It Works

```
┌─ LOCALHOST ─────────────────────┐
│ npm run dev                     │
│  ↓                              │
│ src/server.ts                   │
│  ↓                              │
│ app.listen(5000)                │
│  ↓                              │
│ http://localhost:5000           │
└─────────────────────────────────┘

┌─ VERCEL PRODUCTION ─────────────┐
│ git push                        │
│  ↓                              │
│ Vercel auto-deploys             │
│  ↓                              │
│ api/index.ts (serverless)       │
│  ↓                              │
│ Express app handler             │
│  ↓                              │
│ https://your-project.vercel.app │
└─────────────────────────────────┘
```

---

## 🗄️ Database for Production

Recommended managed PostgreSQL services:
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier, PostgreSQL based
- **Vercel Postgres** (https://vercel.com/docs/storage/vercel-postgres)
- **AWS RDS** (https://aws.amazon.com/rds/)
- **PlanetScale** (MySQL alternative)

Get your connection string and add as `DATABASE_URL` in Vercel.

---

## 🧪 Verify Everything Works

### Local:
```bash
npm run dev
curl http://localhost:5000/health
```

Response should be:
```json
{ "success": true, "message": "Server is running" }
```

### After Deployment:
```bash
curl https://<your-project>.vercel.app/health
```

Same response from Vercel!

---

## ⚠️ Important Notes

1. **Environment Variables:** Never commit `.env` - use Vercel environment variables
2. **Database Migrations:** Run migrations before deploying
3. **Database URL:** Must be a production database, not local
4. **Build Time:** First deploy takes longer (Prisma generation)
5. **Cold Starts:** Serverless functions may have slight initial delay

---

## 📞 Next Steps

1. ✅ Setup your local environment (follow "For Local Development" above)
2. ✅ Test locally with `npm run dev`
3. ✅ Push to GitHub
4. ✅ Setup Vercel deployment (follow "For Vercel Deployment" above)
5. ✅ Add production database
6. ✅ Deploy and test!

---

## 📚 Complete Documentation

- **Detailed Deployment Guide:** See `DEPLOYMENT.md`
- **Project README:** See `README.md`
- **Environment Template:** See `.env.example`

---

## 🆘 Need Help?

### Common Issues:

**Port 5000 already in use?**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

**Database connection failing?**
- Check `DATABASE_URL` in `.env`
- Verify database is running
- Test with: `npx prisma db push`

**Vercel build failing?**
- Check build logs in Vercel dashboard
- Ensure all env vars are set
- Run `npm run build` locally first

---

✨ **You're all set!** Your Resume Builder Server is ready for both local development and Vercel production deployment.

Happy coding! 🎉

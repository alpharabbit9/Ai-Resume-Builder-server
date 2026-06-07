# Deploy to Vercel with Neon Database - Step by Step

## 🎯 Your Setup

- **Backend:** Express.js + TypeScript
- **Database:** Neon (PostgreSQL)
- **Deployment:** Vercel Serverless
- **Local Dev:** Works with local database
- **Production:** Works with Neon cloud database

---

## ✅ Step-by-Step Deployment

### Step 1: Verify Local Setup Works ✓

```bash
# Your .env file should still have LOCAL database
DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder

# Test local development
npm run dev

# Should see:
# Database connected successfully
# Server running on port 5000 in development mode
```

### Step 2: Push Code to GitHub ✓

```bash
# Make sure all changes are committed
git status

# Add all changes
git add .

# Commit
git commit -m "Setup for Vercel + Neon deployment"

# Push to GitHub
git push origin main
```

### Step 3: Go to Vercel

1. Open https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find your `AI-Resume-Builder-server` repository
5. Click **"Import"**

### Step 4: Configure Build Settings

Vercel will auto-detect:
- ✅ Framework: Node.js
- ✅ Build Command: `npm run vercel-build`
- ✅ Output Directory: (Leave blank)
- ✅ Install Command: `npm install`

**Leave everything as default** - Vercel detected correctly!

### Step 5: Add Environment Variables ⭐ IMPORTANT

In the **Environment Variables** section, add these:

```
NODE_ENV           production
PORT               3000
DATABASE_URL       postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET         (generate: openssl rand -hex 32)
JWT_REFRESH_SECRET (generate: openssl rand -hex 32)
JWT_EXPIRES_IN     15m
JWT_REFRESH_EXPIRES_IN 7d
GROQ_API_KEY       your_groq_api_key
CLIENT_URL         https://your-frontend-domain.com
```

**Copy-paste the Neon connection string exactly:**
```
postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Step 6: Deploy

Click the **"Deploy"** button and wait! ⏳

First deployment takes 2-3 minutes (includes Prisma generation)

---

## 🔍 Verify Deployment

Once deployed, you'll see a screen with your live URL:

```
✅ Deployment successful!
Your API is live at: https://your-project-name.vercel.app
```

### Test the API

```bash
# Replace with your actual URL
curl https://your-project-name.vercel.app/health

# Should return:
# { "success": true, "message": "Server is running" }
```

---

## 📊 Check Vercel Dashboard

After deployment:

1. Go to https://vercel.com/dashboard
2. Click your project
3. Check the **Deployments** tab
4. Click latest deployment to view logs
5. Should see:
   ```
   ✅ Building...
   ✅ Generated Prisma Client
   ✅ Deployment Complete
   ```

---

## 🧪 Full Deployment Verification

### Local Development Still Works ✓
```bash
npm run dev
# http://localhost:5000/health should work
```

### Production on Vercel Works ✓
```bash
curl https://your-project-name.vercel.app/health
# Should also work!
```

### Both Use Different Databases ✓
- Local: `localhost:5432` (your Beekeeper)
- Vercel: Neon cloud database

---

## ⚙️ Environment Variables Explained

| Variable | Local | Production | Purpose |
|----------|-------|------------|---------|
| `NODE_ENV` | `development` | `production` | Runtime mode |
| `DATABASE_URL` | `localhost:5432` | Neon cloud | Which database |
| `JWT_SECRET` | `your_jwt_secret_here` | Strong random key | API security |
| `PORT` | `5000` | `3000` | Server port |
| `CLIENT_URL` | `http://localhost:3000` | `https://frontend.com` | CORS origin |

---

## 🆘 Common Issues & Solutions

### Issue: "DATABASE_URL is required"
```
Error: DATABASE_URL is required
```
✅ **Fix:** Check Vercel environment variables - make sure `DATABASE_URL` is set correctly

### Issue: "getaddrinfo ENOTFOUND"
```
Error: getaddrinfo ENOTFOUND ep-steep-poetry...
```
✅ **Fix:** Neon database might be suspended
- Go to Neon console
- Check database is active
- Restart if needed

### Issue: "Authentication failed"
```
FATAL: password authentication failed
```
✅ **Fix:** Database credentials in connection string are wrong
- Copy fresh connection string from Neon console
- Make sure it's in Vercel environment variables

### Issue: "Prisma migration failed"
```
Error: P3007
```
✅ **Fix:** Migrations need to be applied
- Run locally first: `npm run prisma:migrate:dev`
- Then deploy to Vercel

---

## 📝 Your Actual Vercel Setup

Here's exactly what to add to Vercel:

```
Key: NODE_ENV
Value: production

Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

Key: JWT_SECRET
Value: [Generate strong secret - example: 8f9a3c5e2b1d4f6a9c8e1b3a5f7d9e2c]

Key: JWT_REFRESH_SECRET
Value: [Generate strong secret - example: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6]

Key: JWT_EXPIRES_IN
Value: 15m

Key: JWT_REFRESH_EXPIRES_IN
Value: 7d

Key: GROQ_API_KEY
Value: [Your actual Groq API key]

Key: CLIENT_URL
Value: https://your-frontend-domain.com
```

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and imported
- [ ] Environment variables added in Vercel
- [ ] DATABASE_URL is correct (Neon connection string)
- [ ] Deployment completed successfully
- [ ] Health endpoint works: `curl https://your-project.vercel.app/health`
- [ ] Local development still works: `npm run dev`
- [ ] Both databases are different (local vs Neon)

---

## 📚 Reference Files

- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Neon Setup:** [NEON_SETUP.md](./NEON_SETUP.md)
- **Environment Example:** [.env.production](./.env.production)
- **Vercel Config:** [vercel.json](./vercel.json)

---

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Neon Console: https://console.neon.tech
- Your Deployed API: `https://[your-project-name].vercel.app`

---

**✨ You're all set! Your app is now running on Vercel with Neon database!**

Questions? Check the logs in Vercel dashboard or see NEON_SETUP.md for more details.

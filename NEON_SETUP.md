# Neon Database Setup for Vercel Deployment

## ✅ Your Neon Database Connection String

```
postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## 🔧 How to Deploy with Neon + Vercel

### Step 1: Update Vercel Environment Variables

Go to your Vercel project → Settings → Environment Variables

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `JWT_SECRET` | Generate a strong secret (e.g., `openssl rand -hex 32`) |
| `JWT_REFRESH_SECRET` | Generate another strong secret |
| `GROQ_API_KEY` | Your Groq API key |
| `CLIENT_URL` | Your frontend domain (e.g., `https://yourfrontend.com`) |

### Step 2: Verify Database Connection

Before deploying, test the connection locally:

```bash
# Add the Neon URL to .env temporarily
DATABASE_URL=postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Test connection
npx prisma db push

# Or run migrations
npm run prisma:migrate:dev
```

### Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Add production database configuration"
git push origin main
```

Vercel will auto-deploy with the Neon database!

### Step 4: Verify Production

Once deployed, test your API:

```bash
curl https://<your-vercel-project>.vercel.app/health
```

Should respond with:
```json
{ "success": true, "message": "Server is running" }
```

---

## 📊 Connection Details

Your Neon database has:

- **Host:** `ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech`
- **Port:** `5432` (default)
- **User:** `neondb_owner`
- **Database:** `neondb`
- **Password:** `npg_yLoRpGAzH71B`
- **Region:** US-East-1 (AWS)
- **SSL Mode:** `require` ✅ (Secure)
- **Channel Binding:** `require` ✅ (Extra security)

---

## 🔐 Security Notes

⚠️ **Important:** Your connection string contains credentials!

1. **Never commit** your actual DATABASE_URL to GitHub
2. Use **Vercel environment variables** instead
3. Consider **rotating credentials** in Neon if this URL was ever exposed
4. Use **separate credentials** for local dev vs production

---

## 🚀 Local vs Production Setup

### Local Development
```env
# .env (on your machine)
DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder
NODE_ENV=development
PORT=5000
```

Run with: `npm run dev`

### Production (Vercel)
```env
# Vercel Environment Variables
DATABASE_URL=postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_ENV=production
PORT=3000
```

Deploy with: `git push origin main`

---

## 🐛 Troubleshooting

### Connection Refused
```
Error: getaddrinfo ENOTFOUND ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech
```
✅ **Solution:** 
- Check internet connection
- Verify DATABASE_URL is correct
- Check Neon console - database might be suspended

### SSL/TLS Error
```
Error: SSL: CERTIFICATE_VERIFY_FAILED
```
✅ **Solution:** 
- This is normal for Neon - `sslmode=require` is correct
- Prisma handles SSL automatically

### Authentication Failed
```
Error: FATAL: password authentication failed for user "neondb_owner"
```
✅ **Solution:** 
- Verify password in connection string is correct
- Reset password in Neon console if needed

---

## 📚 Useful Neon Commands

### Test connection from terminal
```bash
psql 'postgresql://neondb_owner:npg_yLoRpGAzH71B@ep-steep-poetry-aqh24qzu-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

### View database tables (in psql)
```sql
\dt
```

### Exit psql
```sql
\q
```

---

## ✅ Next Steps

1. ✅ Add Neon connection string to Vercel
2. ✅ Test locally with Neon URL
3. ✅ Deploy to Vercel
4. ✅ Test production endpoint
5. ✅ Monitor logs in Vercel dashboard

---

## 📞 Resources

- **Neon Docs:** https://neon.tech/docs
- **Prisma + Neon:** https://neon.tech/docs/guides/prisma
- **Vercel Docs:** https://vercel.com/docs
- **Connection String Help:** https://neon.tech/docs/reference/connection-string

---

🎉 **Your app is now ready for production with Neon + Vercel!**

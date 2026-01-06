# Security Guidelines

## MongoDB Credentials

**IMPORTANT**: Never commit MongoDB connection strings with actual credentials to the repository.

### Safe Practices

1. **Use Environment Variables**
   - Store MongoDB connection strings in `.env` file
   - `.env` file is already in `.gitignore`
   - Load using `process.env.MONGODB_URL`

2. **Example `.env` file:**
   ```env
   MONGODB_URL=mongodb://username:password@your-cluster.mongodb.net/database?ssl=true&authSource=admin
   DB_NAME=spmart
   PORT=3000
   ```

3. **In Code:**
   ```javascript
   const MONGODB_URL = process.env.MONGODB_URL || 'YOUR_MONGODB_CONNECTION_URL_HERE';
   ```

### If Credentials Were Exposed

If you accidentally committed credentials:

1. **Immediately rotate credentials** in MongoDB Atlas
2. **Remove from Git history** (if needed):
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/file" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (be careful with this):
   ```bash
   git push origin --force --all
   ```

### GitHub Secret Scanning

GitHub automatically scans for exposed secrets. If you see alerts:
- Review the alerts
- Rotate the exposed credentials
- Remove credentials from code
- Use environment variables instead

## Best Practices

- ✅ Use environment variables for all sensitive data
- ✅ Never commit `.env` files
- ✅ Use placeholder values in code examples
- ✅ Document how to set up environment variables
- ❌ Never hardcode credentials
- ❌ Never commit actual connection strings


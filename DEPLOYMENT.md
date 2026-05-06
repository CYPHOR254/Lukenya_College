# Deployment Guide

## CI/CD Overview

This project uses GitHub Actions for continuous integration and deployment.

### CI Workflow (`.github/workflows/ci.yml`)

**Runs on:** Every push to `main` and every pull request targeting `main`

**Steps:**
1. Install Node.js (version from `.nvmrc`)
2. Install dependencies (`npm ci`)
3. Lint (`npm run lint`) -- fails the pipeline on lint errors
4. Test (`ng test --watch=false --browsers=ChromeHeadless`) -- fails on test failures
5. Build (`npm run build`) -- verifies the production build compiles

### Deploy Workflow (`.github/workflows/deploy.yml`)

**Runs on:** GitHub Release published (not every push)

**Steps:**
1. Runs all CI checks (lint, test, build)
2. Builds the Angular SSR app
3. Deploys via SSH + rsync to the production VPS
4. Restarts the PM2 process

---

## Setting Up GitHub Secrets

Go to your repository on GitHub: **Settings > Secrets and variables > Actions > New repository secret**

### Required Secrets

| Secret | Description |
|--------|-------------|
| `SSH_HOST` | Server IP address (e.g. `197.136.12.44`) |
| `SSH_USER` | SSH username (e.g. `lukenya`) |
| `SSH_PRIVATE_KEY` | Ed25519 private key for SSH authentication |
| `SSH_KNOWN_HOSTS` | Server host key fingerprint |

### Generating SSH Keys

On your local machine:

```bash
# Generate a new SSH key pair (no passphrase for CI)
ssh-keygen -t ed25519 -f ~/.ssh/lukenya_deploy -N ""

# Copy the public key to the server
ssh-copy-id -i ~/.ssh/lukenya_deploy.pub lukenya@197.136.12.44

# Get the private key content (paste this as SSH_PRIVATE_KEY secret)
cat ~/.ssh/lukenya_deploy

# Get the known hosts entry (paste this as SSH_KNOWN_HOSTS secret)
ssh-keyscan -H 197.136.12.44
```

### Verifying SSH Access

```bash
ssh -i ~/.ssh/lukenya_deploy lukenya@197.136.12.44 "pm2 list"
```

---

## Creating a Release (Triggering a Deploy)

1. **Tag the commit:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Create a GitHub Release:**
   - Go to your repo on GitHub > **Releases** > **Draft a new release**
   - Choose the tag you just pushed (e.g. `v1.0.0`)
   - Add a title and release notes
   - Click **Publish release**

3. The deploy workflow will automatically run. Monitor it under **Actions** tab.

### Versioning Convention

- `v1.0.0` -- Major release
- `v1.1.0` -- New features
- `v1.1.1` -- Bug fixes

---

## Rolling Back

### Option 1: Re-deploy a Previous Release

1. Go to GitHub **Releases**
2. Find the last known good release
3. Click the `...` menu > **Edit release**
4. Uncheck "Set as the latest release", save, then re-check it and save again
   - Or create a new release pointing to the same tag

Alternatively, manually trigger:
```bash
# Checkout the previous version locally
git checkout v1.0.0

# Build and deploy manually
npm ci && npm run build
rsync -avz --delete dist/ lukenya@197.136.12.44:/home/lukenya/lukenya_college_ui/dist/
ssh lukenya@197.136.12.44 "pm2 restart lukenya-college"
```

### Option 2: SSH Manual Revert

```bash
# SSH into the server
ssh lukenya@197.136.12.44

# If you have a backup of the previous dist/
cp -r /home/lukenya/lukenya_college_ui/dist.bak /home/lukenya/lukenya_college_ui/dist

# Restart
pm2 restart lukenya-college
```

### Option 3: Git Revert + New Release

```bash
# Revert the bad commit
git revert HEAD
git push origin main

# Tag and release the revert
git tag v1.1.1
git push origin v1.1.1
# Then create a GitHub Release for v1.1.1
```

---

## Production Server Details

- **Server:** Ubuntu VPS at the IP configured in `SSH_HOST`
- **App directory:** `/home/lukenya/lukenya_college_ui`
- **Process manager:** PM2, app name `lukenya-college`
- **Port:** 4000 (behind nginx reverse proxy)
- **Domain:** lukenyacollege.ac.ke (HTTPS via Let's Encrypt)

### Useful PM2 Commands (on server)

```bash
pm2 list                    # Show running processes
pm2 restart lukenya-college # Restart the app
pm2 logs lukenya-college    # View app logs
pm2 monit                   # Real-time monitoring
```

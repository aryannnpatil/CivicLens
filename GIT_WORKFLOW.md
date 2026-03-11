# Git Branch Workflow — SIH25031 Hackathon Team

## Branch Map

```
main (production)
└── develop (integration)
    ├── feat/issue-reporting
    ├── feat/admin-dashboard
    └── feat/ai-classification
```

## Branch Purposes

| Branch | Purpose | Who pushes |
|--------|---------|-----------|
| `main` | Live production code | Merge from `develop` at milestones only |
| `develop` | Integration — always deployable | Merge reviewed feature PRs here |
| `feat/*` | Individual features | Each team member |
| `fix/*` | Bug fixes | Any member |
| `hotfix/*` | Emergency production fixes | Any member → merge to `main` + `develop` |

---

## Daily Workflow

### Starting a new task

```bash
# Always branch from develop, never from main
git checkout develop
git pull origin develop
git checkout -b feat/<your-feature-name>
```

### Committing

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add issue creation endpoint
fix: correct CORS origin validation
chore: update .env.example with backup URI
docs: add seed instructions to README
```

```bash
git add .
git commit -m "feat: add POST /api/issues endpoint"
git push origin feat/<your-feature-name>
```

### Opening a Pull Request

- Target: **`develop`** (never `main`)
- PR title: same format as commit message
- At least **1 reviewer** must approve before merge
- Reviewer pulls the branch and runs `npm run dev` locally to verify

---

## Merge Rules

| Action | Rule |
|--------|------|
| feat/* → develop | 1 approval required, squash merge |
| develop → main | 2 approvals required (milestone only) |
| hotfix/* → main | 1 approval, then immediately merge into develop too |

---

## Conflict Resolution

```bash
# If develop has moved ahead of your branch
git checkout feat/<your-feature>
git fetch origin
git rebase origin/develop
# Resolve conflicts, then:
git rebase --continue
git push origin feat/<your-feature> --force-with-lease
```

---

## Setup Commands (one-time per member)

```bash
git clone <repo-url>
cd optimum-ho-solution

# Track the develop branch
git checkout -b develop origin/develop

# Protect main locally (optional)
git config branch.main.description "Production — do not push directly"
```

---

## Quick Reference

```bash
# See all branches
git branch -a

# Delete a merged feature branch
git branch -d feat/<name>
git push origin --delete feat/<name>

# Check what's different between develop and main
git log main..develop --oneline
```

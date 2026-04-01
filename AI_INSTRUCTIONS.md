# AI Assistant Instructions

## Git Repository Protocol

**IMPORTANT:** Always ask the user if they want to commit and push changes to the Final Website GitHub repository before ending a session or after completing significant work.

### Repository Details
- **Remote:** https://github.com/NaailDar/Finalwebsite.git
- **Location:** `/Users/naail/Desktop/Final Website/apex-new-site-main/`
- **Branch:** main

### Workflow
1. After completing changes, ask: *"Would you like me to commit and push these changes to the Final Website GitHub repo?"*
2. If yes, run:
   ```bash
   cd "/Users/naail/Desktop/Final Website/apex-new-site-main"
   git add .
   git commit -m "Descriptive commit message"
   git push
   ```
3. If no, continue with other tasks or end session.

### Notes
- Always provide meaningful commit messages that describe what was changed
- Check `git status` before committing to see what files have changed
- If there are no changes to commit, inform the user

---
*This file serves as a reminder for AI assistants working on this project.*

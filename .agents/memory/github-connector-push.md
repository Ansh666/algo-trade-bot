---
name: GitHub connector push limitation
description: Durable constraint when publishing this project through the connected GitHub integration
---

The GitHub connector can authenticate GitHub REST operations, but it does not bridge the local repository's native git transport. Large or repeated Git Data API writes may also be blocked by the connector gateway's WAF even when individual blob writes succeed.

**Why:** Native `git push` rejected the connector setup as an invalid username/token, while fallback bulk REST uploads were intermittently blocked. Leaving a partial remote repository is worse than stopping cleanly.

**How to apply:** For a complete repository push, use Replit's Git pane after connecting the GitHub repository; do not assume that an attached GitHub connector alone makes `git push` authenticated.
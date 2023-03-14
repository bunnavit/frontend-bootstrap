# frontend-bootstrap

## Dependencies

Install degit globally

```bash
npm install -g degit
```

## Bootstrap

```bash
degit bunnavit/frontend-bootstrap#main <PROJECT_NAME>
```

## Setup

### CI/CD

1. Change the github token name/key in the BuildSpec.yml file when using GithubFrontendDeployPipelineWithDomain ci/cd project
2. Update webhooks after deploying the coreograph project
   a. Go to github repository settings
   b. Edit production webhook to trigger releases event (or modify both to trigger on releases/pushes events)

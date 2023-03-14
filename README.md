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

- Create a fine grained github token

  - -> User settings
  - -> Developer settings
  - -> Personal access tokens
  - -> Fine grained tokens
  - -> Select and add repository permissions
    - Webhooks: read/write
    - Metadata: mandatory read
    - Deployments: read/write
    - Environments: read/write
    - Contents(required for private repos): read/write

- Store fine grained token in AWS Secrets Manager

  - Set token name + token key to be the same

- Change the github token name/key in the BuildSpec.yml file (same as AWS secrets manager)
- Create a certificate in ACM for the following domains in us-east-1 for cloudfront:
  - ${DomainPrefix}.${Domain}
  - www.${DomainPrefix}.${Domain}
  - dev.${DomainPrefix}.${Domain}
  - www.dev.${DomainPrefix}.${Domain}
- Deploy the GithubFrontendDeployPipelineWithDomain
- Update webhooks after deploying the coreograph project
  - Go to github repository settings
  - Edit production webhook to trigger releases event (or modify both to trigger on releases/pushes events)

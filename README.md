# Deploy to Coolify Action

> GitHub Action to deploy applications on your Coolify instance via API

## Features

- Update Docker image configuration
- Trigger application deployments

## Prerequisites

- A running Coolify instance
- Coolify API access token
- Application UUID from your Coolify dashboard

## Installation

Add this action to your workflow:

```yaml
- name: Deploy to Coolify
  uses: carlozanella/deploy-coolify@v1
  with:
    endpoint: ${{ secrets.COOLIFY_ENDPOINT }}
    token: ${{ secrets.COOLIFY_TOKEN }}
    app_uuid: ${{ secrets.COOLIFY_APP_UUID }}
```

Optionally, configure the application to use a new docker image:
```yaml
- name: Deploy to Coolify
  uses: carlozanella/deploy-coolify@v1
  with:
    endpoint: ${{ secrets.COOLIFY_ENDPOINT }}
    token: ${{ secrets.COOLIFY_TOKEN }}
    app_uuid: ${{ secrets.COOLIFY_APP_UUID }}
    image_name: 'my-repository/my-image'
    image_tag: ${{ github.run_number }}
```
This allows to deploy a specific version of an application and allows to easily roll back to a previous image in case of problems.

## Inputs

| Name | Required | Description |
|------|----------|-------------|
| `endpoint` | Yes | Coolify API endpoint (e.g., https://coolify.example.com/api/v1) |
| `token` | Yes | API authentication token |
| `app_uuid` | Yes | UUID of the application to deploy |
| `image_name` | No | Docker image name to update |
| `image_tag` | No | Docker image tag to update |

## Example Workflow

```yaml
name: Deploy Application
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Coolify
        uses: carlozanella/deploy-coolify@v1
        with:
          endpoint: ${{ secrets.COOLIFY_ENDPOINT }}
          token: ${{ secrets.COOLIFY_TOKEN }}
          app_uuid: ${{ secrets.COOLIFY_APP_UUID }}
          image_name: 'my-repository/my-image'
          image_tag: 'latest'
```

## Development

Requirements:
- Node.js 16+
- npm

Setup:
```bash
npm install
npm run build
```

## License

Apache-2.0 - see [LICENSE](LICENSE) for details
const core = require("@actions/core");
const fetch = require("node-fetch");

async function run() {
  try {
    const endpoint = core.getInput("endpoint", { required: true }).replace(/\/+$/, '');
    const token = core.getInput("token", { required: true });
    const appUuid = core.getInput("app_uuid", { required: true });
    const imageName = core.getInput("image_name");
    const imageTag = core.getInput("image_tag");

    const updateUrl = `${endpoint}/applications/${appUuid}`;
    const deployUrl = `${endpoint}/deploy?uuid=${appUuid}`;

    if (imageName && imageName.trim() && imageTag && imageTag.trim()) {
      console.log(`Updating application ${appUuid} with new image ${imageName}:${imageTag}...`);

      const updateResponse = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docker_registry_image_name: imageName,
          docker_registry_image_tag: imageTag,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error(`Failed to update application: ${await updateResponse.text()}`);
      }
    } else {
      console.log("Skipping image update because image name or tag is missing.");
    }

    console.log(`Deploying application ${appUuid}...`);

    const restartResponse = await fetch(deployUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!restartResponse.ok) {
      throw new Error(`Failed to restart application: ${await restartResponse.text()}`);
    }

    console.log("Application restarted successfully!");

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cdn",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("uploads", {
      access: "public",
    });
    new sst.aws.Nextjs("frontend", {
      link: [bucket],
    });
  },
});

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx)",
    "../components/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
  ],

  framework: {
    name: "@storybook/nextjs", 
    options: {},
  },
};
export default config;

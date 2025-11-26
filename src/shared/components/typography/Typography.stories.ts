import Typography from "./Typography.vue";

export default {
  component: Typography,
  title: "Shared Components/Typography",
};

export const Default = {
  render: (args: unknown) => ({
    components: { Typography },
    setup() {
      return { args };
    },
    template: `
      <Typography v-bind="args" :text-align="args.textAlign">{{ args.text }}</Typography>
    `,
  }),
  args: {
    // Not a prop, just a convenience to improve stories
    text: "The quick brown fox jumps over the lazy dog.",
  },
};

export const H1 = {
  ...Default,
  args: {
    ...Default.args,
    variant: "h1",
  },
};

export const H2 = {
  ...Default,
  args: {
    ...Default.args,
    variant: "h2",
  },
};

export const H3 = {
  ...Default,
  args: {
    ...Default.args,
    variant: "h3",
  },
};

export const H4 = {
  ...Default,
  args: {
    ...Default.args,
    variant: "h4",
  },
};

export const LargeText = {
  ...Default,
  args: {
    ...Default.args,
    variant: "large-text",
  },
};

export const Body = {
  ...Default,
  args: {
    ...Default.args,
    variant: "body",
  },
};

export const Caption = {
  ...Default,
  args: {
    ...Default.args,

    variant: "caption",
  },
};

export const Smallest = {
  ...Default,
  args: {
    ...Default.args,
    variant: "smallest",
  },
};

export const Error = {
  ...Default,
  name: "Color Treatment: Error",
  args: {
    ...Default.args,
    colorTreatment: "error",
  },
};

export const Subdued = {
  ...Default,
  name: "Color Treatment: Subdued",
  args: {
    ...Default.args,
    colorTreatment: "subdued",
  },
};

export const RightAlign = {
  ...Default,
  name: "Text Align: Right",
  args: {
    ...Default.args,
    text: "I should be right aligned",
    textAlign: "right",
  },
};

export const CenterAlign = {
  ...Default,
  name: "Text Align: Center",
  args: {
    ...Default.args,
    text: "I should be center aligned",
    textAlign: "center",
  },
};

export const AllCaps = {
  ...Default,
  name: "Text Treatment: All Caps",
  args: {
    ...Default.args,
    text: "I should be all caps",
    textTreatment: "all-caps",
  },
};

<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
/**
 * Component to generate typography with no external
 * style deps other than UICL var(--***)'s
 *
 * TODO: Need to rationalize sizes against styleguide https://www.figma.com/design/Uwg1IvlTgvVA2IvX6WLxOd/Styleguide-(V2)?node-id=14939-59626&p=f&m=dev
 *
 * Most likely this means adding in a Wizard text treatment that affects both h1 and h2
 */
import type { CSSProperties } from "vue";

export type TypographyProps = {
  /**
   * CSS text align propery
   */
  textAlign?: CSSProperties["textAlign"];
  /**
   * Determines the underlying tag and style to display;
   * maps primarily to a certain size and weight of text
   */
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "body" | "caption" | "smallest";
  /**
   * Determines the color of the text
   */
  colorTreatment?: "subdued" | "error";
  /**
   * Special treatments that can be applied to different text sizes
   */
  textTreatment?: "all-caps";
};

withDefaults(defineProps<TypographyProps>(), {
  variant: "body",
  textAlign: "left",
});
</script>

<template>
  <h1
    v-if="variant === 'h1'"
    class="typography-h1 typography-base your-project-component"
  >
    <slot></slot>
  </h1>
  <h2
    v-else-if="variant === 'h2'"
    class="typography-h2 typography-base your-project-component"
  >
    <slot></slot>
  </h2>
  <h3
    v-else-if="variant === 'h3'"
    class="typography-h3 typography-base your-project-component"
  >
    <slot></slot>
  </h3>
  <h4
    v-else-if="variant === 'h4'"
    class="typography-h4 typography-base your-project-component"
  >
    <slot></slot>
  </h4>
  <h5
    v-else-if="variant === 'h5'"
    class="typography-h5 typography-base your-project-component"
  >
    <slot></slot>
  </h5>
  <p
    v-else-if="variant === 'body'"
    class="typography-body typography-base your-project-component"
    :class="{
      'typography-subdued': colorTreatment === 'subdued',
      'typography-error': colorTreatment === 'error',
      'typography-all-caps': textTreatment === 'all-caps',
    }"
  >
    <slot></slot>
  </p>
  <p
    v-else-if="variant === 'caption'"
    class="typography-caption typography-base your-project-component"
    :class="{
      'typography-subdued': colorTreatment === 'subdued',
      'typography-error': colorTreatment === 'error',
      'typography-all-caps': textTreatment === 'all-caps',
    }"
  >
    <slot></slot>
  </p>
  <p
    v-else-if="variant === 'smallest'"
    class="typography-smallest typography-base your-project-component"
    :class="{
      'typography-subdued': colorTreatment === 'subdued',
      'typography-all-caps': textTreatment === 'all-caps',
    }"
  >
    <slot></slot>
  </p>
</template>

<style scoped>
.typography-base {
  color: var(--coal-black);
  font-family: var(--your-project-font-family);
  /* Reset margin; layout should control margin */
  margin: 0;
  text-align: v-bind(textAlign);
  font-weight: normal;
  line-height: 1.25;
}

/* Text treatments */
.typography-subdued {
  color: var(--your-project-color-text-subdued);
}

.typography-error {
  /* TODO: THis needs local var */
  color: var(--error-red);
  font-weight: 600;
}

.typography-all-caps {
  text-transform: uppercase;
}

/* Variants */
.typography-h1 {
  font-size: 32px;
  font-weight: 700;
}

.typography-h2 {
  font-size: 26px;
  font-weight: 700;
}

.typography-h3 {
  font-size: 22px;
  font-weight: 600;
}

.typography-h4 {
  font-size: 18px;
}

.typography-h5 {
  font-size: 16px;
  font-weight: 700;
}

.typography-body {
  font-size: var(--your-project-font-size-default);
}

/* TODO: Refactor to be typography-small */
.typography-caption {
  font-size: 12px;
}

.typography-smallest {
  font-size: 10px;
}
</style>

import { defineCustomElement } from "vue";
import LightDomElement from "@/shared/util/LightDomElement.mjs";
import HelloWorldController from "./components/hello-world/HelloWorldController.vue";

import "@impactinc/frontend-theme-tokens/fonts.css";
import "@impactinc/frontend-theme-tokens/index.css";
import "@impactinc/frontend-theme-tokens/themes.css";
import "@/shared/assets/styles.css";

// SHADOW DOM - in case your pattern needs this
const HelloWorld = defineCustomElement(HelloWorldController);
customElements.define("shadow-dom-hello-world", HelloWorld);

// LIGHT DOM - on pattern needs light DOM approach
LightDomElement.define("hello-world", HelloWorldController);

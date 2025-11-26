function loadWithEnvFriend(contentLoader) {
  if (!window.__envfriend) {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://js-cdn.impact.com/npm/envfriend@0.0.16/dist/tool.js"
    );
    script.onload = contentLoader;

    document.head.appendChild(script);
  } else {
    contentLoader();
  }
}

function addLandingPageAssetsJs() {
  const project = "onboarding-ui/landing-pages";
  const environments = {
    configuration: {
      environments: [
        {
          id: "production",
        },
        {
          id: "stage6",
        },
        {
          id: "stage27",
        },
        {
          id: "test",
        },
      ],
    },
  };

  window.__envfriend.appendEl(
    [
      {
        el: "script",
        attrs: [
          [
            "src",
            "https://ui.assets.impact.com/onboarding-ui/mono/{env}/landing-pages.js",
            "type",
            "module",
          ],
        ],
        target: "head",
      },
    ],
    {
      project,
      environments,
    }
  );
}

loadWithEnvFriend(addLandingPageAssetsJs);

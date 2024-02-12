We are leveraging the [Polyglot](https://airbnb.io/polyglot.js/) in order to integrate within our way of doing things:

```bash
npm i -S @redlibs/x-ui-react-bundle @redlibs/x-ui-i18n-bundle
```

```ts
import { Kernel } from "@redlibs/core";
import { XUII18NBundle } from "@redlibs/x-ui-i18n-bundle";
import { XUIReactBundle } from "@redlibs/x-ui-react-bundle";

const kernel = new Kernel({
  bundles: [
    new XUIReactBundle(),
    new XUII18NBundle({
      defaultLocale: "fr", // default is "en",
      // You can omit this if you want to use the default options for polyglots
      polyglots: [
        // ...rest represents the rest of custom options for Polyglot constructor, includign phrases
        { locale: "en", ...rest },
      ],
    });
  ]
})
```

```ts
import { useTranslate } from "@redlibs/x-ui-i18n-bundle";

function Component() {
  const t = useTranslate();
  const tWithPRefix = useTranslate("pages.home"); // tWithPrefix("header.text")

  return <h1>{t('pages.home.header.text')</h1>;
}
```

Changing the language of the default:

```ts
import { I18NService } from "@redlibs/x-ui";

class UIAppBundle extends Bundle {
  async init() {
    const i18n = this.container.get(I18NService);

    // Add messages to your locale
    i18n.extend("en", messages);

    // get it from window.locale or session, or cookies, or however you find fit
    const locale = "";
    i18n.setLocale(locale);
  }
}
```

When you change your language from the app simply use the `I18NService` and run `setLocale()`.

## Events

You can listen to when local is changed via `LocaleChangedEvent`:

```ts
class UIAppBundle extends Bundle {
  async prepare() {
    this.eventManager.addListener(LocaleChangedEvent, (e) => {
      // e.data.locale
    });
  }
}
```

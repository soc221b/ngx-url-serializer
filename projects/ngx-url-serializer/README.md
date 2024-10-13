# ngx-url-serializer

[Documentation](https://github.com/soc221b/ngx-url-serializer#ngx-url-serializer)

Basic Usage with the [qs](https://www.npmjs.com/package/qs) library:

```bash
npm install ngx-url-serializer qs
```

```typescript
// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { UrlSerializer } from "@angular/router";
import { QsUrlSerializer } from "ngx-url-serializer";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: UrlSerializer,
      useClass: QsUrlSerializer,
    },
  ],
};
```

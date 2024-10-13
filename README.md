# ngx-url-serializer

## Installation

```bash
npm install ngx-url-serializer
```

## Usage

### Preset Serializer

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

      // if you want to override the default options:
      // useValue: new QsUrlSerializer({ parse: { ... }, stringify: { ... } }),
    },
  ],
};
```

### Custom Serializer

```typescript
// custom-url-serializer.ts
import { QueryUrlSerializer } from "ngx-url-serializer";

export class CustomUrlSerializer extends QueryUrlSerializer {
  constructor() {
    super();
  }

  override parseQueryParams(query: string): undefined | Params {
    return query.startsWith("?")
      ? // implement your custom query string parsing logic here
      : undefined;
  }

  override serializeQueryParams(queryParams: Params): string {
    return Object.keys(queryParams).length
      ? // implement your custom query string serialization logic here
      : "";
  }
}
```

```typescript
// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { UrlSerializer } from "@angular/router";
import { CustomUrlSerializer } from "./custom-url-serializer";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: UrlSerializer,
      useClass: CustomUrlSerializer,
    },
  ],
};
```

# Alert Component

All available props see in [Alert.props.ts](./Alert.props.ts)

```
Used in useAlerts()
```

## Usage

```vue
<template>
  <alert type="success" content="Hello" />
  <alert type="error" content="Error" />
</template>

<script setup lang="ts">
import { Alert } from '@tok/ui/components/Alert';
</script>
```

## Customization

```scss
/* global.styles.scss */

.tok-alert {
  &[data-type='custom'] {
    background: red;
    color: white;

    .tok-alert {
      // color for icon
      &-icon {
        color: white;
      }

      // color for close icon
      &-close {
        color: black;
      }
    }
  }
}
```

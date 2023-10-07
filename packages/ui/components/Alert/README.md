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

```vue
<template>
  <alert type="custom" content="Hello" />
</template>

<script setup lang="ts">
import { Alert } from '@tok/ui/components/Alert';
</script>
```

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

or inside other component with style in scope mode

```vue
<template>
  <div class="container">
    <alert type="custom" content="Hello" />
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@tok/ui/components/Alert';
</script>

<style lang="scss" scope>
.container {
  .tok-alert {
    &[data-type='custom'] {
      ...
    }
  }
}
</style>
```

<template>
  <Image v-if="type === 'image'" v-bind="(props as any)" />
  <Sticker v-else-if="type === 'sticker'" v-bind="(props as any)" />
  <Icon v-else-if="type === 'icon'" v-bind="(props as any)" />
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
import Image from './Image.vue';
import { MediaPressetProps } from './Media.presset.props';
import Sticker from './Sticker.vue';

const props = defineProps<MediaPressetProps>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>hi</th>
        <th>hi</th>
        <th>hi</th>
        <th>hi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>hi</td>
        <td>hi</td>
        <td>hi</td>
        <td>hi</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
});
</script>

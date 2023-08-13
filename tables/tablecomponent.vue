<template>
    <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <slot name="thead"></slot>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <slot name="tbody"></slot>
        </tbody>
      </table>
    </div>
</template>
<script>
export default {
  name: "TableComponent",
};
</script>

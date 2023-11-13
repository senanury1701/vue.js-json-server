<script setup lang="ts">
import NewFilterData from '@/views/pages/allUser/filter/FilterTable.vue'
import UsersTable from '@/views/pages/allUser/usersTable.vue'

interface FilterItem {
  type: string
  title: string
  detail: {
    label: string
    placeholder: string
    items?: string[]
    type?: string
  }
}

const sharedData = ref()

watchEffect(sharedData.value)

const handleDataChange = (transformedData: object) => {
  sharedData.value = transformedData
}

const filter: FilterItem[] = [
  {
    type: 'VTextField',
    title: 'salary',
    detail: {
      label: 'salary',

      placeholder: 'Salary',
      type: 'number',
    },
  },
  {
    type: 'VTextField',
    title: 'age',
    detail: {
      label: 'age',

      placeholder: 'Age',
      type: 'number',
    },
  },

]
</script>

<template>
  <div>
    <NewFilterData
      class="mt-5"
      :filter="filter"
      @data-changed="handleDataChange"
    />
    <UsersTable :shared-data="sharedData" />
  </div>
</template>

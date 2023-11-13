<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  filter: Object,
})

const emit = defineEmits(['dataChanged'])
const filters = ref(props.filter)
const selectedFilters = ref<Record<string, string >>({})

const updateFilter = () => {
  const transformedData = selectedFilters

  emit('dataChanged', transformedData)
}
</script>

<template>
  <div>
    <VCard
      title="Search Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <div
            v-for="filter in filters"
            :key="filter.title"
          >
            <VCol
              v-if="filter.type === 'VAutocomplete'"
              class="widht-Filter"
            >
              <VAutocomplete
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
                clearable
                clear-icon="mdi-close"
              />
            </VCol>

            <!-- 👉 Select Status -->
            <VCol
              v-else-if="filter.type === 'AppDateTimePicker'"
              class="widht-Filter"
            >
              <AppDateTimePicker
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
                placeholder="Select Date"
                :config="{ dateFormat: 'Y-m-d', disable: [{ from: `${currentYear}-${currentMonth}-20`, to: `${currentYear}-${currentMonth}-25` }] }"
                clearable
                clear-icon="mdi-close"
              />
            </VCol>
            <VCol
              v-else-if="filter.type === 'VTextField'"
              class="widht-Filter"
            >
              <VTextField
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
                clearable
                clear-icon="mdi-close"
              />
            </VCol>
            <VCol
              v-else-if="filter.type === 'VCheckbox'"
              class="widht-Filter"
            >
              <VCheckbox
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
              />
            </VCol>
            <VCol
              v-else-if="filter.type === 'VCombobox'"
              class="widht-Filter"
            >
              <VCombobox
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
                clearable
                clear-icon="mdi-close"
              />
            </VCol>
            <VCol
              v-else-if="filter.type === 'VRadioGroup'"
              class="widht-Filter"
            >
              <VRadioGroup
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
              />
            </VCol>
            <VCol
              v-else-if="filter.type === 'VSelect'"
              class="widht-Filter"
              clearable
              clear-icon="mdi-close"
            >
              <VSelect
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
              />
            </VCol>
            <VCol
              v-else-if="filter.type === 'VSwitch'"
              class="widht-Filter"
            >
              <VSwitch
                v-bind="filter.detail"
                v-model="selectedFilters[filter.title]"
              />
            </VCol>
          </div>

          <VCol class="widht-Filter">
            <VBtn
              class="w-100 h-100 btn-height"
              @click="updateFilter"
            >
              Filtrele
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.widht-Filter {
  max-inline-size: 450px;
  min-inline-size: 320px;
}

.btn-height {
  max-inline-size: 300px;
  min-block-size: 40px;
}
</style>

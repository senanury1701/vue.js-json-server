<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useStore } from 'vuex'
import axios from '@/configs/axiosConfigs'
import type { signUser } from '@/types/signUp'
import AddNewUserDrawer from '@/views/pages/allUser/add-user/AddNewUserDrawer.vue'

const props = defineProps({
  sharedData: {
    type: Object,
    default: () => ({}),
  },
})

const store = useStore()
const userList = ref([])
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })
const search = ref('')
const user = store.state.loginModule.user.status
const isAddNewUserDrawerVisible = ref(false)
const selectedRows = ref<string[]>([])
const filterData = ref(props.sharedData.value)

const fetchUser = async () => {
  try {
    let response

    if (filterData.value) {
      response = await axios.get('users', {
        params: filterData.value,
      })
      userList.value = response.data
    }
    else if (!filterData.value) {
      response = await axios.get('users', {
        params: {},
      })
      userList.value = response.data
    }
  }
  catch (error) {
    console.error('Hata oluştu: ', error)
  }
}

watchEffect(fetchUser)
watchEffect(() => console.log(filterData.value))

watch(() => filterData.value, _ => {
  console.log(filterData)
  fetchUser()
},
)

const deleteUser = (id: number) => {
  store.dispatch('allUserModule/deleteUser', id)
  fetchUser()
}

const addNewUser = (data: signUser) => {
  axios.post('users', data)
    .then(_ => {
      fetchUser()

      return null
    }).catch(e => {
      if (e.response && e.response.data)
        return null

      else
        console.error('Unexpected error occurred:', e)
    })
}

// headers
const headers = [
  { title: 'NAME', key: 'name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div>
    <VCard>
      <VCardText class="d-flex justify-space-between flex-wrap gap-4">
        <!-- 👉 Export button -->
        <VBtn
          variant="outlined"
          color="secondary"
          prepend-icon="mdi-tray-arrow-up"
          :disabled="!selectedRows.length"
          :to="{ name: 'allUser-tab', params: { selectedUsers: selectedRows } }"
        >
          Export
        </VBtn>

        <div class="app-user-search-filter d-flex flex-wrap align-center gap-x-6 gap-y-4">
          <!-- 👉 Search  -->
          <VTextField
            v-model="search"
            placeholder="Search User"
            density="compact"
            style="min-inline-size: 10rem;"
            class="order-2 order-sm-1"
          />

          <!-- 👉 Add user button -->
          <VBtn
            v-if="user === 1 || user === 2"
            class="order-sm-2 order-1"
            prepend-icon="mdi-plus"
            @click="isAddNewUserDrawerVisible = true"
          >
            Add User
          </VBtn>
        </div>
      </VCardText>
      <VDataTable
        v-model="selectedRows"
        :headers="headers"
        :items="userList"
        :items-per-page="options.itemsPerPage"
        :page="options.page"
        :search="search"
        show-select
        @update:options="options = $event"
      >
        <!-- full name -->
        <template #item.name="{ item }">
          <div class="d-flex flex-column ">
            <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.raw.name }}</span>
            <small>{{ item.raw.lastName }}</small>
          </div>
        </template>

        <template #item.email="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column ">
              <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.raw.email }}</span>
            </div>
          </div>
        </template>

        <template #item.salary="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column ">
              <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.raw.salary }}</span>
            </div>
          </div>
        </template>
        <template #item.age="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column ">
              <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.raw.age }}</span>
            </div>
          </div>
        </template>

        <!-- status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveStatusVariant(item.raw.status).color"
            class="font-weight-medium"
            size="small"
          >
            {{ resolveStatusVariant(item.raw.status).text }}
          </VChip>
        </template>

        <template #item.actions="{ item }">
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />

            <VMenu activator="parent">
              <VList>
                <VListItem :to="{ name: 'allUser-id', params: { id: item.raw.id } }">
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>View</VListItemTitle>
                </VListItem>
                <VListItem v-if="user === 1 || user === 2">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>
                <VListItem
                  v-if="user === 1 || user === 2"
                  @click="deleteUser(item.raw.id)"
                >
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <template #bottom>
          <VCardText class="pt-2">
            <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
              <VTextField
                v-model="options.itemsPerPage"
                label="Rows per page:"
                type="number"
                min="-1"
                max="15"
                hide-details
                variant="underlined"
                style="min-width: 5rem;max-width: 8rem;"
              />

              <VPagination
                v-model="options.page"
                :total-visible="$vuetify.display.smAndDown ? 3 : 5"
                :length="Math.ceil(userList.length / options.itemsPerPage)"
              />
            </div>
          </VCardText>
        </template>
      </VDataTable>
    </VCard>
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </div>
</template>

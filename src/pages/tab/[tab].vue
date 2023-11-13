<script setup lang="ts">
import axios from '@/configs/axiosConfigs'

const route = useRoute()
const selectedUsers = ref(route.params.selectedUsers)
const userDatas = ref<string[]>([])

const getAxios = userId => {
  axios.get(`users/${userId}`).then(r => {
    userDatas.value.push(r.data)
  })
}

const usersGet = () => {
  const selectedIds = selectedUsers.value.map(selectedId => parseInt(selectedId))

  selectedIds.forEach(userId => {
    getAxios(userId)
  })
}

onMounted(() => {
  usersGet()
})
</script>

<template>
  <div>
    <VCardItem>
      <IconBtn :to="{ name: 'allUser' } ">
        <VIcon icon=" mdi-arrow-left" />
      </IconBtn>
    </VCardItem>
    <VExpansionPanels multiple>
      <VExpansionPanel
        v-for="userData in userDatas"
        :key="userData"
      >
        <div class="mt-2">
          <VExpansionPanelTitle>
            <h3>{{ userData.name }}</h3>
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <VTable>
              <VCardText>
                <div class="d-flex align-center me-8 mb-2">
                  <!-- 👉 Details -->
                  <VCardText>
                    <h6 class="text-h6">
                      Details
                    </h6>

                    <VDivider class="mt-4" />

                    <!-- 👉 User Details list -->
                    <VList class="card-list mt-2">
                      <VListItem>
                        <VListItemTitle class="text-sm">
                          <span class="font-weight-medium">
                            age:
                          </span>
                          <span class="text-body-2">{{ userData.age }}</span>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle class="text-sm">
                          <span class="font-weight-medium">
                            salary:
                          </span>
                          <span class="text-body-2">
                            {{ userData.salary }}
                          </span>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle class="text-sm">
                          <span class="font-weight-medium">
                            status:
                          </span>
                          <span class="text-body-2">{{ userData.status ? 'active' : 'passive' }}</span>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle class="text-sm">
                          <span class="font-weight-medium">
                            email:
                          </span>
                          <span class="text-body-2">{{ userData.email }}</span>
                        </VListItemTitle>
                      </VListItem>

                      <VListItem>
                        <VListItemTitle class="text-sm">
                          <span class="font-weight-medium">
                            language:
                          </span>
                          <span
                            v-for="(selectedLanguage, index) in userData.language"
                            :key="index"
                          >
                            {{ selectedLanguage }}
                            <p v-if="index < userData.language.length - 1">, </p>

                          </span>
                        </VListItemTitle>
                      </VListItem>
                    </VList>
                  </VCardText>
                </div>
              </vcardtext>
            </VTable>
          </VExpansionPanelText>
        </div>
      </VExpansionPanel>
    </VExpansionPanels>
  </div>
</template>

<style lang="scss">
.v-expansion-panels.customized-panels {
  --v-title-bg-light: #fafafa;
  --v-title-bg-dark: #3a3e5b;

  .v-expansion-panel-title {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    margin-block-end: -1px;
  }

  .v-expansion-panel-text__wrapper {
    padding: 20px;
  }
}
</style>

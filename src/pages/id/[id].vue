<script setup lang="ts">
import axios from '@/configs/axiosConfigs'

interface Props {
  userData: {
    id: number
    name: string
    age: number
    salary: number
    status: boolean
    email: string
  }
}

const route = useRoute()
const userId = ref(route.params.id)

const isUserInfoEditDialogVisible = ref(false)
const userData = ref<Props>()

/* const updatedData = (updatedUserData: Props) => {
  userData.value = updatedUserData
} */

onMounted(async () => {
  try {
    await axios.get(`users/${userId.value}`).then(r => {
      userData.value = r.data
    })
  }
  catch (error) {
    console.error('Kullanıcı getirme hatası:', error)
  }
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard v-if="userData">
          <VCardItem>
            <IconBtn :to="{ name: 'allUser' } ">
              <VIcon icon=" mdi-arrow-left" />
            </IconBtn>
          </VCardItem>
          <VCardText class="text-center pt-15">
            <h6 class="text-h6 mt-4">
              {{ userData.name }}
            </h6>

            <VChip
              label
              size="small"
              class="text-capitalize mt-4"
            >
              {{ userData.position }}
            </VChip>
          </VCardText>

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
                      <span class="font-weight-medium">office:</span>
                      <span class="text-body-2">
                        {{ userData.office }}
                      </span>
                    </VListItemTitle>
                  </VListItem>

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
                        gender:
                      </span>

                      {{ userData.gender }}
                    </VListItemTitle>
                  </VListItem>

                  <VListItem>
                    <VListItemTitle class="text-sm">
                      <span class="font-weight-medium">startDate: </span>
                      <span class="text-capitalize text-body-2">{{ userData.startDate }}</span>
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
                        country:
                      </span>
                      <span class="text-body-2">{{ userData.country }}</span>
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
                        contact:
                      </span>
                      <span class="text-body-2">{{ userData.contact }}</span>
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
          </VCardText>
          <VCardText class="d-flex justify-center">
            <VBtn
              variant="elevated"
              class="me-4"
              @click="isUserInfoEditDialogVisible = true"
            >
              Edit
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!--
      <UserInfoEditDialog
      v-model:isDialogVisible="isUserInfoEditDialogVisible"
      :user-data="userData"
      @updated-data="updatedData"
      />
    -->
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.8rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>

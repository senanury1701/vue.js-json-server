<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import type { signUser } from '@/types/signUp'

import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import axios from '@/configs/axiosConfigs'
import authV2RegisterIllustrationBorderedDark from '@images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2RegisterIllustrationDark from '@images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@images/pages/auth-v2-register-illustration-light.png'
import authV2RegisterMaskDark from '@images/pages/auth-v2-register-mask-dark.png'
import authV2RegisterMaskLight from '@images/pages/auth-v2-register-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { alphaDashValidator, confirmedValidator, emailValidator, passwordValidator, requiredValidator } from '@validators'

const refVForm = ref<VForm>()
const lastName = ref('Doe')
const email = ref('john@example.com')
const password = ref('')
const name = ref('johnoe')
const route = useRoute()
const router = useRouter()
const passwordConfirm = ref()
const privacyPolicies = ref()

const isPasswordVisible = ref(false)
const min = 2
const max = 4
const randomSayi = Math.floor(Math.random() * (max - min + 1) + min)
const mins = 50000
const maxs = 150000
const randomSayis = Math.floor(Math.random() * (maxs - mins + 1) + mins)
const minA = 20
const maxA = 36
const randomSayiA = Math.floor(Math.random() * (maxA - minA + 1) + minA)
const authV2RegisterMask = useGenerateImageVariant(authV2RegisterMaskLight, authV2RegisterMaskDark)
const authV2RegisterIllustration = useGenerateImageVariant (authV2RegisterIllustrationLight, authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight, authV2RegisterIllustrationBorderedDark, true)

const errors = ref<Record<string, string | undefined>>({
  mail: undefined,
  password: undefined,
})

const register = () => {
  const data: signUser = {
    name: name.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    status: randomSayi,
    salary: randomSayis,
    age: randomSayiA,
  }

  axios.post('users', data)
    .then(_ => {
      router.replace(route.query.to ? String(route.query.to) : 'login')

      return null
    }).catch(e => {
      if (e.response && e.response.data) {
        const { errors: formErrors } = e.response.data

        errors.value = formErrors
      }
      else {
        console.error('Unexpected error occurred:', e)
      }
    })
}

const onSubmit = () => {
  refVForm.value?.validate()
    .then(({ valid: isValid }) => {
      if (isValid)
        register()
    })
}
</script>

<template>
  <div class="auth-logo d-flex align-center gap-x-2">
    <div>
      <VNodeRenderer :nodes="themeConfig.app.logo" />
    </div>

    <h5 class="text-h5 font-weight-bold leading-normal text-capitalize">
      {{ themeConfig.app.title }}
    </h5>
  </div>

  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="8"
      class="d-none d-md-flex align-center justify-center position-relative"
    >
      <!-- here your illustrator -->
      <div class="d-flex align-center justify-center pa-10">
        <img
          :src="authV2RegisterIllustration"
          class="auth-illustration w-100"
          alt="auth-illustration"
        >
      </div>
      <VImg
        :src="authV2RegisterMask"
        class="d-none d-md-flex auth-footer-mask"
        alt="auth-mask"
      />
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h5 class="text-h5 mb-1">
            Adventure starts here 🚀
          </h5>
          <p class="mb-0">
            Make your app management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="name"
                  autofocus
                  :rules="[requiredValidator]"
                  label="name"
                  placeholder="john"
                />
              </VCol>
              <!-- Username -->
              <VCol cols="12">
                <VTextField
                  v-model="lastName"
                  autofocus
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="Username"
                  placeholder="johnDoe"
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                />
              </VCol>
              <VCol>
                <VTextField
                  v-model="password"
                  :rules="[passwordValidator, requiredValidator]"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="passwordConfirm"
                  :rules="[requiredValidator, confirmedValidator(password, passwordConfirm)]"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center mt-1 mb-4">
                  <VCheckbox
                    id="privacy-policy"
                    v-model="privacyPolicies"
                    :rules="[requiredValidator]"
                    inline
                  >
                    <template #label>
                      <span class="me-1">
                        I agree to
                        <a
                          href="javascript:void(0)"
                          class="text-primary"
                        >privacy policy & terms</a>
                      </span>
                    </template>
                  </VCheckbox>
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  Sign up
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in instead
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>

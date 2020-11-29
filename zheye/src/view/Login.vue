<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input ref="inputRef" type="text" :rules="emailRules" v-model="emailVal"  placeholder="请输入邮箱地址"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password" :rules="passwordRules" v-model="passwordVal" placeholder="请输入密码"></validate-input>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput , { RuleProps } from "../components/ValidateInput.vue";

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter();
    const state = useStore<GlobalDataProps>();
    const emailRules: RuleProps = [
      { type: "required", message: "邮箱不能为空" },
      { type: "email", message: "邮箱格式不正确" }
    ]
    const passwordRules: RuleProps = [
      { type: "required", message: "密码不能为空" }
    ]
    const emailVal = ref<string>("");
    const passwordVal = ref<string>("");
    const inputRef = ref<any>();
    const onFormSubmit = (result: boolean) => {
      console.log("登陆了", inputRef.value.validateInput());
      if(result) {
        router.push("/");
        state.commit("login");
      }
    }
    return {
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      inputRef,
      onFormSubmit
    }
  },
});
</script>

<style>
</style>
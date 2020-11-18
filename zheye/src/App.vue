<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <!-- <column-list :list="list"></column-list> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          ref="inputRef"
          type="text" 
          :rules="emailRules" 
          v-model="emailVal" 
          placeholder="请输入邮箱地址"
        ></validate-input>
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
import { defineComponent, reactive, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateForm from "./components/ValidateForm.vue";
import ValidateInput , { RuleProps } from "./components/ValidateInput.vue";

export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup(props, context) {
    const testData: ColumnProps[] = [
      {
        id: 1,
        avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
        title: "title1",
        description: "desc1",
      },
      {
        id: 2,
        avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
        title: "title2",
        description: "desc2",
      },
      {
        id: 3,
        avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
        title: "title3",
        description: "desc3",
      },
      {
        id: 4,
        avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg",
        title: "title4",
        description: "desc4",
      },
    ];
    const currentUser: UserProps = {
      isLogin: true,
      name: "lx",
    };
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
      console.log("123", inputRef.value.validateInput());
    }

    return {
      list: testData,
      user: currentUser,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      inputRef,
      onFormSubmit
    };
  },
});
</script>
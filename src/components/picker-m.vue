

<template>
  <popup :value="value" round position="bottom" @close="closePopUp">
    <picker
      show-toolbar
      :columns="columns"
      @cancel="handlePickerCancel"
      @change="handlePickerChange"
      @confirm="onConfirm"
    />
    <!-- 
      :loading="loading" -->
  </popup>
</template>

<script>
import Popup from "vant/lib/popup";
import Picker from "vant/lib/picker";
import "vant/lib/popup/style";

import "vant/lib/picker/style";

export default {
  name: "PickerM",
  components: {
    Popup,
    Picker
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    columns: Array,
    loading: Boolean,
    pickValues: Array
  },
  data() {
    return {
      pickerValue: "",
      showPicker: false
      // columns: [
      //   {
      //     text: "浙江",
      //     children: [
      //       {
      //         text: "杭州"
      //       },
      //       {
      //         text: "温州"
      //       }
      //     ]
      //   },
      //   {
      //     text: "福建",
      //     children: [
      //       {
      //         text: "福州"
      //       },
      //       {
      //         text: "厦门"
      //       }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    closePopUp() {},
    // 动态获取数据
    handlePickerChange(picker, values, index) {
      console.log("handlePickerChange:", picker, values, index);
      this.$emit("change", { picker, values, index });
    },
    handlePickerCancel() {
      this.$emit("update:value", false);
    },
    onConfirm(values,index) {
      this.pickerValue = values;
      // this.showPicker = false;
      this.$emit("update:value", false);
      this.$emit("confirm", {values,index});

    }
  }
};
</script>

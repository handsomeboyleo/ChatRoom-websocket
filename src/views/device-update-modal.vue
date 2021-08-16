<template>
  <el-dialog
    :visible="visible"
    :area="[624, 345]"
    title="设备升级"
    @close="setVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    xxx
  </el-dialog>
</template>

<script>
export default {
  name: "device-update-modal",
  props: {},
  data: () => {
    return {
      visible: false,
    };
  },
  computed: {},
  methods: {
    setVisible() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style></style>

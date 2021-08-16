<template>
    <el-tooltip
        content="请先选择需要升级的设备"
        placement="bottom"
        :disabled='devices.length!=0'
    >
        <div> 
            <DeviceUpdateModal
                ref='visible'
            />
            <el-button
             :disabled='devices.length==0'
             @click='openUpdateDialog'
             >升级</el-button>
        </div>
    </el-tooltip>
</template>

<script>
import DeviceUpdateModal from './device-update-modal.vue'
export default {
    name:'device-update-button',
    components:{
        DeviceUpdateModal
    },
    props:{
        devices:{
            type:Array,
            defualt:[]
        }
    },
    data:()=>{
        return {
            visible:false
        }
    },
    methods:{
        openUpdateDialog(){
            this.$refs.visible.setVisible()
        }
    },
    computed:{
      
    }
}
</script>

<style>

</style>
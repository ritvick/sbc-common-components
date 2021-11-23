<template>
  <v-dialog v-model="mobileDevice" width="25rem" attach="">
    <v-card>
      <v-card-title class="justify-center">
        <v-icon color="red" x-large>mdi-alert-circle-outline</v-icon>
      </v-card-title>
      <v-divider vertical></v-divider>
      <v-card-title class="justify-center text-center">
        <div>Mobile Device Use is <br/>
        not Recommended</div>
      </v-card-title>
      <v-card-text class="text-center">
        <p>
          Use of this application with a mobile device is not recommended at this time. You may experience payment issues or
          other errors which may affect the accuracy of information submitted.
        </p>
        <p>
          It is recommended that you return to this site from your desktop or laptop computer.
        </p>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn text class="mobile-alert-ok-btn" @click="mobileDevice = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class MobileDeviceAlert extends Vue {
  private mobileDevice: boolean = false
  private isMobileDevice (): boolean {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
    }

    return false
  }

  private async mounted () {
    this.mobileDevice = this.isMobileDevice()
  }
}
</script>

<style lang="scss" scoped>
.mobile-alert-ok-btn {
  background-color: #1669bb !important;
  width: 6.375rem;
  margin-bottom: 20px;
  color: #fff !important;
}
</style>

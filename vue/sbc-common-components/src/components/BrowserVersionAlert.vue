<template>
  <sbc-system-banner
    :show="browserSupported === false"
    type="warning"
    :message="alertMessage"
  ></sbc-system-banner>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import SbcSystemBanner from './SbcSystemBanner.vue'

@Component({
  components: {
    SbcSystemBanner
  }
})
export default class BrowserVersionAlert extends Vue {
  @Prop({ default: `This website will not work properly in your current browser. We recommend viewing this website
  in a newer browser. BC Registries and Online Services websites work better when viewed in the latest versions of
  most popular new browsers.` })
  readonly alertMessage: string

  @Prop({ default: true })
  browserSupported: boolean

  private getBrowser (): { name: string; version: number } {
    let ua = navigator.userAgent
    let tem: string[]
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return { name: 'IE', version: parseInt(tem[1] || '') }
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/)
      if (tem != null) { return { name: 'Opera', version: parseInt(tem[1]) } }
    }

    // MS Edge Html
    if (window.navigator.userAgent.indexOf('Edge') > -1) {
      // eslint-disable-next-line no-useless-escape
      tem = ua.match(/\Edge\/(\d+)/)

      if (tem != null) {
        return { name: 'Edge', version: parseInt(tem[1]) }
      }
    }

    // MS Edge Chromium
    if (window.navigator.userAgent.indexOf('Edg') > -1) {
      // eslint-disable-next-line no-useless-escape
      tem = ua.match(/\Edg\/(\d+)/)

      if (tem != null) {
        return { name: 'Edge', version: parseInt(tem[1]) }
      }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1])
    }
    return {
      name: M[0],
      version: +M[1]
    }
  }

  private isSupported (browser: { name: string; version: number }): boolean {
    let supported: boolean = true

    if ((browser.name === 'MSIE' || browser.name === 'IE') && browser.version <= 11) {
      supported = false
    }
    return supported
  }

  private async mounted () {
    this.browserSupported = this.isSupported(this.getBrowser())
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-alert__wrapper {
      margin: 0 auto;
      max-width: 1382px;
    }
  }
</style>

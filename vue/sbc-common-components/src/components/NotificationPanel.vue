<template>
  <div
    v-if="showNotifications"
    v-on:clickout="emitClose()"
  >
    <v-overlay></v-overlay>
    <v-navigation-drawer
      right
      app
      :width="440"
      style="top: 70px; max-height: calc(100% - 0);"
    >
      <v-app-bar
        flat
        outlined
        color="#FCBA19"
      >
        <v-toolbar-title class="toolbar-title">What's New at BC Registries</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          large
          class="dialog-close"
          @click="emitClose()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-list flat>
        <v-list-item-group color="primary">
          <template v-for="(item, i) in notifications">
            <v-list-item :key="i">
              <v-row dense>
                <v-col class="d-flex" cols="1">
                  <span :class="!item.read && (item.priority ? 'dot-red' : 'dot-blue')">
                  </span>
                </v-col>
                <v-col>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold list-subtitle">{{item.title}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.date}}</v-list-item-subtitle>
                  <v-spacer></v-spacer>
                  <v-list-item-content v-html="item.description"></v-list-item-content>
                </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider v-if="i < notifications.length - 1" :key="`${i}-divider`"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Notification } from '../models/notification'
import { mapState, mapActions } from 'vuex'
import NotificationModule from '../store/modules/notification'
import { getModule } from 'vuex-module-decorators'
import 'clickout-event'

@Component({
  name: 'NotificationPanel',
  beforeCreate () {
    this.$store.isModuleRegistered = function (aPath: string[]) {
      let m = (this as any)._modules.root
      return aPath.every((p) => {
        m = m._children[p]
        return m
      })
    }
    if (!this.$store.isModuleRegistered(['notification'])) {
      this.$store.registerModule('notification', NotificationModule)
    }
    this.$options.computed = {
      ...(this.$options.computed || {}),
      ...mapState('notification', ['notifications'])
    }
    this.$options.methods = {
      ...(this.$options.methods || {}),
      ...mapActions('notification', ['markAsRead'])
    }
  }
})
export default class NotificationPanel extends Vue {
  private readonly notifications!: Notification[]

  /** Prop to display the dialog. */
  @Prop() showNotifications: boolean

  @Emit('closeNotifications')
  private async emitClose () {

  }

  private async mounted () {
    getModule(NotificationModule, this.$store)
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/theme.scss";

::v-deep ::-webkit-scrollbar {
  width: 2px;
}

::v-deep ::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 20px;
}

.navigation-drawer {
  top: 100px;
  max-height: calc(100% - 0%);
}

.dialog-close {
  position: absolute;
  top: 8px;
  right: 15px;
  margin-right: 70px;
  z-index: 2;
  font-weight: bold;
}

::v-deep .v-btn:not(.dialog-close) .v-icon.v-icon {
  font-size: 1.25rem !important;
}

::v-deep .v-btn__content {
  line-height: inherit;
}

.toolbar-title {
  color: $BCgovBlue5;
  font-size: 1.125rem;
  font-weight: 700;
}

.list-subtitle {
  font-size: 1.125rem;
  font-weight: 700;
}

.list-text {
  line-height: 1;
  word-spacing: .05em;
  letter-spacing: .01em;
}

.dot-red {
  height: 8px;
  width: 8px;
  background-color: #F44336;
  border-radius: 50%;
  display: inline-block;
  margin-top: 18px;
  margin-left: 10px;
}

.dot-blue {
  height: 8px;
  width: 8px;
  background-color: #2196F3;
  border-radius: 50%;
  display: inline-block;
  margin-top: 18px;
  margin-left: 10px;
}
</style>

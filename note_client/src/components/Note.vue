<template>
<div class="app">
  <index
    class="index col-md-3"
    :class="{'fa': !loaded, 'fa-spinner': !loaded}"
  ></index>
  <div class="editor col-md-9">
    <div v-if="selectedPage">
      <editor></editor>
      <button
        type="button"
        class="btn btn-primary col-md-12"
        accesskey="s"
        @click="save"
        :disabled="!selectedPage.taint"
      >Save</button>
      <button
        type="button"
        class="btn btn-success col-md-12"
        @click="revert"
        :disabled="!selectedPage.taint || !selectedPage.id"
      >Revert</button>
      <button
        type="button"
        class="btn btn-success col-md-12"
        @click="$refs.confirmModal.show"
      >Delete</button>
    </div>
    <button
      type="button"
      class="btn btn-success col-md-12"
      @click="create"
      :disabled="!loaded || selectedPage && selectedPage.taint"
    >New</button>
  </div>
  <b-modal
    title="Error"
    ref="errorModal"
    header-class="bg-danger text-light"
    body-class="text-danger"
    ok-only
    centered>
    {{ message }}
  </b-modal>

  <b-modal
    title="Confirmation"
    ref="confirmModal"
    header-class="bg-info text-light"
    @ok="destroy"
    centered>
    Are you sure to delete?
  </b-modal>

  <b-modal
    ref="progressModal"
    hide-header
    hide-footer
    no-fade
    no-close-on-backdrop
    no-close-on-esc
    centered
    @shown="shownProgress">
    {{ progress }}
    <b-progress :value="10" :max="10" animated></b-progress>
  </b-modal>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Index from './Index.vue'
import Editor from './Editor.vue'
import '../style/Note.scss'
import csrfToken from '../util/csrf-token'
module.exports = {
  components: {
    Index,
    Editor
  },
  computed: {
    ...mapGetters([
      'hasMessage',
      'isProgress',
      'pages',
      'loaded',
      'selectedPage',
      'message',
      'progress'
    ])
  },
  methods: {
    shownProgress() {
      if (this.progressHidden) {
        this.$refs.progressModal.hide()
      }
    },
    save() {
      this.$store.dispatch(
        'save',
        csrfToken.getCsrfTokenFromCookie(document.cookie)
      )
    },
    destroy() {
      this.$store.dispatch(
        'destroy',
        csrfToken.getCsrfTokenFromCookie(document.cookie)
      )
    },
    ...mapActions([
      'create',
      'revert'
    ])
  },
  watch: {
    hasMessage: {
      handler: function(hasMessage) {
        if (hasMessage) {
          this.$refs.errorModal.show()
        } else {
          this.$refs.errorModal.hide()
        }
      }
    },
    isProgress: {
      handler: function(isProgress) {
        if (isProgress) {
          this.progressHidden = false
          this.$refs.progressModal.show()
        } else {
          this.progressHidden = true
          this.$refs.progressModal.hide()
        }
      }
    }
  },
  data() {
    return {
      progressHidden: false
    }
  }
}
</script>

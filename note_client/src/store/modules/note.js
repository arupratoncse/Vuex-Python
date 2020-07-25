import { Page } from '../../model/page'
import pageApi from '../../api/page'

const state = {
  pages: [],
  loaded: false,
  selectedPage: null,
  message: null,
  progress: null
}

const getters = {
  /**
   * Is message
   */
  hasMessage: (state) => {
    return state.message != null
  },

  /**
   * In process
   */
  isProgress: (state) => {
    return state.progress != null
  },

  pages: (state) => {
    return state.pages
  },

  loaded: (state) => {
    return state.loaded
  },

  selectedPage: (state) => {
    return state.selectedPage
  },

  message: (state) => {
    return state.message
  },

  progress: (state) => {
    return state.progress
  }
}

const actions = {
  /**
   * Load page list
   */
  load({commit}) {
    pageApi.list()
    .then((instances) => {
      commit('pagesLoaded', instances)
    })
  },

  /**
   * Select page
   */
  selectPage({commit, state}, page) {
    if (state.selectedPage && state.selectedPage.taint) {
      commit('messageAppeared', "Your changes have not been saved.")
      return
    }
    commit('pageSelected', page)
  },

  /**
   * Save the current page
   */
  save({commit, state}, csrfToken) {
    if (!state.selectedPage.title || !state.selectedPage.content) {
      commit('messageAppeared', "Title and content are required.")
      return
    }
    commit('progressStarted', "saving...")
    pageApi.save(state.selectedPage, csrfToken)
    .then((instance) => {
      Object.assign(state.selectedPage, instance)
      commit('progressFinished')
    })
  },

  /**
   * Delete current page
   */
  destroy({commit, state, dispatch}, csrfToken) {
    if (state.selectedPage.id == null) {
      commit('unsavedPageDestroyed')
      return
    }
    commit('progressStarted', "Deleting...")
    pageApi.destroy(state.selectedPage, csrfToken)
    .then(() => {
      commit('pageDestroyed')
      dispatch('load').then(() => {
        commit('progressFinished')
      })
    })
  },

  /**
   * Create a new page
   * Do not save to backend
   */
  create({commit, state}) {
    if (state.selectedPage && state.selectedPage.taint) {
      return
    }
    commit('newPageCreated')
  },

  /**
   * Discard changes
   */
  revert({commit, state}) {
    if (state.selectedPage) {
      commit('reverted')
    }
  }
}

const mutations = {
  /**
   * Page list loaded
   */
  pagesLoaded(state, instances) {
    state.pages = instances
    state.loaded = true
  },

  /**
   * Page selected
   */
  pageSelected(state, page) {
    state.selectedPage = page
  },

  /**
   * Message appeared
   */
  messageAppeared(state, message) {
    state.message = message
  },

  /**
   * I accept the message
   */
  messageResolved(state) {
    state.message = null
  },

  /**
   * Changes discarded
   */
  reverted(state) {
    state.selectedPage.revert()
  },

  /**
   * Unsaved page discarded
   */
  unsavedPageDestroyed(state) {
    state.pages.pop()
    state.selectedPage = null
  },

  /**
   * Page destroyed
   */
  pageDestroyed(state) {
    state.selectedPage = null
  },

  /**
   * New page created
   */
  newPageCreated(state) {
    let page = new Page
    page.taint = true
    state.pages.push(page)
    state.selectedPage = page
  },

  /**
   * Processing started
   */
  progressStarted(state, progressMessage) {
    state.progress = progressMessage
  },

  /**
   * Processing is complete
   */
  progressFinished(state) {
    state.progress = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

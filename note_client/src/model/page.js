class Page {
  constructor(
      id=null, title='', content='', createdAt=null,
      updatedAt=null, taint=false) {
    this.id = id
    this._title = title
    this._content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.taint = taint  // Flag that holds that the content has changed
    this.origin = null
  }

  /**
   * Method to generate an instance from JSON received from API
   */
  static fromData(data) {
    let instance = new Page(
      data.id || null,
      data.title || null,
      data.content || '',
      data.created_at || null,
      data.updated_at || null
    )
    // Retains the original data due to the ability to discard changes
    instance.origin = data
    return instance
  }

  /**
   * Serialize instance for storage
   */
  toData() {
    return {
      id: this.id,
      title: this._title,
      content: this._content
    }
  }

  get title() {
    return this._title
  }

  set title(value) {
    this._title = value
    this.taint = true
  }

  get content() {
    return this._content
  }

  set content(value) {
    this._content = value
    this.taint = true
  }

  /**
   * Discard changes
   * Restore the data state at the time of instance construction
   */
  revert() {
    if (this.origin == null) {
      this._title = ''
      this._content = ''
    } else {
      this._title = this.origin.title
      this._content = this.origin.content
    }
    this.taint = false
  }
}

export {
  Page
}

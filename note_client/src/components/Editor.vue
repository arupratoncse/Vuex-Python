<template>
<div class="form-group">
  <input type="text" class="form-control" placeholder="Enter title" v-model="page.title">
  <textarea class="form-control" rows="15" placeholder="Contents" v-model="page.content"></textarea>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
module.exports = {
  computed: mapGetters({
    page: 'selectedPage'
  })
}
</script>
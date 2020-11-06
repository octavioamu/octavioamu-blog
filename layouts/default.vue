<template>
  <div>
    <header-prismic/>
    <nuxt />
    <footer-prismic/>
  </div>
</template>

<script>
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import FooterPrismic from '~/components/FooterPrismic.vue'

export default {
  components: {
    HeaderPrismic,
    FooterPrismic
  },
  head () {
    return {
      title: 'Octavio Amuchástegui',
    }
  },
  // Called before rendering the layout (even for error page)
  async middleware({ store, $prismic, params }) {
    await store.dispatch('fetchMenu', $prismic, params)
  }
}
</script>

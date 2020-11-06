<template>
  <div class="homepage">
    <!-- {{altLangs}} -->
    <header-prismic/>
    <nuxt />
    <footer-prismic/>
  </div>
</template>

<script>
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import FooterPrismic from '~/components/FooterPrismic.vue'
import BlogWidget from '~/components/BlogWidget.vue'

export default {
  components: {
    HeaderPrismic,
    FooterPrismic
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  // Called before rendering the layout (even for error page)
  async middleware({ store, $prismic, params }) {
    await store.dispatch('fetchMenu', $prismic, params)

  }
}
</script>

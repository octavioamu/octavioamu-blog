<template>
  <section>
    <!-- Slices block component -->
    <slices-block :slices="slices"/>
    <nuxt-link :to="$prismic.linkResolver(altLangs[0])" v-if="altLangs[0]">
            <span>Read also this article in {{altLangs[0].lang}}</span>
        </nuxt-link>
    <div>lang:  {{altLangs}}</div>
  </section>
</template>

<script>
// Imports for Prismic Slice components
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'page',
  components: {
    SlicesBlock
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{

      let languages = $prismic.api.data.languages
      let lang = { lang: languages[0].id }
      if (params.lang !== undefined || null) {
        lang = { lang: params.lang }
      }
      // Query to get post content
      const document = (await $prismic.api.getByUID('page', params.uid, lang))
      return {
        // Set slices as variable
        slices: document.data.page_content,
        altLangs: document.alternate_languages
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<template>
  <div>
    <div class="outer-container">
      <div class="back">
        <nuxt-link to="../">backdd to list</nuxt-link>
        {{altLangs}}

        <nuxt-link :to="$prismic.linkResolver(altLangs[0])" v-if="altLangs[0]">
            <span>Read also this article in {{altLangs[0].lang}}</span>
        </nuxt-link>
      </div>
      <!-- Template for page title -->
      <h1 class="blog-title">{{ $prismic.asText(document.title) }}</h1>
      <!-- Template for published date -->
      <p class="blog-post-meta"><span class="created-at">{{ formattedDate }}</span></p>
    </div>
    <!-- Slice Block Componenet tag -->
    <slices-block :slices="slices"/>
  </div>
</template>

<script>
//Importing all the slices components
import SlicesBlock from '~/components/SlicesBlock.vue'
export default {
  name: 'post',
  components: {
    SlicesBlock
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog'
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
      const post = (await $prismic.api.getByUID('post', params.uid, lang))
      // Returns data to be used in template
      return {
        altLangs: post.alternate_languages,
        document: post.data,
        slices: post.data.body,
        formattedDate: Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(post.data.date)),
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

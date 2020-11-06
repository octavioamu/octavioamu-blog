<template>
  <section>
    <!-- Banner component -->
    <homepage-banner :banner="banner"/>
    <!-- Slices block component -->
    <slices-block :slices="slices"/>
    <div>
      {{altLangs}}
      <li v-for="altLang in altLangs" :key="altLang.id">
          <nuxt-link :to="$prismic.linkResolver(altLang)">
            <span :class="'flag-icon flag-icon-' + altLang.lang.slice(-2)">dsfsd</span>
          </nuxt-link>
        </li>
    </div>
    <!-- Check blog posts exist -->
    <div v-if="posts.length !== 0" class="blog-main">
      <!-- Template for blog posts -->
      <section v-for="post in posts" :key="post.id" class="blog-post">
        <!-- Here :post="post" passes the data to the component -->
        <blog-widget :post="post"></blog-widget>
      </section>
    </div>
    <!-- If no blog posts return message -->
    <div v-else class="blog-main">
      <p>No Posts published at this time.</p>
    </div>
  </section>
</template>

<script>
// Imports for all components
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'
import BlogWidget from '~/components/BlogWidget.vue'

export default {
  name: 'Home',
  layout: 'homepage',
  components: {
    HomepageBanner,
    SlicesBlock,
    BlogWidget
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  async asyncData({ $prismic, params, error }) {
    console.log(params)
    try{
      let languages = $prismic.api.data.languages
      let lang = { lang: languages[0].id }
      if (params.lang !== undefined || null) {
        lang = { lang: params.lang }
      }

      console.log(lang)

      // Query to get the home page content
      const homepage = (await $prismic.api.getSingle('homepage', lang))

      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "post"),
        { orderings : '[my.post.date desc]', lang: lang.lang },
      )

      return {
        // Page content
        banner: homepage.data.homepage_banner[0],
        posts: blogPosts.results,
        // Set slices as variable
        slices: homepage.data.page_content,
        altLangs: homepage.alternate_languages
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

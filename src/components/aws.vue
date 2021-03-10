<template lang="html">
  <div class="hello">
    <h1></h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <button v-on:click="handleAnalyticsClick">Generate Analytics Event</button>
    <div v-if="analyticsEventSent">
      <p>Event Submitted.</p>
      <p>Events sent: </p>
      <a v-bind:href="url" target="_blank">View Events on the Amazon Pinpoint Console</a>
    </div>
  </div>
</template>

<script>
// import awsconfig from '../aws-exports'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      url: `https:// ${awsconfig.aws_project_region}.console.aws.amazon.com/pinpoint/home/?region=${awsconfig.aws_project_region}#/apps/${awsconfig.aws_mobile_analytics_app_id}/analytics/events`,
      eventsSent: 0,
      analyticsEventSent: false
    }
  },
  methods: {
    handleAnalyticsClick: function () {
      this.$Amplify.Analytics.record('AWS Amplify Tutorial Event')
      .then(() => {
        ++this.eventsSent
        this.analyticsEventSent = true
      })
    }
  }
}
</script>

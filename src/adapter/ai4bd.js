window.Semann.adapter.ai4bd = class SemannAdapterAI4BD {
  constructor (config) {
    this.config = config
  }

  configure (analyzer) {
  }

  analyze (analysis) {
    const url = this.config.url || 'http://localhost:8000'
    analysis.util.http.post(url, {text: analysis.text}).then(
      res => {
        const promises = []
        const concepts = res.data.ner.concepts.reduce((a, c) => { a[c.id] = c; return a }, {})
        res.data.ner.annotations.forEach(annotation => {
          if (annotation.dbpedia_url) {
            const resource = annotation.dbpedia_url
            const query = encodeURIComponent(`
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            select distinct ?picture, ?label, ?abstract where {
             OPTIONAL { <${resource}> foaf:depiction ?picture }
             OPTIONAL { <${resource}> rdfs:label ?label . FILTER(lang(?label) = "en") }
             OPTIONAL { <${resource}> rdfs:comment ?abstract . FILTER(lang(?abstract) = "en") }
            }`)
            promises.push(
              analysis.util.http.get('http://dbpedia.org/sparql?output=json&query=' + query).then(
                res => {
                  analysis.found({
                    start: annotation.start,
                    end: annotation.end,
                    resource,
                    concept: concepts[annotation.concept_id].label_de,
                    properties: res.data.results.bindings[0] || {}
                  })
                },
                analysis.fail
              )
            )
          }
        })
        Promise.all(promises).then(analysis.done, analysis.fail)
      },
      analysis.fail
    )
  }
}

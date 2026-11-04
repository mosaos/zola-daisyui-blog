document.addEventListener("DOMContentLoaded", () => {
  const searchResults = document.getElementById("search-results");
  const queryTextSpan = document.getElementById("search-query-text");

  if (!searchResults || !window.searchIndex) return;

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q") ? urlParams.get("q").trim() : "";

  if (queryTextSpan) {
    queryTextSpan.textContent = query;
  }

  if (!query) {
    searchResults.innerHTML = "<li>Please input the keyword.</li>";
    return;
  }

  // ==========================================
  // for ja index only
  // ==========================================
  // if (typeof elasticlunr !== 'undefined' && elasticlunr.Pipeline) {
  //   const dummyFunc = function(token) { return token; };
  //   elasticlunr.Pipeline.registerFunction(dummyFunc, 'trimmer-ja');
  //   elasticlunr.Pipeline.registerFunction(dummyFunc, 'stemmer-ja');
  //   elasticlunr.Pipeline.registerFunction(dummyFunc, 'stopWordFilter-ja');
  // }

  const index = elasticlunr.Index.load(window.searchIndex);

  // Search
  const results = index.search(query, {
    fields: {
      title: { boost: 2 },
      body: { boost: 1 }
    },
    bool: "OR",
    expand: true
  });

  // Render results
  if (results.length === 0) {
    searchResults.innerHTML = "<li>No matching articles found.</li>";
    return;
  }

  results.forEach((result) => {
    const doc = index.documentStore.getDoc(result.ref);
    const li = document.createElement("li");
    const a = document.createElement("a");
    
    // a.href = doc.permalink;  // for ja index.
    a.href = doc.id;
    a.textContent = doc.title;
    
    li.appendChild(a);
    searchResults.appendChild(li);
  });
});
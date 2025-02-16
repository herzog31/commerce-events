## search-response-received

### 🤖 Intelligent strategies

-   None

### 📈 Reporting

-   Avg. click position
-   Unique searches
-   Popular searches
-   Zero results searches
-   Zero results rate

### ⤴️ Publishing pages and conditions

-   Search bar
    -   on API response received
-   Browse/Search results page
    -   on API response received

### 🛄 Required contexts

`page`

`storefront`

`searchResults`

### 🔧 Usage

```javascript
const mse = window.magentoStorefrontEvents;

/* set in application container */
// mse.context.page(pageCtx);
// mse.context.setStorefrontInstance(storefrontCtx);

/* set before firing event */
mse.context.setSearchResults(searchResultsCtx);

mse.publish.searchResponseReceived("search-bar");
```

Search Input
==============

Module to help search inputs be better

## Install

    npm install search-input


## Usage

    this.searchInput = new SearchInput(
        {
            'inputEl': '#search-input', // the input element
            'bgEl': '#top-search-back', // the input element's parent
            'resultsEl': '#search-list' // where the results so
        }  
    );
    
    // getData event will emit with a query and counter 
    this.searchInput.on(
        'getData',
        this.search.bind(this)
    );
    
    // perform the search
    search: function(obj){
        goSearch(
            {
                'query': obj.query,
                'counter': obj.counter
            }
        ).then(
            this.onSearchResults,
            this.onError
        )
    }
    
    // got search results back. Let searchInput know by calling gotData()
    onSearchResults: function(results){
        this.searchInput.gotData();
    },
    

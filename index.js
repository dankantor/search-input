var SimpleEmitter = require('simple-emitter');

function SearchInput(opts){
    var simpleEmitter = new SimpleEmitter();
    $.extend(this, simpleEmitter);
    this.counter = 0;
    this.pointerEvent = opts.pointerEvent || 'keyup';
    this.resultsShowClass = opts.resultsShowClass || 'show';
    this.resultsFocusClass = opts.resultsFocusClass || 'focused';
    this.bgFocusClass = opts.bgFocusClass || 'focused';
    this.bgLoadingClass = opts.bgLoadingClass || 'loading';
    this.pointerEventTimeout = null;
    this.searchText = null;
    this.cacheElements(opts);
    this.addListeners();
}

SearchInput.prototype.cacheElements = function(opts){
    this.inputEl = $(opts.inputEl);
    this.bgEl = $(opts.bgEl);
    this.resultsEl = $(opts.resultsEl);
}

SearchInput.prototype.addListeners = function(){
    $(this.inputEl).on(
        'focus',
        this.onFocus.bind(this)
    );
    $(this.inputEl).on(
        'blur',
        this.onBlur.bind(this)
    );
    $(this.inputEl).on(
        this.pointerEvent,
        this.onPointerEvent.bind(this)
    );
}

SearchInput.prototype.onFocus = function(){
    this.bgEl.addClass(this.bgFocusClass);
    var val = $.trim(this.inputEl.val());
    if(val.length > 0){
        this.resultsEl.addClass(this.resultsFocusClass); 
    }
}

SearchInput.prototype.onBlur = function(){
    setTimeout(
        function(){
            this.bgEl.removeClass(this.bgFocusClass);
            this.resultsEl.removeClass(this.resultsFocusClass);
        }.bind(this),
        200
    );
}

SearchInput.prototype.onPointerEvent = function(e){
    e.stopPropagation();
    var val = $.trim(this.inputEl.val());
    if(val.length > 0){
        if(this.searchText !== val){
            this.searchText = val;
            this.searchDelay(val);
            this.bgEl.addClass(this.bgLoadingClass);
            this.resultsEl.addClass(this.resultsShowClass); 
        }   
    }
    else{
        clearTimeout(this.pointerEventTimeout);
        this.searchText = null;
        this.bgEl.removeClass(this.bgLoadingClass);
        this.resultsEl.removeClass(this.resultsShowClass);
        this.emit('empty');
    }
}

SearchInput.prototype.searchDelay = function(val){
    clearTimeout(this.pointerEventTimeout);
    this.pointerEventTimeout = setTimeout(
        this.getData.bind(this),
        200,
        val
    );
}

SearchInput.prototype.getData = function(val){
    this.counter++;
    this.emit(
        'getData',
        {
            'query': val,
            'counter': this.counter
        }
    );
}

SearchInput.prototype.gotData = function(){
    this.bgEl.removeClass(this.bgLoadingClass);
    this.emit('gotData');
}

module.exports = SearchInput;

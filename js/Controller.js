export default class Controller {
    constructor(store,{searchFormView, searchResultView,tabView}){
        this.store = store;

        this.searchFormView = searchFormView;
        this.searchResultView = searchResultView;
        this.tabView = tabView;

        this.subscribeViewEvents();
        this.render();
    }

    subscribeViewEvents(){
        this.searchFormView.on("@submit", (event) => this.search(event.detail.value))
        .on("@reset",() => this.reset());

        this.tabView.on("@change", event => this.changeTab(event.detail.value));
    }

    search(searchKeyword){
        this.store.search(searchKeyword);
        this.render();
    }

    reset() {

        this.store.searchKeyword = "";
        this.store.searchResult = [];
        this.render();
      }

    changeTab(tab) {
        this.store.selectedTab = tab;
        this.render();
    }

    render() {
        if(this.store.searchKeyword.length > 0){
            return this.renderSearchResult();
        }

        this.tabView.show(this.store.selectedTab);

        this.searchResultView.hide();
    }

    renderSearchResult(){
        this.tabView.hide();

        this.searchResultView.show(this.store.searchResult);
    }
}
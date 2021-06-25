import { on, qs } from "../helpers.js";
import View from "./views.js";

export default class SearchFormView extends View {
    constructor() {
        super(qs("#search-form-view"));

        this.inputElement = qs("[type=text]",this.element);
        this.resetElement = qs("[type=reset]",this.element);

        this.showResetButton(false);
        this.bindEvents();
    }

    showResetButton(visible= true){
        this.resetElement.style.display = visible ? "block" : "none";
    }

    bindEvents() {
        on(this.inputElement, "keyup", () => this.handleKeyUp());
        this.on("submit", (event) => this.handleSubmit(event));
        this.on("reset", () => this.handleReset());
    }

    handleKeyUp() {
        const {value} = this.inputElement;
        this.showResetButton(value.length >0);

        if(value.length <= 0) {
            this.handleReset();
        }
    }
    handleSubmit(event) {
        event.preventDefault();
    
        const { value } = this.inputElement;
        this.emit("@submit", { value });
      }
    
    handleReset() {
        this.emit("@reset");
      }

    show(value = "") {
        this.inputElement.value = value;
        this.showResetButton(this.inputElement.value.length > 0);
    
        super.show();
      }
}
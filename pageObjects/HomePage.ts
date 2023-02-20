import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import {HeaderBar} from "./common/HeaderBar";

export class HomePage extends BasePage {

    readonly headerBar: HeaderBar;

    constructor(page: Page) {
        super(page);
        this.headerBar = new HeaderBar(page)
    }


}

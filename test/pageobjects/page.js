const { browser } = require('@wdio/globals')
module.exports = class Page {

    open (path) {
        return browser.url(`https://katalon-demo-cura.herokuapp.com/`)
    }
    static timeoutMsg(element, reverse = false) { 
        return (`
            ${element.getTagName()} 
            | ${element.getAttribute("class")}
            | ${element.getAttribute('id')} did ${reverse ? '' : 'not'} 
            appear before 25 seconds
        `);
    };
}

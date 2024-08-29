const tagRegex = /^\s*<\/?[^>]+>\s*$/;
const tagWordRegex = /<[^\s>]+/;
const whitespaceRegex = /^(\s|&nbsp;)+$/;
const wordRegex = /[\w\#@-]+/;

const specialCaseWordTags = [
    '<img'
];

function isTag(item) {
    if (specialCaseWordTags.some(re => item !== null && item.startsWith(re))) {
        return false;
    }

    return tagRegex.test(item);
}

function stripTagAttributes(word) {
    let tag = tagWordRegex.exec(word)[0];
    word = tag + // do not strip out the figure class or the figcaption id
        (/<figure.+?class=".*?table.*?"/.test(word) || /<figure.+?class=".*?image.*?"/.test(word) ? ' class="' + word.match(/class=".*?(table|image).*?"/)[1] + '"' : '') + 
        (/<fig(?:ure|caption).+?id=".+?"/.test(word) ? ' id="' + word.match(/id="(.+?)"/)[1] + '"' : '') + 
        (word.endsWith("/>") ? "/>" : ">");
    return word;
}

function wrapText(text, tagName, cssClass) {
    return [
        '<', tagName, ' class="', cssClass, '">', text, '</', tagName, '>'
    ].join('');
}

function isStartOfTag(val) {
    return val === '<';
}

function isEndOfTag(val) {
    return val === '>';
}

function isStartOfEntity(val) {
    return val === '&';
}

function isEndOfEntity(val) {
    return val === ';';
}

function isWhiteSpace(value) {
    return whitespaceRegex.test(value);
}

function stripAnyAttributes(word) {
    if (isTag(word)) {
        return stripTagAttributes(word);
    }

    return word;
}

function isWord(text) {
    return wordRegex.test(text);
}

export {
    isTag,
    stripTagAttributes,
    wrapText,
    isStartOfTag,
    isEndOfTag,
    isStartOfEntity,
    isEndOfEntity,
    isWhiteSpace,
    stripAnyAttributes,
    isWord
};
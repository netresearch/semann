module.exports = function uid() {
    return '' + Math.random().toString(36).substr(2, 9)
}

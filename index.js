var fs = require('fs')
var loaderUtils = require('loader-utils')

function compile(template, source, placeholder) {
  var escaped = placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  var regexp = new RegExp('( *)' + escaped, 'g')
  var result = regexp.exec(template)
  var content = ''
  if (result) {
    var indent = result[1]
    content += template.substring(0, result.index)
    if (indent) {
      source = source
        .split('\n')
        .map(line => indent + line)
        .join('\n')
    }
    content += source
  }
  content += template.substr(regexp.lastIndex)
  return content
}

module.exports = function(source) {
  this.cacheable()

  var callback = this.async()
  var options = loaderUtils.getOptions(this) || {}
  var template = options.template
  var templatePath = options.templatePath
  var placeholder = options.placeholder || '/*** placeholder ***/'

  if (!template && !templatePath) return callback(null, source)

  if (!templatePath) {
    return callback(null, compile(template, source, placeholder))
  }

  this.addDependency(templatePath)

  fs.readFile(templatePath, 'utf8', function(err, template) {
    if (err) return callback(err)
    callback(null, compile(template, source, placeholder))
  })
}

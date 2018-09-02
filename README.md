# partial-loader

partial loader for webpack, transform your partial file with template

## Install

`npm install --save partial-loader`

## How to use

Add the loader to your `webpack` config, For example:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\/src\/examples\/(?!index).*\.jsx?$/,
        use: [
          {
            loader: 'partial-loader',
            options: {
              templatePath: `${__dirname}/example-template.js`,
              placeholder: '/*** placeholder ***/',
            },
          },
        ],
      },
    ],
  },
}
```

### Options

- `template` - the content of template, should include the `placeholder` to be replaced.
- `templatePath` - absolute path of the template file, `template` will be ignored if provided.
- `placeholder` - placeholder to be replaced, defaults to `/*** placeholder ***/`.

## Example

1. template

```javascript
import React from 'react'
import styled from 'styled-components'

/*** placeholder ***/
```

2. code

```javascript
const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

export default Button
```

3. transformed

```javascript
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`

export default Button
```

## License

MIT © [Neo](https://github.com/nihgwu)

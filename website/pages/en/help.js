/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')
const translate = require('../../server/translate.js').translate

const CompLibrary = require('../../core/CompLibrary.js')
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const supportLinks = [
  {
    content: (
      <translate>
        Learn more about jqf using the [oficial
        documentation](/docs/en/install).
      </translate>
    ),
    title: <translate>Documents</translate>
  },
  {
    content: (
      <translate>
        This project is maintained at
        [GitHub](https://github.com/kamataryo/jqf). If you have any questions,
        let us know via [issues](https://github.com/kamataryo/jqf/issues). [Pull
        requests](https://github.com/kamataryo/jqf/pulls) are also welcome.
      </translate>
    ),
    title: <translate>GitHub</translate>
  }
]

function Help(props) {
  const { config: siteConfig, language = '' } = props
  const { baseUrl, docsUrl } = siteConfig
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
  const langPart = `${language ? `${language}/` : ''}`
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>
              <translate desc={'help title'}>Need help?</translate>
            </h1>
          </header>
          <GridBlock contents={supportLinks} layout="twoColumn" />
        </div>
      </Container>
    </div>
  )
}

module.exports = Help

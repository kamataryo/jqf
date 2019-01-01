/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container

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
            <h1>Need help?</h1>
          </header>
          <p>
            {'This project is maintained at '}
            <a href={'https://github.com/kamataryo/jqf'}>{'GitHub'}</a>
            {'. If you have any questions, let us know via '}
            <a href={'https://github.com/kamataryo/jqf/issues'}>{'issues'}</a>
            {'.'}
            <br />
            <a href={'https://github.com/kamataryo/jqf/pulls'}>
              {'Pull requests'}
            </a>
            {' are also welcome.'}
          </p>
        </div>
      </Container>
    </div>
  )
}

module.exports = Help

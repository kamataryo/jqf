/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * The template is modified by kamataryo
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const Badges = () => (
  <div className={'section badges badge-section'}>
    <a href="https://travis-ci.org/kamataryo/jqf">
      <img
        src="https://travis-ci.org/kamataryo/jqf.svg?branch=master"
        alt="build status"
      />
    </a>
    <a href="https://badge.fury.io/js/jqf">
      <img src="https://badge.fury.io/js/jqf.svg" alt="npm version" />
    </a>
  </div>
)

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl } = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <Badges />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
            <Button href={docUrl('doc1.html')}>Install</Button>
            <Button href={docUrl('doc2.html')}>API</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl } = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const TryOut = () => (
      <div id="try">
        <h2 className="try-out-title">Try it out</h2>
        <p className="try-out-description">
          You can try jqf with <code>npx</code> command instantly.
        </p>
        <MarkdownBlock background="light">
          {`
\`\`\`
$ echo '{"hello": "world"}' | npx jqf 'obj => obj.hello'
"world"
\`\`\`
`}
        </MarkdownBlock>
        <p className="try-out-description">
          Or, install jqf with <code>npm</code>.
        </p>
        <MarkdownBlock background="light">
          {`
\`\`\`
$ npm install jqf --global
$ echo '{"hello": "world"}' | jqf 'obj => obj.hello'
"world"
\`\`\`
`}
        </MarkdownBlock>
        <p className="try-out-description">
          For more detail, show <a href={docUrl('doc1.html')}>Install</a> and{' '}
          <a href={docUrl('doc2.html')}>API</a> section.
        </p>
      </div>
    )

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'One of the easiest way to process JSON on CLI.',
            image: `${baseUrl}img/json.svg`,
            imageAlign: 'top',
            title: 'JSON CLI processor'
          },
          {
            content:
              'Jqf Processes JSON input with JavaScript function synax, being most synergestic with JSON.',
            image: `${baseUrl}img/js.svg`,
            imageAlign: 'top',
            title: 'JS Syntax'
          },
          {
            content:
              'Jqf works with standard streams input and ouput seamlessly.',
            image: `${baseUrl}img/shell.svg`,
            imageAlign: 'top',
            title: 'STDIN and STDOUT'
          }
        ]}
      </Block>
    )

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <TryOut />
        </div>
      </div>
    )
  }
}

module.exports = Index

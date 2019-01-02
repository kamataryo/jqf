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
const translate = require('../../server/translate.js').translate

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
            {/* TODO: locale switch */}
            <Button href={docUrl('install.html') + '#quick-start-with-npx'}>
              <translate>Quick Start</translate>
            </Button>
            <Button href={docUrl('install.html')}>
              <translate desc={'button'}>Install Guide</translate>
            </Button>
            <Button href={docUrl('api.html')}>
              <translate desc="button">API Reference</translate>
            </Button>
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

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            content: (
              <translate>An easiest way to process JSON with CLI.</translate>
            ),
            image: `${baseUrl}img/json.svg`,
            imageAlign: 'top',
            title: <translate>JSON CLI Processor</translate>
          },
          {
            content: (
              <translate>
                Jqf Processes JSON inputs with JavaScript function, with
                synergistic efficiency.
              </translate>
            ),
            image: `${baseUrl}img/js.svg`,
            imageAlign: 'top',
            title: <translate>JS Syntax</translate>
          },
          {
            content: (
              <translate>
                Jqf seamlessly works with standard stream inputs and ouputs.
              </translate>
            ),
            image: `${baseUrl}img/shell.svg`,
            imageAlign: 'top',
            title: <translate>STDIN and STDOUT</translate>
          }
        ]}
      </Block>
    )
    const { primaryColor, secondaryColor } = siteConfig.colors

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
        </div>
      </div>
    )
  }
}

module.exports = Index

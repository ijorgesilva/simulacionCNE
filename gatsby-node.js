/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path      = require('path')
const config    = require('./data/SiteConfig')

exports.createPages = async( { page, actions, graphql, reporter } ) => {

    const result = await graphql(
        `${query}`
    )

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    let periodDbId 
    let periodTitle 
    let partyDbId
    
    /******************* 
     * Create Period selected on Website Configuration
     *******************/
    if ( result.data.periods.configuraciNDelWebsite?.simulatorConfiguration.configurationPeriodo?.length > 0 ) {
        result.data.periods.configuraciNDelWebsite.simulatorConfiguration.configurationPeriodo.forEach( ( _, index ) => {
            if ( index === 0 ) {
                periodDbId = _.databaseId.toString()
                periodTitle = _.periodoDetails.periodoTitle
                actions.createPage({
                    path: `/`,
                    component: path.resolve(`./src/components/templates/main/index.js`),
                    context: {
                        title: periodTitle,
                        periodoId: '/' + _.databaseId.toString() + '/',
                        periodSlug: _.slug,
                    }
                })
            }
        })
    }

    /******************* 
     * Create Ballots per Party
     *******************/
    if ( result.data.parties?.nodes?.length > 0 ) {
        result.data.parties.nodes.forEach( ( _, index ) => {
            partyDbId = _.papeletaDetails.papeletaPeriodoId.toString()
            if( periodDbId === partyDbId ){
                actions.createPage({
                    path: `/${_.databaseId}`,
                    component: path.resolve(`./src/components/templates/ballot/index.js`),
                    context: {
                        periodTitle: periodTitle,
                        slug: _.slug,
                    }
                })
            }
        })
    }


    /******************* 
     * Redirects creation 
     *******************/
    if ( result.data.redirects?.nodes?.length > 0 ) {
        result.data.redirects.nodes.forEach( _ => {
            actions.createRedirect({ 
                fromPath: _.redirect.redirectFrompath, 
                toPath: _.redirect.redirectTopath, 
                isPermanent: _.redirect.redirectIspermanent
            })
        })
    }

}

const periods = `
    ########
    # Get Periodo Electoral 
    ########
    periods: wp {
        configuraciNDelWebsite {
            simulatorConfiguration {
                configurationPeriodo {
                    ... on WpPeriodo {
                        id
                        slug
                        databaseId
                        periodoDetails {
                            periodoTitle
                        }
                    }
                }
            }
        }
    }
`

const ballots = `
    ########
    # Get Papeletas
    ########
    parties: allWpPosicion(filter: {status: {eq: "publish"}}) {
        nodes {
            slug
            databaseId
            papeletaDetails {
              papeletaPeriodoId
            }
        }
    }
`

const redirects = `
    ########
    # Redirects 
    ########
    redirects: allWpRedirect(filter: {status: {eq: "publish"}}) {
        nodes {
            redirect {
                redirectFrompath
                redirectIspermanent
                redirectTopath
            }
        }
    }
`

/* 
 * Main Query 
 */
const query = `
    query {

        ${periods}

        ${ballots}

        ${redirects}
        
    }
`
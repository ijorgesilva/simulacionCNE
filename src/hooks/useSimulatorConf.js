import { useStaticQuery, graphql } from 'gatsby'

export const useSimulatorConf = () => { 

    const { wp } = useStaticQuery(
        graphql`                                
            {
                wp {
                    configuraciNDelWebsite {
                        simulatorConfiguration {
                            configurationPeriodo {
                                ... on WpPeriodo {
                                    id
                                    periodoDetails {
                                        periodoTitle
                                    }
                                }
                            }
                            configurationCustomize {
                                configurationCustomizeLogo {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    `)

    return wp.configuraciNDelWebsite

}


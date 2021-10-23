import { useStaticQuery, graphql } from 'gatsby'

export const useCurrentPeriod = () => { 

    const { currentPeriod } = useStaticQuery(
        graphql`                          
            {
                currentPeriod: wp {
                    configuraciNDelWebsite {
                        simulatorConfiguration {
                            configurationPeriodo {
                                ... on WpPeriodo {
                                    id
                                    databaseId
                                    slug
                                    periodoDetails {
                                        periodoTitle
                                        periodoLegislativeList
                                        periodoLegislativeNominal
                                        periodoMunicipalList
                                        periodoMunicipalNominal
                                    }
                                }
                            }
                        }
                    }
                }
            }
    `)

    return currentPeriod.configuraciNDelWebsite.simulatorConfiguration.configurationPeriodo[0]

}


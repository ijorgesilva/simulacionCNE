import { useStaticQuery, graphql } from 'gatsby'

export const useGetBallots = () => { 

    const { papeletas } = useStaticQuery(
        graphql`                                
            {
                papeletas: allWpPosicion {
                    nodes {
                        slug
                        status
                        papeletaDetails {
                            ## General Configuration
                            papeletaPeriodoAdminTitle
                            papeletaPartidoPosicionColumna
                            papeletaPartidoPosicionFila
                            ## Period
                            papeletaPartidoPeriodo {
                                ... on WpPeriodo {
                                    id
                                    databaseId
                                    slug
                                }
                            }
                            ## Party
                            papeletaPartidoPartido {
                                ... on WpPartido {
                                    id
                                    databaseId
                                    partidoDetails {
                                        partidoTitle
                                        partidoColor
                                        partidoLogo {
                                            localFile {
                                                childImageSharp {
                                                    gatsbyImageData
                                                }
                                            }
                                        }
                                        partidoPoster {
                                            localFile {
                                                childImageSharp {
                                                    gatsbyImageData
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            ### START CANDIDATES
                            ## Legislative Candidates
                            papeletaPartidoGobernador {
                                ... on WpCandidato {
                                    id
                                    status
                                    slug
                                    candidatoDetails {
                                        candidatoName
                                        candidatoPhoto {
                                            localFile {
                                                childImageSharp {
                                                    gatsbyImageData
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            papeletaPartidoLista {
                                ... on WpCandidato {
                                    id
                                    status
                                    slug
                                    candidatoDetails {
                                        candidatoName
                                    }
                                }
                            }
                            papeletaPartidoNominal {
                                ... on WpCandidato {
                                    id
                                    status
                                    slug
                                    candidatoDetails {
                                        candidatoName
                                    }
                                }
                            }

                            ## Municipal Candidates
                            papeletaPartidoAlcalde {
                                ... on WpCandidato {
                                    id
                                    status
                                    slug
                                    candidatoDetails {
                                        candidatoName
                                        candidatoPhoto {
                                            localFile {
                                                childImageSharp {
                                                    gatsbyImageData
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            papeletaPartidoCmLista {
                                ... on WpCandidato {
                                    id
                                    status
                                    slug
                                    candidatoDetails {
                                        candidatoName
                                    }
                                }
                            }
                            papeletaPartidoCmNominal {
                                ... on WpCandidato {
                                    id
                                    status
                                    slug
                                    candidatoDetails {
                                        candidatoName
                                    }
                                }
                            }
                            ### END CANDIDATES

                        }
                    }
                }
            }
    `)

    return papeletas

}
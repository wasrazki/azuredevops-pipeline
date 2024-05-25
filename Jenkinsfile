pipeline{
    agent{
        label "jenkins-agent"
    }
    stages{
        stage("Cleanup Worksapce"){
            steps{
                cleanWs()
            }
            
        }

        stage("Checkout from SCM"){
            steps{
                git branch: "main", credentialsId: 'vault-gitlab-access-token', url:'https://gitlab.com/pfa8681917/devsecops-pipeline-front'
            }
            
        }


       /* stage('Building the front') {
            steps {
                sh 'npm run build --omit=dev'
            }
        }*/ 
         stage("Generating SBOM Report and Uploading it to the Cloud"){
            steps{
                sh 'syft packages dir:. --scope AllLayers -o json > sbom.json'
                sh 'syft packages dir:. --scope AllLayers -o table > sbom-file'



                script{
                    def report= readFile("sbom-file")
                    def htmlreport = """
                    <html> 
                    <head> 
                        <title> SBOM File </title> 
                    </head> 
                    <body>
                         <h1> SBOM File from Build N°: ${BUILD_NUMBER} </h1>
                         <pre> ${report} </pre> 
                    </body> 
                    </html>
                    
                    """
                    writeFile file: 'target/sbom-file-report.html', text: htmlreport

                }
                archiveArtifacts artifacts: 'target/sbom-file-report.html', allowEmptyArchive: true
            }
         }

        stage("Scanning the SBOM file with Grype and Uploading the Generated Report to the Cloud"){
            steps{
                sh 'grype sbom:./sbom.json > grype-scanning'
                script{
                    def report= readFile("grype-scanning")
                    def htmlreport = """
                    <html> 
                    <head> <title> Grype Scanning Report </title> </head> 
                    <body>
                        <h1> Grype Scanning Report: Build ${BUILD_NUMBER} </h1> 
                        <pre> ${report}</pre>
                    </body>
                    </html>
                    """
                    writeFile file: 'target/grype-scanning-report.html', text: htmlreport
                      

                }

                archiveArtifacts artifacts: 'target/grype-scanning-report.html', allowEmptyArchive: true

                
            }
            
        }


    }

    
}

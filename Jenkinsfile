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
         stage("Generating SBOM"){
            steps{
                sh 'syft packages dir:. --scope AllLayers  > sbom-file'
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
                    writeFile file: 'target/sbom-file.html', text: htmlreport

                }
            }
         }


    }

    
}

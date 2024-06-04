pipeline{
    agent{
        label "jenkins-agent"
    }

    environment{
        APP_NAME_FRONT="yallafrontpipeline"
        RELEASE="1.0.0"
        DOCKER_USER="wasraz"
        DOCKER_PASS= "vault-docker-access"
        IMAGE_NAME="${DOCKER_USER}"+"/"+"${APP_NAME_FRONT}"
        IMAGE_TAG= "${RELEASE}-${BUILD_NUMBER}"
        SONARQUBE_ACCESS_TOKEN = credentials("vault-sonarqube-access-token")
        SONARQUBE_URL = credentials("vault-sonarqube-url")
        try_this = credentials("try-this")
        // COSIGN_PRIVATE_KEY = credentials("vault-cosign-key")
        SBOM_REPORT_CLOUD_UPLOADING=credentials("SBOM-REPORT-CLOUD-UPLOADING")
        GRYPE_REPORT_CLOUD_UPLOADING= credentials("GRYPE-REPORT-CLOUD-UPLOADING")
        TRIVY_REPORT_CLOUD_UPLOADING= credentials("TRIVY-REPORT-CLOUD-UPLOADING")
        CHECKOV_REPORT_CLOUD_UPLOADING = credentials("CHECKOV-REPORT-CLOUD-UPLOADING")
        JENKINS_USERNAME= credentials("vault-jenkins-username")
        JENKINS_ACCESS_TOKEN= credentials("vault-jenkins-access-token")
        JENKINS_CONTROLLER_URL = credentials("vault-jenkins-controller-url")
        

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


        stage('Install Modules') {
            steps {
                sh 'npm install --verbose -d'            }
        } 
        
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
                    sh "azcopy copy 'target/sbom-file-report.html'  '${SBOM_REPORT_CLOUD_UPLOADING}'  "

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
                    sh "azcopy copy 'target/grype-scanning-report.html'  '${GRYPE_REPORT_CLOUD_UPLOADING}'  "
                      

                }

                archiveArtifacts artifacts: 'target/grype-scanning-report.html', allowEmptyArchive: true

                
            }
            
        }
        stage("SAST with SonarQube"){
           steps{
                script{
                    withSonarQubeEnv(installationName: 'sonarqube-scanner' , credentialsId: 'vault-sonarqube-access-token'){
                        sh """
                            sonar-scanner \
                            -Dsonar.projectKey=angular-scanning \
                            -Dsonar.sources=src \
                            -Dsonar.tests=src \
                            -Dsonar.test.inclusions=**/*.spec.ts \
                            -Dsonar.exclusions=**/node_modules/**,**/dist/** \
                            -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
                            -Dsonar.host.url=${SONARQUBE_URL} \
                            -Dsonar.login=${SONARQUBE_ACCESS_TOKEN}


                        """
                    }

                }
                
            }
        }

        stage ("Dockerfile Scanning with checkov"){
            steps{
                script{
                    sh """
                    /home/jenkinsagentuser/.local/bin/checkov -f Dockerfile > dockerfile-scan || true 

                    """
                    def report = readFile("dockerfile-scan")
                    def htmlreport = """
                    <html> 
                    <head> <title> Dokcerfile Scanning Report </title> </head> 
                    <body>
                        <h1> Dckerfile Scanning Report: Build ${BUILD_NUMBER}   </h1> 
                        <pre> ${report}</pre>
                    </body>
                    </html>
                    """
                    writeFile file: 'target/dockerfile-scanning-report.html', text: htmlreport
                    sh "azcopy copy 'target/dockerfile-scanning-report.html'   '${CHECKOV_REPORT_CLOUD_UPLOADING}'  "
                }
                archiveArtifacts artifacts: 'target/dockerfile-scanning-report.html', allowEmptyArchive: true

            }
        }

        stage ("Docker Build and Push with Docker"){
            steps{
                script{

                    docker.withRegistry('', DOCKER_PASS){
                    docker_image = docker.build "${IMAGE_NAME}"
                    }



                    docker.withRegistry('', DOCKER_PASS){
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }

                }

                    

                }
                        
                        
            }

          stage("Signing the container image with COSIGN"){
                steps{
                    script{
                        sh"""
                        cosign sign --yes --key /home/jenkinsagentuser/cosign.key ${IMAGE_NAME}:${IMAGE_TAG}
                        cosign sign --yes --key /home/jenkinsagentuser/cosign.key ${IMAGE_NAME}:latest

                        """
                    }
                }
            }


            stage ("Container Image verifying"){
                steps{
                    script{
                        sh """
                        cosign verify --key /home/jenkinsagentuser/cosign.pub ${IMAGE_NAME}:${IMAGE_TAG} 
                        cosign verify --key /home/jenkinsagentuser/cosign.pub ${IMAGE_NAME}:latest 
                        """
                    }
                }
            }

        

        stage ("Image Scanning with TRIVY and Report Uploading to the Cloud") 
        {
            steps{
                script{
                    sh "trivy image --no-progress --exit-code 0 --severity HIGH,CRITICAL ${IMAGE_NAME}:${IMAGE_TAG} > trivy-image-scan"

                    def report = readFile("trivy-image-scan")
                    def htmlreport = """
                    <html> 
                    <head> <title> Trivy Image Scanning Report </title> </head> 
                    <body>
                        <h1> Trivy DOCKER IMAGE Scanning Report:  Build ${BUILD_NUMBER} </h1> 
                        <pre> ${report}</pre>
                    </body>
                    </html>
                    """
                    writeFile file: 'target/trivy-image-scanning-report.html', text: htmlreport
                    sh "azcopy copy 'target/trivy-image-scanning-report.html'  '${TRIVY_REPORT_CLOUD_UPLOADING}' "

                }
                archiveArtifacts artifacts: 'target/trivy-image-scanning-report.html', allowEmptyArchive: true

            }
        }


          stage("Trigger the RELEASE pipeline"){
            steps{
                script{
                    sh "curl -v -k --user ${JENKINS_USERNAME}:${JENKINS_ACCESS_TOKEN} -X POST -H 'cache-control:no-cache' -H 'content-type: application/x-www-form-urlencoded' --data 'IMAGE_TAG=${IMAGE_TAG}' 'http://${JENKINS_CONTROLLER_URL}/job/gitops-fron-pipeline/buildWithParameters?token=gitops-front-pipeline-token' " 
                }
               
            }
            
        }



        }


    
}

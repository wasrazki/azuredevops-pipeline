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


        stage('Building the front') {
            steps {
                sh 'npm run build --prod'
            }
        }



    }

    
}

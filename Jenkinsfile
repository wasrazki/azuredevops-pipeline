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
                git branch: "wassim-branch", credentialsId: 'vault-gitlab-access-token', url:'https://gitlab.com/pfa8681917/devsecops-pipeline/-/tree/main/front?ref_type=heads'
            }
            
        }
    }
    
}

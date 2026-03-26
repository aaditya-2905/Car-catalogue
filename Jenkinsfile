pipeline {
    agent any

    environment {
        PIPELINE_NAME = "car-catalogue-pipeline"
        AWS_REGION = "ap-south-1"
    }

    stages {
        stage('Deploy to ECS via CodePipeline') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh '''
                    aws codepipeline start-pipeline-execution \
                      --name $PIPELINE_NAME \
                      --region $AWS_REGION
                    '''
                }
            }
        }
    }
}

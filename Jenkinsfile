pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        IMAGE_URI = "383465661937.dkr.ecr.ap-south-1.amazonaws.com/car-catalogue:latest"
        PIPELINE_NAME = "car-catalogue-pipeline"
    }

    stages {

        stage('Clone Deploy Repo') {
            steps {
                git 'https://github.com/aaditya-2905/car-catalogue-deploy.git'
            }
        }

        stage('Update Task Definition') {
            steps {
                sh '''
                sed -i "s|<IMAGE_URI>|$IMAGE_URI|g" taskdef.json
                '''
            }
        }

        stage('Commit & Push Updated Taskdef') {
            steps {
                sh '''
                git config user.email "jenkins@example.com"
                git config user.name "jenkins"

                git add .
                git commit -m "Updated image URI"

                git push origin main
                '''
            }
        }

        stage('Trigger CodePipeline') {
            steps {
                sh '''
                aws codepipeline start-pipeline-execution \
                --name $PIPELINE_NAME \
                --region $AWS_REGION
                '''
            }
        }
    }
}

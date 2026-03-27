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
                git branch: 'main', url: 'https://github.com/aaditya-2905/car-catalogue-deploy.git'
            }
        }

        stage('Update Task Definition') {
            steps {
                sh '''
                echo "Updating IMAGE_URI in taskdef.json..."
                sed -i "s|<IMAGE_URI>|$IMAGE_URI|g" taskdef.json
                '''
            }
        }

        stage('Commit & Push Updated Taskdef') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    git config user.email "jenkins@example.com"
                    git config user.name "jenkins"

                    git add .

                    git commit -m "Updated image URI" || echo "No changes to commit"

                    git push https://$USER:$PASS@github.com/aaditya-2905/car-catalogue-deploy.git main
                    '''
                }
            }
        }

        stage('Trigger CodePipeline') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds'
                ]]) {
                    sh '''
                    echo "Triggering CodePipeline..."
                    aws codepipeline start-pipeline-execution \
                    --name $PIPELINE_NAME \
                    --region $AWS_REGION
                    '''
                }
            }
        }
    }
}

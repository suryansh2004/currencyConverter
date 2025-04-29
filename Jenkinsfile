pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = "suryansh2004/node-app"
    }
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-credentials', url: 'https://github.com/suryansh2004/currencyConverter.git', branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh '/usr/local/bin/docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | /usr/local/bin/docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh '/usr/local/bin/docker push $DOCKER_IMAGE:$BUILD_NUMBER'
                sh '/usr/local/bin/docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest'
                sh '/usr/local/bin/docker push $DOCKER_IMAGE:latest'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh '/opt/homebrew/bin/kubectl apply -f k8s-deployment.yaml'
            }
        }
    }
}
pipeline {
  environment{
    registry = "mazuma5/demo-pwa-app"
    registryCredential = 'Dockerhub'
    dockerImage = ''
    containerId = sh(script: 'docker ps -aqf "name=pwa-app"', returnStdout:true)
  }
  agent any
  tools {nodejs "node"}
    
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/mazuma5/tours-of-heroes'
      }
    }
        
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
     
 /*   stage('Test') {
      steps {
         sh 'npm test'
      }
    }*/
    stage('Building Image'){
      steps{
        script{
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    
    stage('Push Image'){
      steps{
        script{
          docker.withRegistry('',registryCredential) {
            dockerImage.push()
          }
        }
      }
    }
    
    stage('Cleanup'){
      when{
        not {environment ignoreCase:true, name:'containerId', value:''}
      }
      steps {
        sh 'docker stop ${containerId}'
        sh 'docker rm ${containerId}'
      }
    }
    stage('Run Container'){
      steps{
        sh 'docker run --name=pwa-app -d -p 3000:3000 $registry:$BUILD_NUMBER &'
      }
    }
  }
}

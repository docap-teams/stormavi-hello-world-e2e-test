pipeline {
  agent none

  options { 
    disableConcurrentBuilds()
  }

  //check every minute for changes
  triggers {
    pollSCM('*/1 * * * *')
  }

  // E2E Testing
  stages {

    stage('E2E Test') {

      agent {
        kubernetes {
          label 'jenkins-test'
          defaultContainer 'docap-e2e-test'
          yaml """
apiVersion: v1
kind: Pod
metadata:
  name: docap-e2e-test
spec:
  containers:
  - name: docap-e2e-test
    image: quay.io/roymitchley/docap-nightwatch:latest
    tty: true
    command:
    - cat
    imagePullPolicy: Always
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  volumes:
  - name: docker-config
    projected:
      sources:
      - secret:
          name: roymitchley-docap-pull-secret
          items:
            - key: .dockerconfigjson
              path: config.json
        }
      }

      steps {
          // install required packages 
        sh 'npm install'

          // run tests
        sh 'npm run test ./tests/features/'

      }

      post {
        always {
            // publish to cucumber report plugin
          cucumber buildStatus: 'UNSTABLE',
                  failedFeaturesNumber: 1,
                  failedScenariosNumber: 1,
                  skippedStepsNumber: 1,
                  failedStepsNumber: 1,
                  fileIncludePattern: '**/*.json',
                  jsonReportDirectory: './report/',
                  sortingMethod: 'ALPHABETICAL',
                  trendsLimit: 100

            // publish to junit plugin
          junit 'report/*.xml'

            // publish html report
          publishHTML target: [
            allowMissing: true,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'report',
            reportFiles: 'cucumber_report.html',
            reportName: 'Nightwatch e2e test report'
          ]
        }
      }

    } //stage(E2E tests)


    //Performance testing goes here

  } //stages
} //pipeline
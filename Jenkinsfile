pipeline {

  agent any

  stages {
      stage("build"){
        steps{
          echo 'building application'
        }
      }
    stage("test"){
        steps{
          echo 'testing application'
          def test = 2+2>3 ?'cool':'not cool'
          echo test
        }
      }
    stage("deploy"){
        steps{
          echo 'deploying application'
        }
      }
  }

}

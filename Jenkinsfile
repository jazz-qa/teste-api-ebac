pipeline {
    agent any

    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/jazz-qa/teste-api-ebac.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
        stage('Iniciar servidor') {
            steps {
                bat 'start /B npm start'
            }
        }
        stage('Executar testes') {
            steps {
                bat 'set NO_COLOR=1 && npm run cy:run'
            }
        }
    }
}
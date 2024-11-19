//swagger.js

import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: '잰잰 API',
        description: '미션, 리뷰 및 가게 관련 API',
    },
    host: 'localhost:3000/api', 
    schemes: ['http'],
    tags: [
        { name: 'Missions', description: '미션 관련 API' },
        { name: 'Reviews', description: '리뷰 관련 API' },
        { name: 'Stores', description: '가게 관련 API' }
    ],  // 추가된 부분: tags로 각 카테고리를 정의
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);

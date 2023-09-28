import { CoreSolutionEntityKey, Param } from './composer/composer.interface';

interface Jar {
  key: CoreSolutionEntityKey;
  name: string;
  subtitle: string;
  icon: string;
}

export const JarsConfig: Jar[] = [
  {
    key: 'solution',
    name: 'Solution Jar',
    subtitle: 'Vertical Engine',
    icon: '/assets/icons/solution.svg',
  },
  {
    key: 'frontend',
    name: 'Frontend Jar',
    subtitle: 'UI/UX Templates',
    icon: '/assets/icons/frontend.svg',
  },
  {
    key: 'pipeline',
    name: 'Pipeline Jar',
    subtitle: 'E2E Task Workflows',
    icon: '/assets/icons/pipeline.svg',
  },
  {
    key: 'model',
    name: 'Model Jar',
    subtitle: 'Intelligence Repository',
    icon: '/assets/icons/model.svg',
  },
  {
    key: 'dataset',
    name: 'Data Jar',
    subtitle: 'Unified Data Store',
    icon: '/assets/icons/dataset.svg',
  },
];


export const MOCK_DATA = {
  dataset: [{
    "featureColumns": [],
    "tags": [],
    "dId": "d6532g",
    "name": "Dataset IRIS",
    "version": 2,
    "description": "This is a test dataset",
    "url": "some url",
    "createdAt": "2023-07-24T11:47:24.748Z",
    "updatedAt": "2023-07-24T11:47:24.748Z",
    "entityType": "dataset",
    "id": "64be64ccdad03900bb48f9fa"
}],
model: [{
    "dId": "d6532g",
    "name": "Model IRIS",
    "version": 2,
    "description": "This is a test model",
    "url": "some url",
    "createdAt": "2023-07-24T11:47:24.748Z",
    "updatedAt": "2023-07-24T11:47:24.748Z",
    "entityType": "model",
    "id": "65093be52328dab46812ff5f"
}],
frontend:[],pipeline:[], solution:[]
};


export const Params: Param[] = [{
    "key": "string_dynamic_value",
    "type": "dataset",
    "uiType": "textbox",
    "description": "This is a description",
    "defaultValue": 0.2,
    "supportedValues": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
}, {
    "key": "checkbox_dynamic_value_2",
    "type": "dataset",
    "uiType": "checkbox",
    "description": "",
    "defaultValue": true,
    "supportedValues": [true, false],
}, {
    "key": "checkbox_dynamic_value",
    "type": "dataset",
    "uiType": "checkbox",
    "description": "if true, perform scaling on features af the dataset",
    "defaultValue": false,
    "supportedValues": [true, false],
}, {
    "key": "dropdown_dynamic_value",
    "type": "dataset",
    "uiType": "dropdown",
    "description": "",
    "defaultValue": null,
    "supportedValues": ["abc", "xyz", "pqr"],
}];

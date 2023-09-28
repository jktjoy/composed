import { GetSchemes } from 'rete';
import { AngularArea2D } from 'rete-angular-plugin/16';
import { Observable } from 'rxjs';
import { ComposerConnection, ComposerControl, ComposerNode } from './composer.framework';

export type Schemes = GetSchemes<
  ComposerNode<CoreSolutionEntity>,
  ComposerConnection<CoreSolutionEntity>
>;
export type AreaExtra = AngularArea2D<Schemes>;



export interface Composer {
  nodes: ComposerNode<CoreSolutionEntity>[];
  connections: ComposerConnection<CoreSolutionEntity>[];
}


export type CustomNodeAction = CoreSolutionEntity & { action: 'add' | 'remove' };


export interface ComposerEngine {
  destroy: () => void,
  composerAddNode: (node: CoreSolutionEntity) => Promise<ComposerNode<CoreSolutionEntity>>
  composerRemoveNode: (id: string) => Promise<void>,
  composerAddConnection: (
    connectionObject: ComposerConnection<CoreSolutionEntity>,
  ) => Promise<boolean>,
  composerAddConnectionWithNodes: (
    from: ComposerNode<CoreSolutionEntity>,
    to: ComposerNode<CoreSolutionEntity>,
  ) => Promise<boolean>,
  composerAddConnectionWithIds: (
    fromId: string,
    toId: string,
  ) => Promise<boolean>,
  draw: (
    nodes: ComposerNode<CoreSolutionEntity>[],
    connections: ComposerConnection<CoreSolutionEntity>[]
  ) => Promise<void>,
  composerAddControl: (node: ComposerNode<CoreSolutionEntity>, param: Param) => void,
  getState: () => Composer,

  // props
  propertyChange$: Observable<PropertyChange | null>
}

export type DataCustomizationPayload = {
  element: HTMLElement;
  filled?: boolean | undefined;
  type: 'control';
} & {
  payload: ComposerControl;
};


export interface PropertyChange {
  id: string; //! node id or coreEntity id
  // node: CoreSolutionEntity;
  param: Param,
  value: PrimitiveType | null;
}

// from other files

interface BaseCoreEntity {
  id: string;
  name: string;
  description: string;
  version: number;
  entityType: CoreSolutionEntityKey;
}

export interface Pipeline extends BaseCoreEntity {
  pId: string;
  name: string;
  viewUrl: string;
  description: string;
  tags: string;
}

export interface Dataset extends BaseCoreEntity {
  fileName: string;
  version: number;
  description: string;
  url: string;
  tags: string[];
  type: string;
  folderPath: string;
  featureColumns: string[];
  targetColumn: string;
  rerun: boolean;
  terminated: boolean;
  archived: boolean;
  clonedFrom?: string | Dataset;
  data_preprocessing: Record<string, PrimitiveType | null>;
  feature_engineering: Record<string, PrimitiveType | null>;
  artifact_filenames: Record<string, PrimitiveType | null>;
}

export interface Model extends BaseCoreEntity {
  mId: string;
  name: string;
  viewUrl: string;
  runUrl: string;
  description: string;
  tags: string;
  separator: string;
}

export interface Frontend extends BaseCoreEntity {
  name: string;
  stylesUrl: string;
  runUrl: string;
  description: string;
}

export interface Solution extends BaseCoreEntity {
  name: string;
  viewUrl: string;
  runUrl: string;
  description: string;
  tags: string;
  datasets: string[] | Dataset[];
  models: string[] | Model[];
  pipelines: string[] | Pipeline[];
  frontends: string[] | Frontend[];
  composer: Record<string, PrimitiveType | null>;
}

export type CoreEntity = Frontend | Model | Pipeline | Dataset;
export type CoreEntityKey = 'frontend' | 'model' | 'pipeline' | 'dataset';

export type CoreSolutionEntityArray = Frontend[] | Model[] | Pipeline[] | Dataset[] | Solution[];
export type CoreSolutionEntity = CoreEntity | Solution;
export type CoreSolutionEntityKey = CoreEntityKey | 'solution';


export interface Param {
  key: string;
  defaultValue: PrimitiveType | null;
  supportedValues: (PrimitiveType | null)[];
  uiType: string; // checkbox/select/radio/text/textarea
  primaryType?: string;
  subType?: string;
  description: string;
  type: CoreSolutionEntityKey;
  dependsOnParam?: string;
  dependsOnParamValue?: PrimitiveType | null;
};


export interface AppError {
  message: string;
  error: string;
  statusCode: number;
}

export type PrimitiveType = string | number | boolean;

export type HexColor = `#${string}`;


export type EntityDataType<T extends CoreSolutionEntity> = {
  data: T[];
  loading: boolean;
  error: AppError | null;
};

export interface EntityData {
  dataset: EntityDataType<Dataset>;
  model: EntityDataType<Model>;
  frontend: EntityDataType<Frontend>;
  pipeline: EntityDataType<Pipeline>;
  solution: EntityDataType<Solution>;
};

export interface EntityDataAccess {
  dataset: CoreSolutionEntity[];
  model: CoreSolutionEntity[];
  frontend: CoreSolutionEntity[];
  pipeline: CoreSolutionEntity[];
  solution: CoreSolutionEntity[];
}

export type EntityDataErrors = { [key in CoreSolutionEntityKey]: Observable<AppError | null> };
export type EntityDataLoaders = { [key in CoreSolutionEntityKey]: Observable<boolean> };

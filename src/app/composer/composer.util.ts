import { Injector } from '@angular/core';
import { BaseSchemes, ClassicPreset, NodeEditor } from 'rete';
import { AngularPlugin, Presets } from 'rete-angular-plugin/15';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { BehaviorSubject } from 'rxjs';
import { ComposerConnectionComponent } from './composer-connection/composer-connection.component';
import { ComposerCheckboxControlComponent } from './composer-controls/composer-checkbox-control/composer-checkbox-control.component';
import { ComposerDropdownControlComponent } from './composer-controls/composer-dropdown-control/composer-dropdown-control.component';
import { ComposerNumberControlComponent } from './composer-controls/composer-number-control/composer-number-control.component';
import { ComposerTextControlComponent } from './composer-controls/composer-text-control/composer-text-control.component';
import { ComposerNodeComponent } from './composer-node/composer-node.component';
import { ComposerSocketComponent } from './composer-socket/composer-socket.component';
import {
  ComposerCheckboxControl,
  ComposerConnection,
  ComposerControl,
  ComposerDropdownControl,
  ComposerNode,
  ComposerNumberControl,
  ComposerSocket,
  ComposerTextControl
} from './composer.framework';
import { AreaExtra, Composer, ComposerEngine, CoreSolutionEntity, DataCustomizationPayload, Param, PropertyChange, Schemes } from './composer.interface';

const addCustomBackground = <S extends BaseSchemes, K>(
  area: AreaPlugin<S, K>
) => {
  const background = document.createElement('div');

  background.classList.add('composer-background');
  background.classList.add('composer-fill-area');

  area.area.content.add(background);
};

export const composerEditor = async (
  container: HTMLElement,
  injector: Injector,
  params: Param[]
): Promise<ComposerEngine> => {
  const propertyChange = new BehaviorSubject<PropertyChange | null>(null);
  const socket = new ComposerSocket('socket');

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new AngularPlugin<Schemes, AreaExtra>({ injector });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.classic.setup({
    customize: {
      control(data: DataCustomizationPayload) {
        if (data.payload instanceof ComposerTextControl) {
          return ComposerTextControlComponent;
        }
        if (data.payload instanceof ComposerNumberControl) {
          return ComposerNumberControlComponent;
        }
        if (data.payload instanceof ComposerDropdownControl) {
          return ComposerDropdownControlComponent;
        }
        if (data.payload instanceof ComposerCheckboxControl) {
          return ComposerCheckboxControlComponent;
        }
        return null;
      },
      node() {
        return ComposerNodeComponent;
      },
      connection() {
        return ComposerConnectionComponent;
      },
      socket() {
        return ComposerSocketComponent;
      }
    }
  }));

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);
  addCustomBackground(area);

  AreaExtensions.simpleNodesOrder(area);

  const draw = async (
    nodes: ComposerNode<CoreSolutionEntity>[],
    connections: ComposerConnection<CoreSolutionEntity>[]
  ): Promise<void> => {
    for (const node of nodes) {
      const { nodePayload } = node;
      await composerAddNode({ ...nodePayload });
    }
    for (const connection of connections) {
      await composerAddConnection(connection);
    }
  };

  const composerAddConnectionWithNodes = async (
    from: ComposerNode<CoreSolutionEntity>,
    to: ComposerNode<CoreSolutionEntity>,
  ): Promise<boolean> => {
    const connection = await editor.addConnection(new ComposerConnection<CoreSolutionEntity>(from, 'a-output', to, 'b-input'));
    await AreaExtensions.zoomAt(area, editor.getNodes());
    return connection;
  };

  const composerAddConnectionWithIds = async (
    fromId: string,
    toId: string,
  ): Promise<boolean> => {
    const from = editor.getNode(fromId);
    const to = editor.getNode(toId);

    const connection = await editor.addConnection(new ComposerConnection<CoreSolutionEntity>(from, 'a-output', to, 'b-input'));
    await AreaExtensions.zoomAt(area, editor.getNodes());
    return connection;
  };

  const composerAddConnection = async (
    connectionObject: ComposerConnection<CoreSolutionEntity>,
  ): Promise<boolean> => {
    const connection = await editor.addConnection(connectionObject);
    await AreaExtensions.zoomAt(area, editor.getNodes());
    return connection;
  };


  //TODO: label and description
  const composerAddControl = (node: ComposerNode<CoreSolutionEntity>, param: Param): void => {
    let control: ComposerControl | null = null;
    if (['textarea', 'textbox'].includes(param.uiType)) {
      control = new ComposerTextControl(param.key, {
        //TODO: initial: node[param.key] || param.defaultValue,
        label: param.key,
        description: param.description,
        initial: String(param.defaultValue),
        change: (value) => control?.id && propertyChange.next({ id: control.id, value, param })
      });
    } else if ('dropdown' === param.uiType) {
      control = new ComposerDropdownControl(param.key, param.supportedValues as string[], {
        //TODO: initial: node[param.key] || param.defaultValue,
        label: param.key,
        description: param.description,
        initial: String(param.defaultValue),
        change: (value) => control?.id && propertyChange.next({ id: control.id, value, param })
      });
    } else if ('checkbox' === param.uiType) {
      control = new ComposerCheckboxControl(param.key, {
        //TODO: initial: node[param.key] || param.defaultValue,
        label: param.key,
        description: param.description,
        initial: param.defaultValue as boolean,
        change: (value) => control?.id && propertyChange.next({ id: control.id, value, param })
      });
    }
    if (control) {
      node.addControl(control.id, control);
    }
  };

  const composerAddNode = async (node: CoreSolutionEntity): Promise<ComposerNode<CoreSolutionEntity>> => {
    const composerNode = new ComposerNode<CoreSolutionEntity>(node);

    const controlParams = params.filter(({ type }) => type === node.entityType);

    controlParams.forEach(control => composerAddControl(composerNode, control));

    const nodeLength = editor.getNodes().length;
    composerNode.addOutput(node.id, new ClassicPreset.Output(socket, 'Out'));
    composerNode.addInput(node.id, new ClassicPreset.Input(socket, 'In'));
    await editor.addNode(composerNode);
    await area.translate(composerNode.id, { x: nodeLength * 400, y: nodeLength * 10 }); // TODO: put in constants
    await AreaExtensions.zoomAt(area, editor.getNodes());
    return composerNode;
  };

  const composerRemoveNode = async (id: string): Promise<void> => {
    await editor.removeNode(id);
    await AreaExtensions.zoomAt(area, editor.getNodes());
  };

  const getState = (): Composer => {
    return {
      nodes: editor.getNodes(),
      connections: editor.getConnections(),
    };
  };

  const destroy = () => area.destroy();

  return {
    propertyChange$: propertyChange.asObservable(),
    draw,
    getState,
    composerAddConnection,
    composerAddConnectionWithIds,
    composerAddConnectionWithNodes,
    destroy,
    composerAddNode,
    composerRemoveNode,
    composerAddControl,
  };
};







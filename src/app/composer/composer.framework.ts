import { ClassicPreset, ConnectionBase, NodeBase } from 'rete';

function setProto<T>(value: T) {
    return function <K extends string>(target: Record<K, T>, key: K) {
        target[key] = value;
    };
}

export class ComposerNode<
  CustomPayload extends { name: string; id: string; },
  Inputs extends {
    [key in string]?: ComposerSocket;
  } = {
    [key in string]?: ComposerSocket;
  },
  Outputs extends {
    [key in string]?: ComposerSocket;
  } = {
    [key in string]?: ComposerSocket;
  },
  Controls extends {
    [key in string]?: ComposerControl;
  } = {
    [key in string]?: ComposerControl;
  }> extends ClassicPreset.Node<Inputs, Outputs, Controls> implements NodeBase {
  nodePayload: CustomPayload;

  constructor(node: CustomPayload) {
    super(node.name);
    this.selected = false;
    this.nodePayload = node;
  }
}

export class ComposerConnection<
  Main extends { name: string; id: string; },
  Source extends ComposerNode<Main> = ComposerNode<Main>,
  Target extends ComposerNode<Main> = ComposerNode<Main>
> extends ClassicPreset.Connection<Source, Target> implements ConnectionBase {
  constructor(
    source: Source,
    sourceOutput: keyof Source['outputs'],
    target: Target,
    targetInput: keyof Target['inputs']
  ) {
    super(source, sourceOutput, target, targetInput);
  }
}

export class ComposerSocket extends ClassicPreset.Socket {
  constructor(name: string) {
    super(name);
  }
}

export type InputControlOptions<N> = {
  label?: string;
  description?: string;
  readonly?: boolean;
  initial?: N;
  change?: (value: N) => void;
};

export class ComposerControl extends ClassicPreset.Control { }

export class ComposerBaseControl<T> extends ComposerControl {
  pKey: string;
  label: string;
  description?: string;
  options?: InputControlOptions<T>;
  value?: T;
  readonly: boolean;

  constructor(pKey: string, options?: InputControlOptions<T>) {
    super();
    this.pKey = pKey;
    this.options = options;
    this.readonly = !!this.options?.readonly;
    if (this.options?.initial) {
      this.value = this.options.initial;
    }
    this.label = this.options?.label || 'Control';
    this.description = this.options?.description;
  }

  setValue(value?: T): void {
    this.value = value;
  }
}

export class ComposerTextControl extends ComposerBaseControl<string> { }
export class ComposerNumberControl extends ComposerBaseControl<number> {
  override setValue(value?: number): void {
    this.value = !value ? 0 : +value;
  }
}
export class ComposerDropdownControl extends ComposerBaseControl<string> {
  // TODO dropdown options could be label display or complex object or primitive types
  dropdownOptions: string[];
  constructor(pKey: string, dropdownOptions: string[], options?: InputControlOptions<string>) {
    super(pKey, options);
    this.dropdownOptions = dropdownOptions;
  }

}
export class ComposerCheckboxControl extends ComposerBaseControl<boolean> {
  override setValue(value?: boolean): void {
    this.value = new Boolean(value).valueOf();
  }
}

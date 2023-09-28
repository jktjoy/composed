
export const COMPOSER_FEATURE_KEY = 'composer';

export const NODE_BLACKLIST_PROPS = [
  'id',
  '_id',
]; // in handle inspector change on these value changes don't update diagram


export enum ParamUiType {
  TextBox = 'textbox',
  TextArea = 'textarea',
  DropDown = 'dropdown',
  CheckBox = 'checkbox',
  Radio = 'radio'
}

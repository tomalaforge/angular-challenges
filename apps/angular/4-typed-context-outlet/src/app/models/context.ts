export interface PersonContext {
  $implicit: string;
  age: number;
}

export interface ListTemplateContext<TItem> {
  $implicit: TItem;
  appList: TItem;
  index: number;
}

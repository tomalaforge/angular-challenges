export interface ItemsInterface {
  listItem: ListItem[];
  paragraphItem: ParagraphItem[];
}

export interface ListItem {
  category: string;
  description: string;
}

export interface ParagraphItem {
  title: string;
  content: string;
}

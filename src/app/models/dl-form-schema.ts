
export interface DLFormSchemaElement {
  type: string;
  widget: DLFormSchemaWidget;

}

interface DLFormSchemaSelectOption {
  const: string;
  title: string;

}

export interface DLFormSchemaWidget {
  type: "text" | "date" | "textarea" | "select";
  validationMessages?: {
    pattern: string;
  };
}

interface DLFormSchemaColumn {
  width: number;
  content: number[];
}

export interface DLFormSchemaProperty extends DLFormSchemaElement {
  config: {};
  type: "string";
  oneOf?: DLFormSchemaSelectOption[];
  title: string;
  pattern: string;
  widget: DLFormSchemaWidget;
}

type DLFormSchemaProperties = { [key: string]: DLFormSchemaProperty };

export interface DLFormSchemaLayoutElement extends DLFormSchemaElement {
  config?: {
    columns?: DLFormSchemaColumn[];
    innerPageLayout?: boolean;
  };
  /**
   * Items in containing element. String value is used as a pointer to properties. DLLayoutElement value is
   * used as child container.
   */
  items: Array<string | DLFormSchemaLayoutElement>;
  type: "layout";
  widget: DLFormSchemaWidget;
}


// Model of schema.json data
export interface DLFormSchema extends DLFormSchemaElement {
  /**
   *
   */
  type: "object";

  /**
   * Layout items containing details.
   */
  layout: DLFormSchemaLayoutElement[];

  /**
   * Details of properties used in layout
   */
  properties: DLFormSchemaProperties;

  /**
   * Keys of required properties.
   */
  required: string[];

  /**
   * Root widget used.
   */
  widget: DLFormSchemaWidget;
}

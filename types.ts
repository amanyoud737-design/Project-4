export type SlideBlock =
  | { type: "title"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; caption?: string };

export type Slide = {
  id: string;
  title: string;
  blocks: SlideBlock[];
  notes?: string;
};

export type Deck = {
  title: string;
  theme: {
    fontFamily: string;
    fontSize: number;
    accent: string;
    background: string;
  };
  templateId?: string | null;
  slides: Slide[];
};
